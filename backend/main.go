package main

import (
	"fmt"
	"log"
	"net/http"
	database "pc3r/database"
	http2 "pc3r/http"
	"pc3r/prisma"

	"github.com/jasonlvhit/gocron"
	"github.com/rs/cors"
)

var mux = http.NewServeMux()

func main() {

	http2.UseHttpRouter(mux)
	// Establish connection with the remote database using Prisma ORM
	prisma.Init()

	cors_options := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Origin", "Content-Type", "Accept", "Authorization"},
	})

	handler := cors_options.Handler(mux)
	
	// lancer le serveur dans un Thread séparé pour maximiser la concurrence
	go func() {
		fmt.Println("Server running on PORT  3333")
		err := http.ListenAndServe(":3333", handler)
		if err != nil {
			log.Fatal(err)
		}
	}()
	
	// Push data once in a hour
	
	sched := gocron.NewScheduler()
	sched.Every(1).Hour().Do(func() {
		database.PushData()
	})
	
	<- sched.Start()
	
	
	select{}
}

