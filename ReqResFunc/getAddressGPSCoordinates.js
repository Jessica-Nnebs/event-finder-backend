const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'opencage',
    apiKey: 'dbcf492b8db545538b8b5d9acbeb0313',
};

const routeHandlerFunction = async (req, res) => {
    try {
        console.log('----START---- getAddressGPSCoordinates')

        console.log(req.query)
        const searchAddress = await req.query.searchaddress;
        console.log(searchAddress)

        let possible_addresses = [];
        let new_address_latitude = 0;
        let new_address_longitude = 0;

        // Find GPS coordinates
        if (!!searchAddress.length) {
            const eventCompleteAddress = `${searchAddress}`
            const geocoder = NodeGeocoder(options);
            const resGeo = await geocoder.geocode(eventCompleteAddress);
            console.log(resGeo)
            possible_addresses = resGeo
            new_address_latitude = resGeo[0].latitude;
            new_address_longitude = resGeo[0].longitude;
        }

        console.log(new_address_latitude)

        res.status(200)
        res.json([[new_address_latitude, new_address_longitude], possible_addresses])

        console.log('----END------ getAddressGPSCoordinates')
    } catch {
        (e) => {
            console.log(e)
            res.status(500)
        }
    }
}

module.exports = { routeHandlerFunction }