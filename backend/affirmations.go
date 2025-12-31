package main

type Affirmation struct {
	Text   string `json:"text"`
	Author string `json:"author"`
}

var affirmations = []Affirmation{
	// Original quotes from known authors
	{Text: "The only way to do great work is to love what you do.", Author: "Steve Jobs"},
	{Text: "Believe you can and you're halfway there.", Author: "Theodore Roosevelt"},
	{Text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", Author: "Winston Churchill"},
	{Text: "The future belongs to those who believe in the beauty of their dreams.", Author: "Eleanor Roosevelt"},
	{Text: "It does not matter how slowly you go as long as you do not stop.", Author: "Confucius"},
	{Text: "Everything you've ever wanted is on the other side of fear.", Author: "George Addair"},
	{Text: "Believe in yourself. You are braver than you think, more talented than you know, and capable of more than you imagine.", Author: "Roy T. Bennett"},
	{Text: "I learned that courage was not the absence of fear, but the triumph over it.", Author: "Nelson Mandela"},
	{Text: "The only impossible journey is the one you never begin.", Author: "Tony Robbins"},
	{Text: "Do something today that your future self will thank you for.", Author: "Sean Patrick Flanery"},

	// Action & Persistence
	{Text: "The best time to plant a tree was 20 years ago. The second best time is now.", Author: "Chinese Proverb"},
	{Text: "You miss 100% of the shots you don't take.", Author: "Wayne Gretzky"},
	{Text: "Whether you think you can or you think you can't, you're right.", Author: "Henry Ford"},
	{Text: "The only limit to our realization of tomorrow will be our doubts of today.", Author: "Franklin D. Roosevelt"},
	{Text: "Don't watch the clock; do what it does. Keep going.", Author: "Sam Levenson"},
	{Text: "The way to get started is to quit talking and begin doing.", Author: "Walt Disney"},
	{Text: "Perseverance is not a long race; it is many short races one after the other.", Author: "Walter Elliot"},
	{Text: "Success is walking from failure to failure with no loss of enthusiasm.", Author: "Winston Churchill"},
	{Text: "It always seems impossible until it's done.", Author: "Nelson Mandela"},
	{Text: "Our greatest glory is not in never falling, but in rising every time we fall.", Author: "Confucius"},

	// Courage & Strength
	{Text: "Courage is resistance to fear, mastery of fear, not absence of fear.", Author: "Mark Twain"},
	{Text: "You gain strength, courage, and confidence by every experience in which you really stop to look fear in the face.", Author: "Eleanor Roosevelt"},
	{Text: "Do not pray for an easy life, pray for the strength to endure a difficult one.", Author: "Bruce Lee"},
	{Text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", Author: "Nelson Mandela"},
	{Text: "Strength does not come from physical capacity. It comes from an indomitable will.", Author: "Mahatma Gandhi"},
	{Text: "He who is not courageous enough to take risks will accomplish nothing in life.", Author: "Muhammad Ali"},
	{Text: "You are never too old to set another goal or to dream a new dream.", Author: "C.S. Lewis"},

	// Dreams & Vision
	{Text: "The only thing worse than starting something and failing is not starting something.", Author: "Seth Godin"},
	{Text: "If you can dream it, you can do it.", Author: "Walt Disney"},
	{Text: "All our dreams can come true, if we have the courage to pursue them.", Author: "Walt Disney"},
	{Text: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.", Author: "Roy T. Bennett"},
	{Text: "Dream big and dare to fail.", Author: "Norman Vaughan"},
	{Text: "The biggest adventure you can take is to live the life of your dreams.", Author: "Oprah Winfrey"},
	{Text: "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do.", Author: "Mark Twain"},

	// Self-Belief & Potential
	{Text: "No one can make you feel inferior without your consent.", Author: "Eleanor Roosevelt"},
	{Text: "The question isn't who is going to let me; it's who is going to stop me.", Author: "Ayn Rand"},
	{Text: "Life is 10% what happens to you and 90% how you react to it.", Author: "Charles R. Swindoll"},
	{Text: "Believe in yourself, take on your challenges, dig deep within yourself to conquer fears.", Author: "Chantal Sutherland"},
	{Text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", Author: "Ralph Waldo Emerson"},
	{Text: "You are the only person on earth who can use your ability.", Author: "Zig Ziglar"},
	{Text: "If you hear a voice within you say you cannot paint, then by all means paint and that voice will be silenced.", Author: "Vincent Van Gogh"},

	// Growth & Change
	{Text: "The only person you are destined to become is the person you decide to be.", Author: "Ralph Waldo Emerson"},
	{Text: "Change your thoughts and you change your world.", Author: "Norman Vincent Peale"},
	{Text: "Be the change that you wish to see in the world.", Author: "Mahatma Gandhi"},
	{Text: "Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present.", Author: "Bill Keane"},
	{Text: "The secret of change is to focus all of your energy not on fighting the old, but on building the new.", Author: "Socrates"},
	{Text: "Life is a journey, and if you fall in love with the journey, you will be in love forever.", Author: "Peter Hagerty"},
	{Text: "We cannot become what we want by remaining what we are.", Author: "Max DePree"},

	// Hard Work & Dedication
	{Text: "There are no shortcuts to any place worth going.", Author: "Beverly Sills"},
	{Text: "The only place where success comes before work is in the dictionary.", Author: "Vidal Sassoon"},
	{Text: "I'm a greater believer in luck, and I find the harder I work the more I have of it.", Author: "Thomas Jefferson"},
	{Text: "Opportunities don't happen. You create them.", Author: "Chris Grosser"},
	{Text: "Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing.", Author: "Pele"},
	{Text: "The difference between ordinary and extraordinary is that little extra.", Author: "Jimmy Johnson"},
	{Text: "Genius is one percent inspiration and ninety-nine percent perspiration.", Author: "Thomas Edison"},

	// Overcoming Obstacles
	{Text: "Difficult roads often lead to beautiful destinations.", Author: "Zig Ziglar"},
	{Text: "The greatest weapon against stress is our ability to choose one thought over another.", Author: "William James"},
	{Text: "You can't go back and change the beginning, but you can start where you are and change the ending.", Author: "C.S. Lewis"},
	{Text: "When everything seems to be going against you, remember that the airplane takes off against the wind, not with it.", Author: "Henry Ford"},
	{Text: "The gem cannot be polished without friction, nor man perfected without trials.", Author: "Chinese Proverb"},
	{Text: "Out of difficulties grow miracles.", Author: "Jean de La Bruyère"},
	{Text: "A smooth sea never made a skilled sailor.", Author: "Franklin D. Roosevelt"},

	// Purpose & Meaning
	{Text: "The purpose of our lives is to be happy.", Author: "Dalai Lama"},
	{Text: "Life is what happens when you're busy making other plans.", Author: "John Lennon"},
	{Text: "In the end, it's not the years in your life that count. It's the life in your years.", Author: "Abraham Lincoln"},
	{Text: "The meaning of life is to find your gift. The purpose of life is to give it away.", Author: "Pablo Picasso"},
	{Text: "Life isn't about finding yourself. Life is about creating yourself.", Author: "George Bernard Shaw"},
	{Text: "Your time is limited, so don't waste it living someone else's life.", Author: "Steve Jobs"},
	{Text: "Not how long, but how well you have lived is the main thing.", Author: "Seneca"},

	// Attitude & Mindset
	{Text: "Keep your face always toward the sunshine—and shadows will fall behind you.", Author: "Walt Whitman"},
	{Text: "Positive anything is better than negative nothing.", Author: "Elbert Hubbard"},
	{Text: "The only way to achieve the impossible is to believe it is possible.", Author: "Charles Kingsleigh"},
	{Text: "Life is like riding a bicycle. To keep your balance, you must keep moving.", Author: "Albert Einstein"},
	{Text: "Act as if what you do makes a difference. It does.", Author: "William James"},
	{Text: "Happiness is not something ready made. It comes from your own actions.", Author: "Dalai Lama"},
	{Text: "The only disability in life is a bad attitude.", Author: "Scott Hamilton"},

	// Taking Action Now
	{Text: "Start where you are. Use what you have. Do what you can.", Author: "Arthur Ashe"},
	{Text: "The journey of a thousand miles begins with one step.", Author: "Lao Tzu"},
	{Text: "Don't let yesterday take up too much of today.", Author: "Will Rogers"},
	{Text: "You don't have to be great to start, but you have to start to be great.", Author: "Zig Ziglar"},
	{Text: "The secret of getting ahead is getting started.", Author: "Mark Twain"},
	{Text: "What you do today can improve all your tomorrows.", Author: "Ralph Marston"},
	{Text: "Well done is better than well said.", Author: "Benjamin Franklin"},

	// Leadership & Influence
	{Text: "A leader is one who knows the way, goes the way, and shows the way.", Author: "John C. Maxwell"},
	{Text: "The best way to predict the future is to create it.", Author: "Peter Drucker"},
	{Text: "If your actions inspire others to dream more, learn more, do more and become more, you are a leader.", Author: "John Quincy Adams"},
	{Text: "Great minds discuss ideas; average minds discuss events; small minds discuss people.", Author: "Eleanor Roosevelt"},
	{Text: "Be yourself; everyone else is already taken.", Author: "Oscar Wilde"},

	// Resilience & Never Giving Up
	{Text: "Fall seven times, stand up eight.", Author: "Japanese Proverb"},
	{Text: "It's not whether you get knocked down, it's whether you get up.", Author: "Vince Lombardi"},
	{Text: "Never give up on a dream just because of the time it will take to accomplish it. The time will pass anyway.", Author: "Earl Nightingale"},
	{Text: "A winner is just a loser who tried one more time.", Author: "George M. Moore Jr."},
	{Text: "When you feel like quitting, think about why you started.", Author: "John Di Lemme"},
	{Text: "Rock bottom became the solid foundation on which I rebuilt my life.", Author: "J.K. Rowling"},
}