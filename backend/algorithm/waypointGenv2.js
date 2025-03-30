require('dotenv').config();
const { GoogleGenAI, Type } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

module.exports.generateWaypoints = async function generateWaypoints(start, end, miles, model) {
    const response = await ai.models.generateContent({
        model: model,
        contents: `Generate around ${Math.max(Math.min(10, miles),4)} waypoints for a ${miles}-mile long run starting at (${start.lat}, ${start.lng}) and ending at (${end.lat}, ${end.lng}) such that the shortest distance between each waypoint is the route being run by the runner.`,
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
    const res = JSON.parse(response.text); 
    return res
}