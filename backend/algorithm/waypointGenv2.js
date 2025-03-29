require('dotenv').config();
const { GoogleGenAI, Type } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

module.exports.generateWaypoints = async function generateWaypoints(start, end, miles) {
    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: `Generate ${miles} waypoints for a ${miles}-mile run starting at (${start.lat}, ${start.lng}) and ending at (${end.lat}, ${end.lng}). place these waypoints along roads or at intersections.`,
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