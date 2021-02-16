const mySQL = require('../mySQL/mySQLconnection')
const geolib = require('geolib');

const options = {
    provider: 'opencage',
    apiKey: 'dbcf492b8db545538b8b5d9acbeb0313',
};

const routeHandlerFunction = async (req, res) => {
    try {
        console.log('----START---- GET request - Get data for explorer - Path: "/explorer"')
        console.log(req.query)

        const searchText = await req.query.searchtext;
        console.log(searchText);
        const gpsLat = await Number(req.query.gpsLat);
        console.log(gpsLat);
        console.log(!!gpsLat)
        const gpsLng = await Number(req.query.gpsLng);
        console.log(gpsLng);
        console.log(!!gpsLng)
        const distanceRange = await Number(req.query.distanceRange);
        console.log(distanceRange);
        console.log(!!distanceRange);
        const distanceRangeInMeters = distanceRange * 1000;
        console.log(distanceRangeInMeters);

        //
        const gpsDistTest = geolib.getDistance(
            { latitude: gpsLat, longitude: gpsLng },
            { latitude: 42.210033, longitude: 13.363449 }
        )
        console.log('GPS test: ' + gpsDistTest)

        // Dates
        const selectionStartDate = await req.query.selectionStartDate;
        const selectionEndDate = await req.query.selectionEndDate;
        console.log(selectionStartDate);
        console.log(selectionEndDate);
        console.log(selectionStartDate.length);
        console.log(selectionEndDate.length);

        const convertTimestamp = async (date) => {
            const newDate = await new Date(date);
            const dayOfMonth = await newDate.getDate();
            const month = (newDate.getMonth() + 1); // January is 0, not 1
            const year = await newDate.getFullYear();
            const dateString = year + "-" + month + "-" + dayOfMonth;
            const timestamp = dateString + ' ' + newDate.toString().substr(16, 8)
            console.log(timestamp)
            return timestamp
        }

        const event_start_date = await convertTimestamp(selectionStartDate)
        console.log(event_start_date)
        const event_end_date = await convertTimestamp(selectionEndDate)
        console.log(event_end_date)

        //Current date
        const timeNow = await convertTimestamp(Date.now())
        console.log(timeNow)
        const convertTimestampPlusOneYear = async (date) => {
            const newDate = await new Date(date);
            const dayOfMonth = await newDate.getDate();
            const month = (newDate.getMonth() + 1); // January is 0, not 1
            const year = await (newDate.getFullYear() + 1);
            const dateString = year + "-" + month + "-" + dayOfMonth;
            const timestamp = dateString + ' ' + newDate.toString().substr(16, 8)
            console.log(timestamp)
            return timestamp
        }
        const timeNowPlusOneYear = await convertTimestampPlusOneYear(Date.now())
        console.log(timeNowPlusOneYear)

        //Query
        myQuery = `	SELECT
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
        WHERE 
        (EVENTS.event_category LIKE '%${searchText}%' 
        OR
        EVENTS.event_title LIKE '%${searchText}%')
        GROUP BY EVENTS.event_id;`

        myQueryDates = `SELECT
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
        WHERE 
        (EVENTS.event_category LIKE '%${searchText}%' 
        OR
        EVENTS.event_title LIKE '%${searchText}%')
        AND 
        (EVENTS.event_start_date BETWEEN TIMESTAMP('${event_start_date}') AND TIMESTAMP('${event_end_date}')
        AND 
        EVENTS.event_end_date BETWEEN TIMESTAMP('${event_start_date}') AND TIMESTAMP('${event_end_date}'))
        GROUP BY EVENTS.event_id;`


        let exploreData = []
        if (!selectionStartDate.length) {
            console.log(myQuery)
            exploreData = await mySQL.queryDB(myQuery);
        } else {
            console.log(myQueryDates)
            exploreData = await mySQL.queryDB(myQueryDates);
        }
        console.log(exploreData);

        let filteredDistance = []
        if (!!gpsLat) {
            console.log('Fitering Distance')
            for (let i = 0; i < exploreData.length; i++) {
                console.log(i)
                const event = exploreData[i]
                console.log(event)
                const gpsDist = geolib.getDistance(
                    { latitude: gpsLat, longitude: gpsLng },
                    { latitude: event.event_gps_latitude, longitude: event.event_gps_longitude }
                )
                console.log(gpsDist)
                if (gpsDist <= distanceRangeInMeters) {
                    filteredDistance.push(exploreData[i])
                }
            }
        } else {
            filteredDistance = [...exploreData]
        }
        console.log(filteredDistance);

        res.status(200)
        res.json(filteredDistance)

        console.log('----END------ GET request - Get data for explorer - Search - Path: "/explorer"')
    } catch {
        (e) => {
            console.log(e)
            res.status(500)
        }
    }
}

module.exports = { routeHandlerFunction }