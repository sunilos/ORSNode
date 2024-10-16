
const express = require('express');
const router = express.Router();
const userService = require('../models/userModel');

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

router.post('/authenticate', (req, res) => {
    userService.authenticateUser(req.body.loginId, req.body.password)
        .then(user => {
            req.session.user = user; // Set user in session
            console.log(req.session.id, '======sessionid==========');
            res.json({ message: 'Authentication successful', user });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Logout failed' });
        } else {
            res.json({ message: 'Logout successful' });
        }
    });
});

router.post('/signup', (req, res) => {
    userService.addUser(req.body)
        .then(result => res.status(201).json(result))
        .catch(error => {
            console.error('error ========== >');
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

router.use(isAuthenticated);

router.post('/adduser', (req, res) => {
    userService.addUser(req.body)
        .then(result => res.status(201).json(result))
        .catch(error => {
            console.error('error ========== >');
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

router.get('/searchuser', async (req, res) => {
    const query = {};
    if (req.query.firstName) {
        query.firstName = new RegExp(req.query.firstName, 'i');
    }
    if (req.query.lastName) {
        query.lastName = new RegExp(req.query.lastName, 'i');
    }
    if (req.query.loginId) {
        query.loginId = new RegExp(req.query.loginId, 'i');
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    try {
        const users = await userService.searchUsers(query, page, limit);
        const totalCount = await userService.countUsers(query);

        res.json({
            users,
            totalCount,
            page,
            totalPages: Math.ceil(totalCount / limit),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/deleteuser/:id', (req, res) => {
    userService.deleteUser(req.params.id)
        .then(result => res.json(result))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

router.post('/updateuser/:id', (req, res) => {
    userService.updateUser(req.params.id, req.body)
        .then(result => res.json(result))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

router.get('/getuser/:id', (req, res) => {
    userService.getUserById(req.params.id)
        .then(result => res.json(result))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

module.exports = router;
