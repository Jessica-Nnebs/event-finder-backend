/* const mysql2 = require('mysql2/promise') */
/* const mysql = require('mysql')

const queryDB =  async  (myQuery) => { * /

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

/*     const SQLconnection = await mysql2.createConnection({
        host: '51.15.69.29',
        user: 'root',
        password: 'cmft2020',
        database: 'eventi',
        port: '3306'
    }); */

/*     const SQLconnection = await mysql2.createPool({
        host: '51.15.69.29',
        user: 'root',
        port: '3306',
        password: 'cmft2020',
        database: 'eventi',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }); */

/*     const SQLconnection = await mysql2.createPool({
        host: 'localhost',
        user: 'root',
        port: '3306',
        password: 'password',
        database: 'eventi',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }); */

/* const [rows, fields] = await SQLconnection.execute(myQuery); */

/* const [rows, fields] = await SQLconnection.query(myQuery); */
/*  return rows; */



/*     const mysql = require('mysql')
 
    const queryDB = (myQuery) => {
 
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: '51.15.69.29',
            user: 'root',
            password: 'cmft2020',
            database: 'eventi',
            port: '3306'
        });
 
        connection.connect();
 
        connection.query(myQuery, function (error, results, fields) {
            if (error) throw error;
             console.log('The solution is: ', results[0]); 
             console.log(results) 
            return results
 
        });
 
        connection.end();
 
    } */



const mysql = require('mysql')
const { promisify } = require('util')

const queryDB = async (myQuery) => {

    const databaseConfig = {
        host: '51.15.69.29',
        user: 'root',
        port: '3306',
        password: 'cmft2020',
        database: 'eventi',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }

    const pool = mysql.createPool(databaseConfig)
    const promiseQuery = promisify(pool.query).bind(pool)
    const promisePoolEnd = promisify(pool.end).bind(pool)
    const result = await promiseQuery(myQuery)
    await promisePoolEnd()
    return result
}

module.exports = { queryDB }




