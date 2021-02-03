const mysql2 = require('mysql2/promise')

const queryDB = async (myQuery) => {

    const SQLconnection = await mysql2.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'event_finder'
    });

    const [rows, fields] = await SQLconnection.execute(myQuery);
    return rows;

}

module.exports = { queryDB } 