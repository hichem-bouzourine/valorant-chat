package http

import (
	"encoding/json"
	"net/http"
	httpTypes "pc3r/http/httpTypes"
	matchesResult "pc3r/matchesResult"
	types_matches "pc3r/matchesResult/types"
)


func GetMatchesResult(res http.ResponseWriter, req *http.Request) {
	matchesResult, err := matchesResult.GetMatchesResult()
	if err != nil {
		res.WriteHeader(http.StatusBadRequest)
		message := "Bad request to MATCHES/RESULT API"
		json.NewEncoder(res).Encode(httpTypes.MakeError(message, httpTypes.BAD_REQUEST))
		return
	}
	type responseGetMatchesResult struct {
		MatchesResult []types_matches.MatchesResult `json:"matchesResult"`
	}
	response := responseGetMatchesResult{
		MatchesResult: matchesResult,
	}
	res.WriteHeader(http.StatusCreated)
	json.NewEncoder(res).Encode(response)

}
