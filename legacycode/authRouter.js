var RoleCtl = require("./controller/RoleCtl");
var UserCtl = require("./controller/UserCtl");

var express = require('express');

/**
 * Router for all incoming request those do not require authentication.
 */
var loginRouter = express.Router();

/**
 * Defines routes those do not need authentication
 * 1) /login
 * 2) /forgotPassword
 * 3) /logout
 * 4) /signup
 */
loginRouter.post('/login', function (request, response) {
    var ctl = new UserCtl();
    ctl.login(request, response)
});

loginRouter.post('/logout', function (request, response) {
    var ctl = new UserCtl();
    ctl.logout(request, response)
});

loginRouter.post('/forgotPassword', function (request, response) {
    var ctl = new UserCtl();
    ctl.forgotPassword(request, response)
});

loginRouter.get('/menu', function (request, response) {
    var ctl = new UserCtl();
    ctl.menu(request, response)
});

module.exports = loginRouter;