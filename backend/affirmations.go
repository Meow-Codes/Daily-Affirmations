package main

type Affirmation struct {
	Text string `json:"text"`
	Author string `json:"author"`
}

var affirmations = []Affirmation{
	{Text: "The only way to do great work is to love what you do.", Author: "Steve Jobs"},
    {Text: "Believe you can and you're halfway there.", Author: "Theodore Roosevelt"},
    {Text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", Author: "Winston Churchill"},
    {Text: "The future belongs to those who believe in the beauty of their dreams.", Author: "Eleanor Roosevelt"},
    {Text: "It does not matter how slowly you go as long as you do not stop.", Author: "Confucius"},
    {Text: "Everything you've ever wanted is on the other side of fear.", Author: "George Addair"},
    {Text: "Believe in yourself. You are braver than you think, more talented than you know, and capable of more than you imagine.", Author: "Roy T. Bennett"},
    {Text: "I learned that courage was not the absence of fear, but the triumph over it.", Author: "Nelson Mandela"},
    {Text: "The only impossible journey is the one you never begin.", Author: "Tony Robbins"},
    {Text: "Your limitation—it's only your imagination.", Author: "Unknown"},
    {Text: "Great things never come from comfort zones.", Author: "Unknown"},
    {Text: "Dream it. Wish it. Do it.", Author: "Unknown"},
    {Text: "Success doesn't just find you. You have to go out and get it.", Author: "Unknown"},
    {Text: "The harder you work for something, the greater you'll feel when you achieve it.", Author: "Unknown"},
    {Text: "Don't stop when you're tired. Stop when you're done.", Author: "Unknown"},
    {Text: "Wake up with determination. Go to bed with satisfaction.", Author: "Unknown"},
    {Text: "Do something today that your future self will thank you for.", Author: "Sean Patrick Flanery"},
    {Text: "Little things make big days.", Author: "Unknown"},
    {Text: "It's going to be hard, but hard does not mean impossible.", Author: "Unknown"},
    {Text: "Don't wait for opportunity. Create it.", Author: "Unknown"},
}