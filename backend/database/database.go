package database

import (
	"fmt"
	matchesResult "pc3r/matchesResult"
	upcomingMatches "pc3r/upcomingMatches"
	"time"
)

/*
In this function we are retrieving all the upcoming matches
and matches results and pushing the into our internal database.
*/
func PushData() {
	CURRENT_TIME := time.Now().Format("20060102")
	fmt.Println("Starting the process of pushing data into the database: ", CURRENT_TIME)

	fmt.Println("Starting pushing Matches Results ...")
	matches, err := matchesResult.GetMatchesResultFromAPI()
	if err != nil {
		return
	}

	for _, matchResult := range matches {

		_, err :=  matchesResult.PushMatchesResults(matchResult, time.Now())

		if err != nil {
			fmt.Println("Error while trying to push all Matches Results")
			return 
		}
	}
	fmt.Println("Finished pushing Matches Results. ")
	

	fmt.Println("Starting pushing Upcoming matches ...")
	results, err := upcomingMatches.GetUpcomingMatchesFromAPI()
	if err != nil {
		return
	}

	for _, match := range results {

		_, err :=  upcomingMatches.PushUpcomingMatches(match)

		if err != nil {
			fmt.Println("Error while trying to push all Upcoming matches")
			return 
		}
	}
	fmt.Println("Finished pushing Upcoming matches. ")
	

}