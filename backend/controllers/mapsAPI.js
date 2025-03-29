require('dotenv').config(); // Load environment variables
const axios = require('axios');

async function getPointsOfInterest(lat, lng, radius) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Load API key from .env file
  const endpoint = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

  try {
    // Define request parameters
    const params = {
      location: `${lat},${lng}`, // Latitude and longitude of the center point
      radius: radius,           // Radius in meters (max 50,000)
      type: 'point_of_interest', // Type of place (e.g., point_of_interest)
      key: apiKey               // API key
    };

    // Make the API request using axios
    const response = await axios.get(endpoint, { params });

    // Handle the response data
    if (response.data.results) {
      console.log('Points of Interest:', response.data.results);
      return response.data.results.map(place => ({
        name: place.name,
        location: place.geometry.location,
        types: place.types,
        rating: place.rating || 'N/A',
      }));
    } else {
      console.log('No results found.');
      return [];
    }
  } catch (error) {
    console.error('Error fetching points of interest:', error.message);
    return [];
  }
}

// Example usage
const latitude = 37.7937; // Example latitude (San Francisco)
const longitude = -122.3965; // Example longitude (San Francisco)
const radius = 500; // Radius in meters

getPointsOfInterest(latitude, longitude, radius).then(results => {
  console.log('Fetched POIs:', results);
});
