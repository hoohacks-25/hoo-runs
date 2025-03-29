require('dotenv').config();
const { GoogleGenAI, Type } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

module.exports.generateWaypoints = async function generateWaypoints() {
    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: 'Generate 5 waypoints for a 10-mile run starting at (38.03822, -78.50311) and ending at (38.03822, -78.50311). place these waypoints along roads or at intersections.',
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        'latitude': {
                            type: Type.NUMBER,
                            description: 'latitude of waypoint',
                            nullable: false,
                        },
                        'longitude': {
                            type: Type.NUMBER,
                            description: 'longitude of waypoint',
                            nullable: false,
                        },
                    },
                    required: ['latitude', 'longitude'],
                },
            },
        },
    });

    console.debug(response.text);
}