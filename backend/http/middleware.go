package http

import (
	"fmt"
	"net/http"
)

func JsonContentMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Printf("server's middleware: %s /\n", r.Method)
		w.Header().Set("Content-Type", "application/json")
		next.ServeHTTP(w, r)
	})
}