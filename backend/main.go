package main

import (
	"fmt"
	"log"
	"net/http"

	http2 "pc3r/http"

	"github.com/rs/cors"
)

// const serverPort = 5000

var mux = http.NewServeMux()

func main() {

	http2.UseHttpRouter(mux)

	cors_options := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Origin", "Content-Type", "Accept"},
	})

	handler := cors_options.Handler(mux)
	fmt.Println("Server running on PORT  5000")
	log.Fatal(http.ListenAndServe(":5000", handler))

}

