const Express = require("Express");
const cors = require("cors");

const app = Express();
const port = process.env.PORT || 8080;

app.use(Express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`-> -> -> -> Listening at port ${port} <- <- <- <-`)
})

// to use in another file with request
const myDB = require('./mySQL/mySQLconnection')

const getTables = async () => {
    const myQueryEVENTS = 'SELECT * FROM EVENTS';
    const myQueryUSERSEVENTS = 'SELECT * FROM USERSEVENTS';
    const events = await myDB.queryDB(myQueryEVENTS);
    const usersevents = await myDB.queryDB(myQueryUSERSEVENTS);
    console.log(events[0]);
    console.log(usersevents[0]);
}

getTables()

// GET request to collect data in event database - path '/events'
// Filter data from userEvents table to get number of people particiating



// POST request to insert data in event database - path '/events'



// GET request to collect data from user specific event - path '/userevents'



// POST request to user specific event - path '/userevents'




