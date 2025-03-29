const { RoutesClient } = require('@googlemaps/routing').v2;

const routingClient = new RoutesClient({
  key: process.env.GOOGLE_MAPS_API_KEY,
});

async function computeRoute(origin, destination, waypoints) {
  const request = {
    origin,
    destination,
    waypoints,
    travelMode: 'WALKING',
  };

  try {
    const response = await routingClient.computeRoutes(request);
    return response.routes[0]; // Return the first route
  } catch (error) {
    console.error('Error computing route:', error);
  }
}
