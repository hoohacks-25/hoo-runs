const { Client } = require('@googlemaps/google-maps-services-js');
const client = new Client({});

async function generateOptimizedRoute(origin, destination, waypoints) {
  try {
    const response = await client.directions({
      params: {
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        optimizeWaypoints: true,
        travelMode: 'WALKING', // or 'DRIVE', 'BICYCLING'
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    });

    const overviewPolyline = response.data.routes[0].overview_polyline;
    return decodePolyline(overviewPolyline.points);
  } catch (error) {
    console.error('Error generating route:', error.response.data.error_message);
    throw error;
  }
}

// Polyline decoder function
function decodePolyline(encoded) {
  let index = 0, lat = 0, lng = 0;
  const coordinates = [];
  // ... (use the polyline decoder from previous answer)
  return coordinates;
}

// Example usage
const waypoints = [
  '38.0293,-78.4768', // Fralin Museum
  '38.0369,-78.5083', // Scott Stadium
  '38.0336,-78.5119'  // Rotunda
];

generateOptimizedRoute(
  'Brandon Ave, Charlottesville', 
  'Brandon Ave, Charlottesville',
  waypoints
).then(coords => console.log(coords));
