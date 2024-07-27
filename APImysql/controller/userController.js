const express = require('express');
const router = express.Router();
const userService = require('../model/userModel');

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ success: false, message: 'Unauthorized: Please login first' });
    }
};

// Authenticate user and create session
router.post('/authenticate', (req, res) => {
    userService.authenticateUser(req.body.loginId, req.body.password)
        .then(result => {
            req.session.user = result.user;
            res.json({ success: true, message: 'Authentication successful', user: result.user });
        })
        .catch(error => {
            console.error(error);
            res.status(401).json({ success: false, message: 'Invalid loginId or password', error: error.message });
        });
});

// Logout user and destroy session
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Failed to logout' });
        }
        res.json({ success: true, message: 'Logout successful' });
    });
});

// Sign up new user (accessible without authentication)
router.post('/signUp', (req, res) => {
    userService.addUser(req.body)
        .then(result => res.status(201).json({ success: true, message: 'User registered successfully', user: result.user }))
        .catch(error => {
            console.error(error);
            res.status(500).json({ success: false, error: error.message });
        });
});

// Protect all routes below this middleware
router.use(isAuthenticated);

// Add a new user
router.post('/adduser', (req, res) => {
    userService.addUser(req.body)
        .then(result => res.status(201).json({ success: true, message: 'Data added successfully', user: result.user }))
        .catch(error => {
            console.error(error);
            res.status(500).json({ success: false, error: error.message });
        });
});

// Update a user
router.post('/updateuser/:id', (req, res) => {
    userService.updateUser(req.params.id, req.body)
        .then(result => res.json({ success: true, message: 'Data updated successfully', user: result }))
        .catch(error => {
            console.error(error);
            res.status(500).json({ success: false, error: error.message });
        });
});

// Delete a user
router.post('/deleteuser/:id', (req, res) => {
    userService.deleteUser(req.params.id)
        .then(result => res.json({ success: true, message: 'User deleted successfully' }))
        .catch(error => {
            console.error(error);
            res.status(500).json({ success: false, error: error.message });
        });
});

// Get user by ID
router.get('/getuser/:id', (req, res) => {
    userService.getUserById(req.params.id)
        .then(result => res.json({ success: true, user: result }))
        .catch(error => {
            console.error(error);
            res.status(500).json({ success: false, error: error.message });
        });
});

// Search users
router.get('/searchuser', (req, res) => {
    userService.searchUsers(req.query)
        .then(result => res.json({ success: true, users: result }))
        .catch(error => {
            console.error(error);
            res.status(500).json({ success: false, error: error.message });
        });
});

module.exports = router;
