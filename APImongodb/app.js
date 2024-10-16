const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const db = require('./db');
const userRoute = require('./controller/userController');
const marksheetRoute = require('./controller/marksheetController');
const studentRoute = require('./controller/studentController');

const app = express();

app.use((req, res, next) => {
    const origin = req.headers.origin;
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

app.use(bodyParser.json());

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use('/api/user', userRoute);
app.use('/api/marksheet', marksheetRoute);
app.use('/api/student', studentRoute);

const port = 5000;

app.listen(port, () => {
    console.log("Server is running on: http://localhost:" + port);
});