const mySQL = require('../mySQL/mySQLconnection')
const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'opencage',
    apiKey: 'dbcf492b8db545538b8b5d9acbeb0313',
};

const routeHandlerFunction = async (req, res) => {

    try {
        console.log('----START---- POST request - Insert new events in EVENTS table - Path: "/events"')

        const newEvent = await req.body;
        console.log(newEvent)
        const {
            event_category,
            event_title,
            event_description,
            event_location,
            event_country,
            event_city,
            event_postalcode,
            event_address,
            event_host_phone,
            event_host_email,
            event_price,
            event_start_date,
            event_end_date,
            event_max_participants } = newEvent;

        /*         const convertTimestamp = (date) => {
                    const newDate = new Date(date);
                    const currentDayOfMonth = newDate.getDate();
                    const currentMonth = (newDate.getMonth() < 10) ? ('0' + (Number(newDate.getMonth()) + 1)) : newDate.getMonth() + 1; // Be careful! January is 0, not 1
                    const currentYear = newDate.getFullYear();
                    const dateString = currentYear + "-" + currentMonth + "-" + currentDayOfMonth;
                    const timestamp = dateString + ' ' + newDate.toString().substr(16, 8)
                    console.log(timestamp)
                    return timestamp
                }
        
                const event_start_date = convertTimestamp(newEvent.event_start_date)
                console.log(event_start_date)
                const event_end_date = convertTimestamp(newEvent.event_end_date)
                console.log(event_end_date) */

        // calculate current time - Timestamp

        const currentDate = new Date(Date.now())
        /*         console.log(currentDate) */
        const newCurrentDate = currentDate.toISOString()
        /*         console.log(newCurrentDate) */
        const event_creation_date = newCurrentDate.substr(0, 19)
        /*         console.log(event_creation_date) */

        // node-geocoder - convert address to GPS coordinates 
        const eventCompleteAddress = `${event_address}, ${event_postalcode}, ${event_city}, ${event_country}`
        const geocoder = NodeGeocoder(options);
        const resGeo = await geocoder.geocode(eventCompleteAddress);
        /*         console.log(resGeo)
                console.log(resGeo[0].latitude, resGeo[0].longitude) */

        const event_gps_latitude = resGeo[0].latitude;
        const event_gps_longitude = resGeo[0].longitude;

        console.log(parseFloat(event_gps_latitude.toFixed(9)), event_gps_longitude.toFixed(9))

        // Use lybrary to calculate the GPS coordinates from address

        myAllQuery = 'SELECT * FROM EVENTS;'

        myQuery = `
        INSERT INTO EVENTS (
            event_category,
            event_title,
            event_description,
            event_location,
            event_country,
            event_city,
            event_postalcode,
            event_address,
            event_gps_latitude,
            event_gps_longitude,
            event_host_phone,
            event_host_email,
            event_price,
            event_start_date,
            event_end_date,
            event_creation_date,
            event_max_participants
            )
            VALUES(
            '${event_category}', 
            '${event_title}', 
            '${event_description}', 
            '${event_location}',
            '${event_country}', 
            '${event_city}', 
            '${event_postalcode}', 
            '${event_address}',
            ${event_gps_latitude},
            ${event_gps_longitude},
            '${event_host_phone}',
            '${event_host_email}',
             ${event_price}, 
            '${event_start_date}',
            '${event_end_date}',
            '${event_creation_date}', 
             ${event_max_participants}
            );`

        const aNewEvent = await mySQL.queryDB(myQuery);
        console.log(aNewEvent)
        const allEvents = await mySQL.queryDB(myAllQuery);
        console.log(allEvents)
        res.status(200)
        res.json({ saveImage: true })

        console.log('----END------ POST request - Insert new events in EVENTS table - Path: "/events"')

    } catch {
        (e) => {
            console.log(e)
            res.status(500)
        }
    }
}

module.exports = { routeHandlerFunction }