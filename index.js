const express = require('express');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const MODEL_NAME = "gemini-1.5-pro";
const API_KEY = process.env.GEMINI_API_KEY;

app.use(express.static('public'));
app.use(express.json());

let searchCounter = 0; // Initialize a counter to generate unique IDs
const searchResults = {}; // In-memory store for search results

async function getInterestingFactsAndEvents(location) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 0.7,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    const prompt = `Provide interesting facts and recent events about ${location}.`;

    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig,
        safetySettings,
    });

    const response = result.response;
    return response.text();
}


app.post('/locationInfo', async (req, res) => {
    const { location } = req.body;

    if (!location) {
        return res.status(400).json({ error: "Location is required" });
    }

    searchCounter += 1; 
    const searchId = searchCounter; 

    try {
        const factsAndEvents = await getInterestingFactsAndEvents(location);
       
        searchResults[searchId] = { id: searchId, location, factsAndEvents };
        res.json({ id: searchId, location, factsAndEvents });
    } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
        res.status(500).json({ error: "Something went wrong!" });
    }
});


app.get('/locationInfo/:id', (req, res) => {
    const searchId = req.params.id;
    const searchResult = searchResults[searchId];

    if (!searchResult) {
        return res.status(404).json({ error: "No information found for this ID" });
    }

    res.json(searchResult);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});





