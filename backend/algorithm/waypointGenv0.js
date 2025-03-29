const axios = require('axios');
require('dotenv').config();

async function generateWaypoints(start, miles) {
    const prompt = `Generate waypoints for a ${miles}-mile running loop starting at ${start}. Focus on scenic and safe areas. Return a list of each place`;
    const apiKey = process.env.GEMINI_API_KEY; // Ensure this is set in your environment

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
            {
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        // Extract response text correctly
        const responseText = response.data.candidates[0].content.parts[0].text;
        console.log(responseText.split('\n').filter(wp => wp.trim() !== ''));
        return responseText.split('\n').filter(wp => wp.trim() !== '');
    } catch (error) {
        console.error('Error generating waypoints:', error.response?.data || error.message);
        throw error;
    }
}

generateWaypoints("The Fralin Museum of Art at the University of Virginia", 10)