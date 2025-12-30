package main
import(
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"github.com/joho/godotenv"
)

func main(){
	rand.Seed(time.Now().UnixNano())
	godotenv.Load()
	r := mux.NewRouter()

	r.HandleFunc("/api/affirmation", getAffirmation).Methods("GET")
	r.HandleFunc("/api/background", getBackground).Methods("GET")
	r.HandleFunc("/api/health", healthCheck).Methods("GET")

	c := cors.New(cors.Options{
        AllowedOrigins: []string{
            "https://dailyaffirmations26.netlify.app",
            "https://www.dailyaffirmations26.netlify.app",
            "https://daily-affirmations-ithm.onrender.com",
            "*",
        },
        AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
        AllowedHeaders:   []string{"*"},
        AllowCredentials: true,
        Debug: true,
    })

	handler := c.Handler(r)

	port := os.Getenv("PORT")
    if port == "" {
        port = "6942" // fallback for local dev
    }
	fmt.Printf("Backend Server starting at port %s.....", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}

func getAffirmation(w http.ResponseWriter, r *http.Request){
	randomIndex := rand.Intn(len(affirmations))
	affirmation := affirmations[randomIndex]

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(affirmation)
}

func getBackground(w http.ResponseWriter, r *http.Request) {
    unsplashKey := os.Getenv("UNSPLASH_ACCESS_KEY")
    var imageURL string

    if unsplashKey != "" {
        // Call the API and extract the direct image URL
        url := fmt.Sprintf("https://api.unsplash.com/photos/random?query=nature,motivation,inspiration&orientation=landscape&client_id=%s", unsplashKey)
        resp, err := http.Get(url)
        if err != nil || resp.StatusCode != 200 {
            http.Error(w, "Failed to fetch from Unsplash", http.StatusInternalServerError)
            return
        }
        defer resp.Body.Close()
        var data map[string]interface{}
        json.NewDecoder(resp.Body).Decode(&data)
        if urls, ok := data["urls"].(map[string]interface{}); ok {
            if full, ok := urls["full"].(string); ok {
                imageURL = full // or "raw" for no compression
            }
        }
    }

    if imageURL == "" {
        // Fallback to source.unsplash.com (no key needed, direct image redirect)
        imageURL = "https://source.unsplash.com/random/1920x1080/?nature,motivation,inspiration,landscape"
    }

    response := map[string]string{"url": imageURL}
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(response)
}

func healthCheck(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"status": "healthy",
		"message": "daily affirmations api is safe and sound",
	})
}