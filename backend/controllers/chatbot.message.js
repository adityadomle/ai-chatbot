import Bot from "../models/bot.model.js";
import User from "../models/user.model.js";

export const Message = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({ error: "Text cannot be empty" });
    }

    const user = await User.create({
      sender: "user",
      text,
    });

    // Big Response Dataset
    const botResponses = {
      // Greetings
      "hello": "Hi, How I can help you!!",
      "hi": "Hey there 👋",
      "hey": "Hey! How’s it going?",
      "heyy": "Helloo 👋",
      "hii": "Hii, nice to see you!",
      "good morning": "Good morning ☀️, have a wonderful day!",
      "good afternoon": "Good afternoon 🌞",
      "good evening": "Good evening 🌆",
      "good night": "Good night 🌙, sweet dreams!",
      "bye": "Goodbye! Have a great day.",
      "bye bye": "Bye bye 👋, take care!",
      "see you": "See you soon! 👋",

      // Thanks / Gratitude
      "thanks": "You’re welcome! 😊",
      "thank you": "You’re welcome!",
      "thx": "No problem 👍",

      // Casual Chit-chat
      "how are you": "I'm just a bot, but I'm doing great! How about you?",
      "what’s up": "Not much, just here to chat with you!",
      "wassup": "All good! What about you?",
      "sup": "Hey, sup with you?",
      "lol": "😂",
      "haha": "😆",
      "brb": "Okay, I’ll wait here ⏳",

      // Bot Info
      "what is your name": "I’m ChatBot, your virtual assistant.",
      "who made you": "I was created by developers to help answer your questions.",
      "what can you do": "I can chat with you, answer questions, and keep you company.",
      "where are you from": "I live in the cloud ☁️ — no rent, no bills!",
      "i love you": "That’s sweet ❤️! I’m here to help you anytime.",

      // Tech Knowledge
      "what is python": "Python is a high-level, interpreted programming language known for simplicity and versatility.",
      "what is java": "Java is a platform-independent, object-oriented programming language used in enterprise apps and Android.",
      "what is c++": "C++ is an extension of C language with OOP features. Used in system software, game engines, and high-performance apps.",
      "what is javascript": "JavaScript is used to make websites interactive. Runs on browsers and servers (Node.js).",
      "what is html": "HTML is the standard markup language for creating web pages.",
      "what is css": "CSS is used to style and design web pages (colors, layouts, animations).",
      "what is sql": "SQL (Structured Query Language) is used to interact with relational databases (MySQL, PostgreSQL, etc.).",
      "what is mongodb": "MongoDB is a NoSQL database that stores data in JSON-like documents.",
      "what is cloud computing": "Cloud computing means storing and accessing data/apps over the internet instead of local computers.",
      "what is ai": "AI (Artificial Intelligence) is machines simulating human intelligence (learning, reasoning, problem-solving).",
      "what is machine learning": "ML is a subset of AI where systems learn from data and improve automatically.",
      "what is data science": "Data Science is analyzing and extracting insights from data using statistics, programming, and ML.",
      "what is recursion": "Recursion is when a function calls itself to solve smaller parts of a problem.",

      // General Knowledge
      "who is prime minister of india": "Narendra Modi is the current Prime Minister of India.",
      "who is president of india": "Droupadi Murmu is the current President of India.",
      "who is virat kohli": "Virat Kohli is one of India’s greatest batsmen and former captain.",
      "who is ms dhoni": "MS Dhoni is the former Indian cricket captain, known as 'Captain Cool'.",
      "who is elon musk": "Elon Musk is the CEO of Tesla, SpaceX, and founder of Neuralink & OpenAI.",
      "who is sundar pichai": "Sundar Pichai is the CEO of Google and Alphabet Inc.",
      "who is bill gates": "Bill Gates is the co-founder of Microsoft and philanthropist.",
      "who is steve jobs": "Steve Jobs was the co-founder of Apple, known for iPhone, iPad, and Mac.",
      "who is apj abdul kalam": "APJ Abdul Kalam was the 11th President of India, also known as 'Missile Man of India'.",

      // Fun / Jokes
      "tell me a joke": "Why don’t skeletons fight each other? They don’t have the guts! 😂",
      "another joke": "Why was the math book sad? Because it had too many problems 📘😂",
      "fun fact": "Did you know? Honey never spoils 🍯",
      "who is your crush": "I’m a bot… but I kinda like Wi-Fi 😉",
      "sing a song": "🎵 Sorry, my voice module is under construction 🚧",

      // Study / Interview
      "tell me about yourself": "Answer format: intro, skills, achievements, and why you’re fit for the role.",
      "why should we hire you": "Because I bring the right skills, adapt quickly, and am eager to contribute.",
      "what is leadership": "Leadership is the ability to guide and inspire a group towards common goals.",
      "what is teamwork": "Teamwork is when individuals collaborate and support each other to achieve results.",

      // Extra
      "what is ipl": "The IPL (Indian Premier League) is a T20 cricket league in India started in 2008.",
      "what is g20": "G20 is an international forum of 19 countries + EU focusing on economy, climate, and global issues.",
    };

    // Normalizer (case, extra spaces, punctuation)
    const normalize = (str) =>
      str.toLowerCase().trim().replace(/\s+/g, " ").replace(/[?!.]/g, "");

    const normalizedText = normalize(text);

    const botResponse =
      botResponses[normalizedText] || "Sorry, I don't understand that!!!";

    const bot = await Bot.create({
      text: botResponse,
    });

    return res.status(200).json({
      userMessage: user.text,
      botMessage: bot.text,
    });
  } catch (error) {
    console.log("Error in Message Controller:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
