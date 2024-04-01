package http

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type ResBody struct {
	Success bool
}

func BasicRoute(w http.ResponseWriter, r *http.Request) {

	fmt.Printf("server's handler: %s /\n", r.Method)
	w.WriteHeader(http.StatusCreated)
	res_body := ResBody{Success: true} // write the response.
	json.NewEncoder(w).Encode(res_body)
}