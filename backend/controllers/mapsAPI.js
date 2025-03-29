require('dotenv').config(); // Load environment variables
const axios = require('axios');

module.exports.getPointsOfInterest = async function getPointsOfInterest(lat, lng, radius) {
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

module.exports.getRoute = async function getRoute(points) {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Load API key from .env file
    const endpoint = 'https://routes.googleapis.com/directions/v2:computeRoutes';
  
    try {
      // Construct waypoints and request body
      const waypoints = points.slice(1, -1).map(point => ({
        location: { latLng: { latitude: point.lat, longitude: point.lng } }
      }));
  
      const body = {
        origin: { location: { latLng: { latitude: points[0].lat, longitude: points[0].lng } } },
        destination: { location: { latLng: { latitude: points[points.length - 1].lat, longitude: points[points.length - 1].lng } } },
        travelMode: 'WALK',
        intermediates: waypoints,
        polylineQuality: 'OVERVIEW'
      };
  
      // Make the API request
      const response = await axios.post(endpoint, body, {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline,routes.legs'
        }
      });
  
      // Handle and parse the response
      const route = response.data.routes[0];
      console.log('Route Summary:', {
        distanceMeters: route.distanceMeters,
        durationSeconds: route.duration,
        polyline: route.polyline.encodedPolyline,
        legs: route.legs.map(leg => ({
          startLocation: leg.startLocation,
          endLocation: leg.endLocation,
          distanceMeters: leg.distanceMeters,
          durationSeconds: leg.duration
        }))
      });
  
      return route;
    } catch (error) {
      console.error('Error fetching walking route:', error.response?.data || error.message);
      return null;
    }
  }
  
//   // Example usage with multiple points (latitude, longitude)
//   const points = [
//     { lat: 37.7749, lng: -122.4194 }, // Start point (San Francisco)
//     { lat: 37.7849, lng: -122.4094 }, // Waypoint 1
//     { lat: 37.7949, lng: -122.3994 }, // Waypoint 2
//     { lat: 37.8049, lng: -122.3894 }  // End point
//   ];
  
//   getWalkingRoute(points).then(route => {
//     if (route) {
//       console.log('Walking Route Generated Successfully!');
//     }
//   });