const mySQL = require('../mySQL/mySQLconnection')
/* import mySQL from '../mySQL/mySQLconnection'; */

const routeHandlerFunction = async (req, res) => {

    const category = await req.query.category;
    console.log(category)

    try {
        console.log('----START---- GET request - Get data for explorer - Category - Path: "/explorer"')

        const category = await req.query.category;
        console.log(category)

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
         WHERE EVENTS.event_category = '${category}'
         GROUP BY EVENTS.event_id;`

        const categoryData = await mySQL.queryDB(myQuery);
        console.log(categoryData);
        res.status(200)
        res.json(categoryData)

        console.log('----END------ GET request - Get data for explorer - Category - Path: "/explorer"')

    } catch {
        (e) => {
            console.log(e)
            res.status(500)
        }
    }
}

module.exports = { routeHandlerFunction }