const Express = require("Express");
const cors = require("cors");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage })

const app = Express();
const port = process.env.PORT || 7777;

app.use(Express.json());
app.use(cors());

/* app.use(Express.static('public'))
app.use('/static', Express.static('public')) */
/* const dir = path.join(__dirname, 'public');
app.use(Express.static(dir)); */
app.use(Express.static('public'));

app.listen(port, () => {
    console.log(`-> -> -> -> Listening at port ${port} <- <- <- <-`)
})

// to use in another file with request
const explore = require('./ReqResFunc/explore')
app.get('/explore', explore.routeHandlerFunction)

// get data from category
const exploreGetCategory = require('./ReqResFunc/exploreGetCategory')
app.get('/category', exploreGetCategory.routeHandlerFunction)

// search text
const exploreSearch = require('./ReqResFunc/exploreSearch')
app.get('/search', exploreSearch.routeHandlerFunction)

// Insert new event in events table
const insertEvent = require('./ReqResFunc/insertEvent')
app.post('/events', insertEvent.routeHandlerFunction)

// Receive image
const saveImage = require('./ReqResFunc/saveImage')
app.post('/image', upload.single('avatar'), saveImage.routeHandlerFunction)

//register a new user
const registerUser = require('./ReqResFunc/registerUser')
app.post('/registeruser', registerUser.routeHandlerFunction)

// User login
const userLogin = require('./ReqResFunc/userLogin')
app.get('/userlogin', userLogin.routeHandlerFunction)

// User login
const userData = require('./ReqResFunc/userData')
app.get('/userdata', userData.routeHandlerFunction)


/* // Receive image from user
const saveImageUser = require('./ReqResFunc/saveImageUser')
app.post('/imageuser', upload.single('avatar'), saveImageUser.routeHandlerFunction) */


// GET request to collect data in event database - path '/events'
// Filter data from userEvents table to get number of people particiating



// POST request to insert data in event database - path '/events'



// GET request to collect data from user specific event - path '/userevents'



// POST request to user specific event - path '/userevents'




