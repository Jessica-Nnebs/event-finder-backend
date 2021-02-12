const mySQL = require('../mySQL/mySQLconnection')
/* import mySQL from '../mySQL/mySQLconnection'; */

const routeHandlerFunction = async (req, res) => {
    try {
        console.log('----START---- GET request - Get data for explorer - Path: "/explore"')

        console.log(req.query)

        myQuery = `SELECT
        EVENTS.event_id,
        EVENTS.event_category,
        EVENTS.event_title,
        EVENTS.event_description,
        EVENTS.event_location,
        EVENTS.event_country,
        EVENTS.event_city,
        EVENTS.event_postalcode,
        EVENTS.event_address,
        EVENTS.event_gps_latitude,
        EVENTS.event_gps_longitude,
        EVENTS.event_host_phone,
        EVENTS.event_host_email,
        EVENTS.event_price,
        EVENTS.event_start_date,
        EVENTS.event_end_date,
        EVENTS.event_creation_date,
        EVENTS.event_max_participants,
        COUNT(EVENTS.event_id) as number_participants,
        EVENTS.event_max_participants - COUNT(EVENTS.event_id) as open_spots
        FROM USERSEVENTS RIGHT JOIN EVENTS ON USERSEVENTS.event_id=EVENTS.event_id
        GROUP BY EVENTS.event_id;`

        const explorerData = await mySQL.queryDB(myQuery);
        console.log(explorerData);
        res.status(200)
        res.json(explorerData)

        console.log('----END------ GET request - Get data for explorer - Path: "/explore"')

    } catch {
        (e) => {
            console.log(e)
            res.status(500)
        }
    }
}

module.exports = { routeHandlerFunction }