const mysql2 = require('mysql2/promise')

const queryDB = async (myQuery) => {

    /*     const SQLconnection = await mysql2.createConnection({
            host: 'sql7.freesqldatabase.com',
            user: 'sql7390932',
            password: 'l2Bh9jucsH',
            database: 'sql7390932',
            port: '3306'
        }); */

    /*     const SQLconnection = await mysql2.createPool({
            host: 'sql7.freesqldatabase.com',
            user: 'sql7390932',
            port: '3306',
            password: 'l2Bh9jucsH',
            database: 'sql7390932',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        }); */

    const SQLconnection = await mysql2.createPool({
        host: '51.15.69.29',
        user: 'root',
        port: '3306',
        password: 'cmft2020',
        database: 'eventi',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    /* const [rows, fields] = await SQLconnection.execute(myQuery); */

    const [rows, fields] = await SQLconnection.query(myQuery);
    return rows;

}

module.exports = { queryDB } 