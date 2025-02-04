const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3000;
const NEWS_API_KEY = process.env.NEWS_API_KEY; // Store API key in .env file

app.get('/:query', async (req, res) => {
    try {
        const { query } = req.params;
        if (!query) {
            return res.status(400).json({ error: "Query parameter is required" });
        }

        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                q: query,
                sortBy: 'publishedAt', // Sorting by date
                language: 'en',
                country: 'in', // News from India
                apiKey: NEWS_API_KEY
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching news", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
});
