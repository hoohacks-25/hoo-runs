require('dotenv').config(); // Load environment variables

module.exports.getRoute = async function getRoute(points) {
    
    const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Load API key from .env file
    // Validate input
    if (!Array.isArray(points) || points.length < 2) {
        throw new Error('At least two points required');
    }

    // Extract route components
    const origin = points[0];
    const destination = points[points.length - 1];
    const intermediates = points.slice(1, -1);

    // Construct API request
    const endpoint = 'https://routes.googleapis.com/directions/v2:computeRoutes';
    const headers = {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline,routes.legs'
    };

    const body = {
        origin: { location: { latLng: origin } },
        destination: { location: { latLng: destination } },
        travelMode: 'WALK',
        optimizeWaypointOrder: false,
        polylineQuality: 'HIGH_QUALITY',
    };

    if (intermediates.length > 0) {
        body.intermediates = intermediates.map(point => ({
            location: { latLng: point }
        }));
    }

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            // console.log(response)
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Format response
        return {
            distance: data.routes[0].distanceMeters / 1609,
            duration: data.routes[0].duration,
            polyline: data.routes[0].polyline.encodedPolyline,
            legs: data.routes[0].legs.map(leg => ({
                start: leg.startLocation.latLng,
                end: leg.endLocation.latLng,
                steps: leg.steps
            }))
        };
    } catch (error) {
        console.error('Routing error:', error);
        throw new Error('Failed to generate route');
    }
}