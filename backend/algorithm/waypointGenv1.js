const responseSchema = {
    type: "object",
    properties: {
        recipe_name: { type: "string" },
        ingredients: { type: "array", items: { type: "string" } },
        steps: { type: "array", items: { type: "string" } }
    },
    required: ["recipe_name", "ingredients", "steps"]
};

require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testfunc() {
    const model = genAI.getGenerativeModel({ 
        model: 'gemini-2.0-flash',
        generationConfig: { response_mime_type: "application/json" }
    });
    
    const result = await model.generateContent(
        'Generate a recipe for chocolate cake in JSON format'
    );
    
    console.log(result.response.text());
}

testfunc();
