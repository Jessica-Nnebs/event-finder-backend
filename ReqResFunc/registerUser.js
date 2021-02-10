const mySQL = require('../mySQL/mySQLconnection')

const routeHandlerFunction = async (req, res) => {

    try {
        console.log('----START---- POST request - Register new user - Path: "/registeruser"')

        const userData = await req.body;
        console.log(userData)

        const {
            user_name,
            user_first_name,
            user_last_name,
            user_birthdate,
            user_email,
            user_phone,
            user_password
        } = userData;

        const myQuery = `SELECT * FROM USERS WHERE user_name='${user_name}' OR user_password='${user_email}' OR user_phone='${user_phone}';`

        const insertQuery = `
               INSERT INTO USERS(
                   user_name, 
                   user_first_name, 
                   user_last_name, 
                   user_birthdate,
                   user_email, 
                   user_phone, 
                   user_password
                   )
               VALUES(
                   '${user_name}',
                   '${user_first_name}',
                   '${user_last_name}',
                   '${user_birthdate}',
                   '${user_email}',
                   '${user_phone}',
                   '${user_password}'
                   );`

        const user = await mySQL.queryDB(myQuery);
        console.log(user)

        let userRegistered = false;

        if (!user.length) {
            const newuser = await mySQL.queryDB(insertQuery);
            console.log(newuser)
        } else {
            userRegistered = true;
        }

        res.status(200)
        res.json({ userRegistered })

        console.log('----END------ POST request - Register new user - Path: "/registeruser"')

    } catch {
        (e) => {
            console.log(e)
            res.status(500)
        }
    }
}

module.exports = { routeHandlerFunction }