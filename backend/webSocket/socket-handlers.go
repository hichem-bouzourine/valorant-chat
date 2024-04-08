package webSocket

import (
	"pc3r/prisma"
	prismaDb "pc3r/prisma/db"
	"pc3r/services"
)


func subscribe(client *Client, d interface{}) {
	data, ok := d.(map[string]interface{})
	if !ok {
		return
	}
	chat_id := data["chat_id"].(string)
	// retrieve the chats we've subscribed to
	_, ok = client.rt.hubs[chat_id]
	// if the client is not subscribed, we'll add it to the channel
	if !ok {
		client.rt.AddHub(chat_id)
	}

	// in a separate Thread we push a message for the event
	go func() {
		client.send <- Message{Event: "registered_chat", Data: responseRegisterToChat{
			Message: "Registered correctly",
		}}
	}()
	client.Write() // write to make sure that others has received the message 
	hub, _ := client.rt.hubs[chat_id]
	hub.register <- client

}

func sendMessage(client *Client, d interface{}) {
	data, ok := d.(map[string]interface{})
	if !ok {
		return
	}
	chat_id := data["chat_id"].(string)
	content := data["content"].(string)
	hub, ok := client.rt.hubs[chat_id]
	// if client is not subscribed to the chat hub we refuse to send the message.
	if !ok {
		return
	}
	user := client.user
	prisma, ctx := prisma.GetPrisma()

	// save the message in the database
	message, err := prisma.Message.CreateOne(
		prismaDb.Message.Content.Set(content),
		prismaDb.Message.Chat.Link(
			prismaDb.Chat.ID.Equals(chat_id),
		),
		prismaDb.Message.User.Link(
			prismaDb.User.ID.Equals(user.ID),
		),
	).With(
		prismaDb.Message.User.Fetch(),
	).Exec(ctx)
	if err != nil {
		return
	}
	structured_message := services.StructureMessage(*message)
	// make sure to send the message to the others
	go func() {
		hub.broadcast <- Message{
			Event: "receive_message",
			Data:  structured_message,
		}
	}()

}