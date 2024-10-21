require('dotenv').config();

const express = require('express');
const path = require('path');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');

const {dbConnect} = require('./src/config/dbConnection');

const app = express();

port = process.env.APP_PORT;

// routes
const pageRoute = require('./src/routes/pageRoute');
const parentRoute = require('./src/routes/parentRoute');
const adminRoute = require('./src/routes/adminRoute');
const studentRoute = require('./src/routes/studentRoute');

// configure ejs template
app.set('view engine', 'ejs');

// set static file directory
app.use(express.static(path.join(__dirname, '/public')));

app.use(express.json());
app.use(cookieParser());

app.use(pageRoute);
app.use(parentRoute);
app.use(adminRoute);
app.use(studentRoute);


// db connection
dbConnect();

// port 
app.listen(port, ()=>{
    console.log('Server is running on port', port)
});
