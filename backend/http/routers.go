package http

import (
	"net/http"
)

func UseHttpRouter(mux *http.ServeMux) {
	mux.Handle("/api/matchesResult", JsonContentMiddleware(http.HandlerFunc(GetMatchesResultsFromDB)))
	mux.Handle("/api/upcomingMatches", JsonContentMiddleware(http.HandlerFunc(GetUpcomingMatchesFromDB)))
	mux.Handle("/api/auth/login", JsonContentMiddleware(http.HandlerFunc(login)))
	mux.Handle("/api/auth/signup", JsonContentMiddleware(http.HandlerFunc(signup)))

}