const sharp = require("sharp")
const mySQL = require('../mySQL/mySQLconnection')

const routeHandlerFunction = async (req, res) => {
    try {
        console.log('----START---- POST request - Get image - Path: "/image"')

        console.log(req)
        console.log(req.body)
        console.log(req.file)

        console.log(req.file.mimetype)
        const filemimeType = req.file.mimetype
        const filetype = filemimeType.substring((filemimeType.length), (filemimeType.length - 3))
        console.log(filetype)

        myQuery = "SELECT MAX(EVENT_ID) AS 'MAX_EVENT_ID' FROM EVENTS;"

        const max_event_id = await mySQL.queryDB(myQuery);
        console.log(max_event_id)
        console.log('./public/events/' + max_event_id[0].MAX_EVENT_ID + '.' + filetype)

        await sharp(req.file.buffer).resize({ width: 1000 }).toFile('./public/events/' + max_event_id[0].MAX_EVENT_ID + '.png')

        res.status(200)
        res.json('Image was saved')

        console.log('----END------ POST request - Get image - Path: "/image"')

    } catch {
        (e) => {
            console.log(e)
            res.status(500)
        }
    }
}

module.exports = { routeHandlerFunction }