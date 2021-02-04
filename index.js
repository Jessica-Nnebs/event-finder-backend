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
const explorer = require('./ReqResFunc/explorer')
app.get('/explorer', explorer.routeHandlerFunction)

// get data from category
const explorerGetCategory = require('./ReqResFunc/explorerGetCategory')
app.get('/category', explorerGetCategory.routeHandlerFunction)

// GET request to collect data in event database - path '/events'
// Filter data from userEvents table to get number of people particiating



// POST request to insert data in event database - path '/events'



// GET request to collect data from user specific event - path '/userevents'



// POST request to user specific event - path '/userevents'




