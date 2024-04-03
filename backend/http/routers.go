package http

import (
	"net/http"
)

func UseHttpRouter(mux *http.ServeMux) {
	mux.Handle("/matchesResult", JsonContentMiddleware(http.HandlerFunc(GetMatchesResultsFromDB)))
	mux.Handle("/upcomingMatches", JsonContentMiddleware(http.HandlerFunc(GetUpcomingMatchesFromDB)))
	mux.Handle("/login", JsonContentMiddleware(http.HandlerFunc(login)))
	mux.Handle("/signup", JsonContentMiddleware(http.HandlerFunc(signup)))

}