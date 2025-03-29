const { generateWaypoints } = require("../algorithm/waypointGenv2")
const { getRoute } = require("../controllers/mapsAPI")

module.exports = async function generateRun(start, end, miles) {
    const waypoints = await generateWaypoints(start, end, miles)
    const route = await getRoute(waypoints)
    return route
}