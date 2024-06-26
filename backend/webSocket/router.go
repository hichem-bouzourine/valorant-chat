package webSocket

// ! Source : https://github.com/nhooyr/websocket + Tabellout dans salle TME

import (
	"log"
	"net/http"
	"pc3r/prisma/db"
	"pc3r/services"

	"github.com/gorilla/websocket"
)

// Handler is a type representing functions which resolve requests.
type Handler func(*Client, interface{})

// Event is a type representing request names.
type Event string

// Router is a message routing object mapping events to function handlers.
type Router struct {
	rules map[Event]Handler // rules maps events to functions.
	// every router has what we call a hub which is basically a thread that is awaiting for clients to register/unregister and or to broadcast a message
	hubs map[string]*Hub // map of hubs
}

// NewRouter returns an initialized Router.
func NewRouter() *Router {
	return &Router{
		rules: make(map[Event]Handler),
		hubs:  make(map[string]*Hub),
	}
}

// ServeHTTP creates the socket connection and begins the read routine.
func (rt *Router) ServeHTTP(res http.ResponseWriter, req *http.Request) {
	// configure upgrader
	upgrader := websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		// accept all?
		CheckOrigin: func(r *http.Request) bool { return true },
	}
	user, _ := req.Context().Value(services.CtxAuthKey{}).(*db.UserModel)

	// upgrade connection to socket
	socket, err := upgrader.Upgrade(res, req, nil)
	if err != nil {
		log.Printf("socket server configuration error: %v\n", err)
		res.WriteHeader(http.StatusInternalServerError)
		return
	}

	client := NewClient(rt, socket, rt.FindHandler, user)

	// running method for reading from sockets, in main routine
	client.Read()
}

// FindHandler implements a handler finding function for router.
func (rt *Router) FindHandler(event Event) (Handler, bool) {
	handler, found := rt.rules[event]
	return handler, found
}

// Handle is a function to add handlers to the router.
func (rt *Router) Handle(event Event, handler Handler) {
	// store in to router rules
	rt.rules[event] = handler

}

// AddHub adds a hub to the router's list of hubs.
func (rt *Router) AddHub(id string) {
	hub := NewHub()
	rt.hubs[id] = hub
	go hub.run()
}

func createSocketRouter() *Router {
	// create router instance
	router := NewRouter()
	// assign handler for each event
	router.Handle("subscribe", subscribe)
	router.Handle("send_message", sendMessage)
	router.Handle("unsubscribe", unsubscribe)
	return router
}

/*
@func : bind the socket router to the /ws endpoint
*/
func UseSocketRouter(mux *http.ServeMux) *Router {
	socketRouter := createSocketRouter()
	// Imply that every uncomming socket is authenticated before the HTTP -> socket upgrade
	mux.Handle("/ws", services.AuthSocketMiddleware(socketRouter))
	return socketRouter
}