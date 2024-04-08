package webSocket

import (
	"pc3r/prisma/db"

	"github.com/gorilla/websocket"
)

type responseRegisterToChat struct {
	Message string `json:"message"`
}

type Hub struct {
	// Registered clients.
	clients map[*Client]bool

	// Inbound messages from the clients.
	broadcast chan Message

	// Register requests from the clients.
	register chan *Client

	// Unregister requests from clients.
	unregister chan *Client
}

// Message is a object used to pass data on sockets.
type Message struct {
	Event string      `json:"event"`
	Data  interface{} `json:"data"`
}

// FindHandler is a type that defines handler finding functions.
type FindHandler func(Event) (Handler, bool)

// Client is a type that reads and writes on sockets.
type Client struct {
	send           chan Message
	socket         *websocket.Conn
	rt             *Router
	findHandler    FindHandler
	user           *db.UserModel
	SubscribedHubs []*Hub // Ajouter un champ pour stocker les hubs auxquels le client est abonné
}