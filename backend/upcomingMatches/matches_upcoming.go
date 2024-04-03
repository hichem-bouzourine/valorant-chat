package matchesResult

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"os"
	db "pc3r/prisma"
	prismaDb "pc3r/prisma/db"
	"pc3r/upcomingMatches/types"

	godotenv "github.com/joho/godotenv"
)

func fetchFromUrl(URL string) (*http.Response, error) {
	client := &http.Client{}
	req, err := http.NewRequest("GET", URL, nil)
	
	if err != nil {
		return nil, err
	}
	
	res, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	
	return res, nil
}

func GetUpcomingMatchesFromAPI() ([]types.UpcomingMatch, error) {
	// Retrieve my API base url from the .env file
	godotenv.Load(".env")
	BASE_URL := os.Getenv("API_BASE_URL")	

	URL := fmt.Sprintf("%s%s",BASE_URL, "match/upcoming")
	res, err := fetchFromUrl(URL)
	if err != nil {
		fmt.Println("Some error occured")
		return []types.UpcomingMatch{}, err
	}
	var results types.UpcomingMatchesResponse
	err = json.NewDecoder(res.Body).Decode(&results)
	
	if err != nil {
		fmt.Println(err)
		fmt.Println("Could not decode json")
		return []types.UpcomingMatch{}, err
	}
	return results.Data.Segments, nil

}



func PushUpcomingMatches(match types.UpcomingMatch) (*prismaDb.UpcomingMatchesModel, error) {
	prisma, ctx := db.GetPrisma()
	
	// avant de faire le push il faut vérifier que ce tuple n'existe pas dans la base de données // important
	result, err := prisma.UpcomingMatches.FindMany(
		prismaDb.UpcomingMatches.And(
			prismaDb.UpcomingMatches.Team1.Equals(match.Team1), 
			prismaDb.UpcomingMatches.Team2.Equals(match.Team2), 
			prismaDb.UpcomingMatches.MatchPage.Equals(match.Match_page))).Exec(ctx)

	if len(result) != 0 {
		if !errors.Is(err, prismaDb.ErrNotFound) {
			fmt.Println("Upcoming Match already existing in the database")
			return nil, nil
		}
	}

	if match.Score1 != "–" || match.Score2 != "–" {
		return nil, nil
	}

	upcomingMatch, err := prisma.UpcomingMatches.CreateOne(
		prismaDb.UpcomingMatches.Team1.Set(match.Team1),
		prismaDb.UpcomingMatches.Team2.Set(match.Team2),
		prismaDb.UpcomingMatches.Score1.Set(match.Score1),
		prismaDb.UpcomingMatches.Score2.Set(match.Score2),
		prismaDb.UpcomingMatches.Flag1.Set(match.Flag1),
		prismaDb.UpcomingMatches.Flag2.Set(match.Flag2),
		prismaDb.UpcomingMatches.TimeUntilMatch.Set(match.Time_until_match),
		prismaDb.UpcomingMatches.RoundInfo.Set(match.Round_info),
		prismaDb.UpcomingMatches.TournamentName.Set(match.Tournament_name),
		prismaDb.UpcomingMatches.MatchPage.Set(match.Match_page),
		prismaDb.UpcomingMatches.TournamentIcon.Set(match.Tournament_icon),
	).Exec(ctx)

	if err != nil {
		fmt.Println("Error while pushing a Match result")
	}

	return upcomingMatch, nil
}
