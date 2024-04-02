package http

import (
	"net/http"
)

func UseHttpRouter(mux *http.ServeMux) {
	mux.Handle("/matchesResult", JsonContentMiddleware(http.HandlerFunc(GetMatchesResult)))
}