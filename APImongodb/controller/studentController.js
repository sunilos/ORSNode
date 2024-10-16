// studentController.js

const express = require('express');
const router = express.Router();
const studentService = require('../models/studentModel');

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

// Apply middleware to all routes
router.use(isAuthenticated);

// Add a new student
router.post('/addstudent', (req, res) => {
    studentService.addStudent(req.body)
        .then(result => res.status(201).json(result))
        .catch(error => {
            console.error('error ========== >');
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

// Search students by name
// Search students by name
router.get('/searchstudent', (req, res) => {
    const query = {};
    if (req.query.name) {
        query.name = new RegExp(req.query.name, 'i');
    }
    if (req.query.subject) {
        query.subject = new RegExp(req.query.subject, 'i');
    }
    if (req.query.mobileNo) {
        query.mobileNo = new RegExp(req.query.mobileNo, 'i');
    }

    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 5; // Default to 5 records per page

    studentService.searchStudents(query, page, limit)
        .then(result => {
            res.json({
                students: result.students,
                total: result.total,
                page,
                totalPages: Math.ceil(result.total / limit) // Calculate total pages
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

router.get('/prelod', (req, res) => {
    const query = {};
    if (req.query.name) {
        query.name = new RegExp(req.query.name, 'i');
    }
    if (req.query.subject) {
        query.subject = new RegExp(req.query.subject, 'i');
    }
    if (req.query.mobileNo) {
        query.mobileNo = new RegExp(req.query.mobileNo, 'i');
    }

    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 500; // Default to 5 records per page

    studentService.searchStudents(query, page, limit)
        .then(result => res.json(result))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

// Delete a student by ID
router.post('/deletestudent/:id', (req, res) => {
    studentService.deleteStudent(req.params.id)
        .then(result => res.json(result))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

// Update a student's information
router.post('/updatestudent/:id', (req, res) => {
    studentService.updateStudent(req.params.id, req.body)
        .then(result => res.json(result))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

// Get a student by ID
router.get('/getstudent/:id', (req, res) => {
    studentService.getStudentById(req.params.id)
        .then(result => res.json(result))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

module.exports = router;