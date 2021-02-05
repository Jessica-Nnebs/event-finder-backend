const mysql2 = require('mysql2/promise')

const queryDB = async (myQuery) => {

    const SQLconnection = await mysql2.createConnection({
        host: 'remotemysql.com',
        user: 'o39ZzWq5mw',
        password: 'VEN07bESwe',
        database: 'o39ZzWq5mw'
    });

    const [rows, fields] = await SQLconnection.execute(myQuery);
    return rows;

}

module.exports = { queryDB } 