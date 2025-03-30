const { generateWaypoints } = require("../algorithm/waypointGenv2")
const { getRoute, generateAppleLink, generateGoogleLink } = require("../controllers/mapsAPI")

module.exports = async function generateRun(start, end, miles) {
    const waypoints = await generateWaypoints(start, end, miles)
    let route = await getRoute(waypoints)
    let count = 25
    while ((route.distance < miles * .9 || route.distance > miles *1.1) && count > 0) {
        newroute = await getRoute(waypoints)
        if (Math.abs(newroute.distance - miles) < Math.abs(route.distance - miles)) {
            route = newroute
        }
        count--
    }
    const google_link = generateGoogleLink(waypoints)
    // const apple_link = generateAppleLink(waypoints)
    route.google_link = google_link
    // route.apple_link = apple_link
    return route
}