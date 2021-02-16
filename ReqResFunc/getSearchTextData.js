const mySQL = require('../mySQL/mySQLconnection')
const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'opencage',
    apiKey: 'dbcf492b8db545538b8b5d9acbeb0313',
};

const routeHandlerFunction = async (req, res) => {
    try {
        console.log('----START---- getSearchTextData')

        console.log(req.query)
        const searchText = await req.query.searchtext;
        console.log(searchText)

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
        WHERE EVENTS.event_category LIKE '%${searchText}%' OR EVENTS.event_title LIKE '%${searchText}%'
        GROUP BY EVENTS.event_id;`

        const explorerData = await mySQL.queryDB(myQuery);
        console.log(explorerData);

        res.status(200)
        res.json(explorerData)

        console.log('----END------ getSearchTextData')

    } catch {
        (e) => {
            console.log(e)
            res.status(500)
        }
    }
}

module.exports = { routeHandlerFunction }