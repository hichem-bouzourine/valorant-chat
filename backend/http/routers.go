package http

import (
	"net/http"
)

func UseHttpRouter(mux *http.ServeMux) {
	mux.Handle("/matchesResult", JsonContentMiddleware(http.HandlerFunc(GetMatchesResultsFromDB)))
	mux.Handle("/upcomingMatches", JsonContentMiddleware(http.HandlerFunc(GetUpcomingMatchesFromDB)))
}