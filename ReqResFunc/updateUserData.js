
const mySQL = require('../mySQL/mySQLconnection')

const routeHandlerFunction = async (req, res) => {

    try {
        console.log('----START---- GET request - "/updateUserData"')

        const newUserData = req.body;
        console.log(newUserData);

        let myQuery = "UPDATE USERS SET"
        let mySubQuery = ''
        let sendQuery = false;

        for (x in newUserData) {
            console.log(x);
            console.log(newUserData[x]);
            if (!!newUserData[x] && x != 'user_id') {
                mySubQuery += ` ${x} = '${newUserData[x]}',`;
                console.log(mySubQuery);
                sendQuery = true;
            }
        }

        myQuery += mySubQuery.substr(0, (mySubQuery.length - 1))
        console.log(myQuery)

        myQuery += ` WHERE user_id = ${newUserData.user_id};`
        console.log(myQuery)


        if (sendQuery) {
            const user_data = await mySQL.queryDB(myQuery);
            console.log(user_data)
        }

        await res.status(200)
        await res.json('It reached this side')

        console.log('----END------ GET request - "/updateUserData"')

    } catch {
        (e) => {
            console.log(e)
            res.status(500)
        }
    }
}

module.exports = { routeHandlerFunction }