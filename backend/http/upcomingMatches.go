package http

import (
	"encoding/json"
	"net/http"
	httpTypes "pc3r/http/httpTypes"
	db "pc3r/prisma"
	upcomingMatches "pc3r/upcomingMatches"
	types_upcomingMatches "pc3r/upcomingMatches/types"
)


func GetUpcomingMatches(res http.ResponseWriter, req *http.Request) {
	upcomingMatches, err := upcomingMatches.GetUpcomingMatchesFromAPI()
	if err != nil {
		res.WriteHeader(http.StatusBadRequest)
		message := "Bad request to MATCHES/RESULT API"
		json.NewEncoder(res).Encode(httpTypes.MakeError(message, httpTypes.BAD_REQUEST))
		return
	}
	type responseGetupcomingMatches struct {
		UpcomingMatches []types_upcomingMatches.UpcomingMatch `json:"upcomingMatches"`
	}
	response := responseGetupcomingMatches{
		UpcomingMatches: upcomingMatches,
	}
	res.WriteHeader(http.StatusCreated)
	json.NewEncoder(res).Encode(response)

}


type responseGetUpcomingMatches struct {
	UpcomingMatches []types_upcomingMatches.UpcomingMatch `json:"upcomingMatches"`
}

func GetUpcomingMatchesFromDB(res http.ResponseWriter, req *http.Request) { 
	prisma, ctx := db.GetPrisma()

	result, err := prisma.UpcomingMatches.FindMany().Exec(ctx)

	if err != nil {
		res.WriteHeader(http.StatusNotFound)
		message := "Match Not Found"
		json.NewEncoder(res).Encode(httpTypes.MakeError(message, httpTypes.NOT_FOUND))
		return
	}

	// Convert result to the appropriate type
    var upcomingMatches [] types_upcomingMatches.UpcomingMatch
    for _, r := range result {
        upcomingMatches = append(upcomingMatches, types_upcomingMatches.UpcomingMatch{
			Team1: r.Team1,
			Team2: r.Team2,
			Score1: r.Score1,
			Score2: r.Score2,
			Flag1: r.Flag1,
			Flag2: r.Flag2,
			Time_until_match: r.TimeUntilMatch,
			Round_info: r.RoundInfo,
			Tournament_name: r.TournamentName,
			Match_page: r.MatchPage,
			Tournament_icon: r.TournamentIcon,
        })
    }

	response := responseGetUpcomingMatches {
		UpcomingMatches: upcomingMatches,
	}

	res.WriteHeader(http.StatusCreated)
	json.NewEncoder(res).Encode(response)
}
