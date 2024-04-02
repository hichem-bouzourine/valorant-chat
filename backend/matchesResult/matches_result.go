package matchesResult

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"pc3r/matchesResult/types"

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

func GetMatchesResult() ([]types.MatchesResult, error) {
	// Retrieve my API base url from the .env file
	godotenv.Load(".env")
	BASE_URL := os.Getenv("API_BASE_URL")	

	URL := fmt.Sprintf("%s%s",BASE_URL, "match/results")
	res, err := fetchFromUrl(URL)
	if err != nil {
		fmt.Println("Some error occured")
		return []types.MatchesResult{}, err
	}
	var results types.MatchesResultResponse
	err = json.NewDecoder(res.Body).Decode(&results)
	
	if err != nil {
		fmt.Println(err)
		fmt.Println("Could not decode json")
		return []types.MatchesResult{}, err
	}
	return results.Data.Segments, nil

}
