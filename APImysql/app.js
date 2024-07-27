const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const session = require('express-session');
const userRoutes = require('./controller/userController');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Configure session middleware
app.use(session({
    secret: 'aS3cr3tK3yThatIsV3ryStr0ngAndS3cure!',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Routes
app.use('/api', userRoutes);

// Test MySQL connection
sequelize.authenticate()
    .then(() => {
        console.log('Connected to MySQL');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
