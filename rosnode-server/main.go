package main

import (
	"context"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/go-redis/redis/v8"
)

func main() {
	// Redis client setup
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password set
		DB:       0,  // use default DB
	})

	// Set up the ROS topic URLs
	topicURLs := []string{
		"http://localhost:8080/topic1",
		"http://localhost:8080/topic2",
		"http://localhost:8080/topic3",
	}

	// Start a goroutine for each topic URL
	for _, url := range topicURLs {
		go func(topicURL string) {
			for {
				// Get the topic information from the HTTP endpoint
				resp, err := http.Get(topicURL)
				if err != nil {
					fmt.Printf("Error fetching ROS topic information from %s: %v\n", topicURL, err)
					continue
				}

				// Read the response body
				body, err := ioutil.ReadAll(resp.Body)
				if err != nil {
					fmt.Printf("Error reading HTTP response from %s: %v\n", topicURL, err)
					continue
				}

				// Store the topic information in Redis
				err = rdb.Set(context.Background(), topicURL, body, 0).Err()
				if err != nil {
					fmt.Printf("Error storing topic data from %s in Redis: %v\n", topicURL, err)
					continue
				}

				// Close the HTTP response body
				resp.Body.Close()

				// Sleep for 30 seconds before the next iteration
				time.Sleep(30 * time.Second)
			}
		}(url)
	}

	// Block the main goroutine to keep the program running
	select {}
}
