
const mySQL = require('../mySQL/mySQLconnection')

const routeHandlerFunction = async (req, res) => {
    try {
        console.log('----START---- GET request - Get user data - Path: "/userdata"')

        const user_id = req.query.user_id
        console.log(user_id)

        myQuery = `SELECT * FROM USERS WHERE user_id='${user_id}';`;

        const user_data = await mySQL.queryDB(myQuery);
        console.log(user_data)

        const userData = await {
            user_name: user_data[0].USER_NAME,
            user_first_name: user_data[0].USER_FIRST_NAME,
            user_last_name: user_data[0].USER_LAST_NAME,
            user_birthdate: user_data[0].USER_BIRTHDATE,
            user_email: user_data[0].USER_EMAIL,
            user_phone: user_data[0].USER_PHONE,
            user_password: user_data[0].USER_PASSWORD
        }

        await res.status(200)
        await res.json(userData)

        console.log('----END------ GET request - Get image - Path: "/userdata"')

    } catch {
        (e) => {
            console.log(e)
            res.status(500)
        }
    }
}

module.exports = { routeHandlerFunction }