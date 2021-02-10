const mySQL = require('../mySQL/mySQLconnection')

const routeHandlerFunction = async (req, res) => {

    try {
        console.log('----START---- GET request - Confirm user credentials - Path: "/userlogin"')

        const userCredentials = await req.query;
        console.log(userCredentials)

        const {
            user_name,
            user_password
        } = userCredentials;

        console.log(user_name)
        console.log(user_password)

        myQuery = `SELECT * FROM USERS WHERE user_name='${user_name}' AND user_password='${user_password}';`


        const user = await mySQL.queryDB(myQuery);
        console.log(user)
        const user_id = user[0].USER_ID
        const user

        if (!!user.length) {
            const user_id = user[0].USER_ID
            console.log(user_id)
        }



        res.status(200)
        res.json({ user_id })

        console.log('----END------ GET request - Confirm user credentials - Path: "/userlogin"')

    } catch {
        (e) => {
            console.log(e)
            res.status(500)
        }
    }
}

module.exports = { routeHandlerFunction }