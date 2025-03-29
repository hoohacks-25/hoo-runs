require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Your JSON schema definition
const responseSchema = {
    type: "object",
    properties: {
        run_name: { type: "string" },
        waypoints: { type: "array", latitude: { type: "number" }, longitude: { type: "number" } },
    },
    required: ["recipe_name", "waypoints"]
};

async function generateRecipe() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Configure model with JSON response format
    const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash-latest',
        generationConfig: {
            responseMimeType: 'application/json',
        },
    });

    console.log(JSON.stringify(responseSchema, null, 2))

    // Craft schema-aware prompt
    const prompt = `Generate 10 waypoints for a 10-mile run starting at (38.03822, -78.50311) and ending at (38.03822, -78.50311). Focus on scenic and safe areas. Return a list of each place in JSON format strictly following this schema:
${JSON.stringify(responseSchema, null, 2)}
Example valid output:
{
    "run_name": "River Creek run",
    "waypoints": [{"latitude":1, "longitude":1}, {"latitude":2, "longitude":2}, ...]
}`;

    try {
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        
        // Parse and validate the JSON
        const recipe = JSON.parse(responseText);
        if (!validateSchema(recipe)) {
            throw new Error('Invalid schema in response');
        }
        
        return recipe;
    } catch (error) {
        console.error('Generation failed:', error);
        throw error;
    }
}

// Schema validation function
function validateSchema(data) {
    return (
        typeof data.run_name === 'string' &&
        Array.isArray(data.waypoints) &&
        data.waypoints.every(i => typeof i.latitude === 'number' && typeof i.longitude === 'number')
    );
}

// Execute
generateRecipe()
    .then(recipe => console.log('Generated recipe:', recipe))
    .catch(console.error);
