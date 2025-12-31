package main
import(
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"os"
	"strings"
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
	r.HandleFunc("/api/onepiece", getOnePieceAffirmation).Methods("GET")
	r.HandleFunc("/api/onepiece/background", getOnePieceBackground).Methods("GET")

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
        port = "6942"
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
    if unsplashKey == "" {
        // Fallback if no key
        sendBackgroundResponse(w, "https://source.unsplash.com/random/1920x1080/?nature,landscape,motivation")
        return
    }
	
    themes := []string{
        "dreams,stars,night sky,galaxy",
        "mountain,summit,peak,success",
        "ocean,sea,horizon,journey",
        "sunrise,hope,new beginning,dawn",
        "forest,path,adventure,journey",
        "strength,power,storm,lightning",
        "courage,fire,flame,warrior",
        "perseverance,climbing,rock,mountain",
        "peace,zen,meditation,calm",
        "growth,tree,roots,nature",
        "freedom,bird,sky,flying",
        "victory,trophy,achievement",
        "resilience,phoenix,rising",
        "wisdom,old tree,ancient,light",
        "motivation,running,action,movement",
    }

    rand.Seed(time.Now().UnixNano())
    selectedTheme := themes[rand.Intn(len(themes))]

    url := fmt.Sprintf("https://api.unsplash.com/photos/random?query=%s&orientation=landscape&content_filter=high&client_id=%s", selectedTheme, unsplashKey)

    resp, err := http.Get(url)
    if err != nil || resp.StatusCode != http.StatusOK {
        // Fallback to source.unsplash with same theme
        fallback := fmt.Sprintf("https://source.unsplash.com/random/1920x1080/?%s", selectedTheme)
        sendBackgroundResponse(w, fallback)
        return
    }
    defer resp.Body.Close()

    var data map[string]interface{}
    if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
        sendBackgroundResponse(w, "https://source.unsplash.com/random/1920x1080/?landscape,nature")
        return
    }

    var imageURL string
    if urls, ok := data["urls"].(map[string]interface{}); ok {
        if full, ok := urls["full"].(string); ok {
            imageURL = full
        } else if raw, ok := urls["raw"].(string); ok {
            imageURL = raw
        }
    }

    if imageURL == "" {
        imageURL = "https://source.unsplash.com/random/1920x1080/?inspiration,motivation"
    }

    sendBackgroundResponse(w, imageURL)
}

// Helper to avoid duplicating JSON response code
func sendBackgroundResponse(w http.ResponseWriter, url string) {
    response := map[string]string{"url": url}
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

func getOnePieceAffirmation(w http.ResponseWriter, r *http.Request){
	randomIndex := rand.Intn(len(onePieceAffirmations))
	aff := onePieceAffirmations[randomIndex]

	response := map[string]interface{}{
		"text":   aff.Text,
		"author": aff.Author,
		"character": getCharacterKey(aff.Author),
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func getCharacterKey(author string) string {
	switch {
	case strings.Contains(author, "Luffy"):
		return "luffy"
	case strings.Contains(author, "Zoro"):
		return "zoro"
	case strings.Contains(author, "Robin"):
		return "robin"
	case strings.Contains(author, "Whitebeard"):
		return "whitebeard"
	case strings.Contains(author, "Roger"):
		return "roger"
	default:
		return "adventure" // fallback sea
	}
}

func getOnePieceBackground(w http.ResponseWriter, r *http.Request){
	response := map[string]string{
		"url": "https://wallpapers.com/images/hd/one-piece-thousand-sunny-shipat-sea-9xg39eojjkcp951q.jpg", // sea
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}