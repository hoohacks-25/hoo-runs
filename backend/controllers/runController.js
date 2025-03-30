const { generateWaypoints } = require("../algorithm/waypointGenv2")
const { getRoute, generateLink } = require("../controllers/mapsAPI")

module.exports = async function generateRun(start, end, miles) {
    const waypoints = await generateWaypoints(start, end, miles)
    const route = await getRoute(waypoints)
    const link = generateLink(waypoints)
    route.link = link
    return route
}