//import require controller module.
var CollegeCtl = require("./controller/CollegeCtl");
var MarksheetCtl = require("./controller/MarksheetCtl");
var RoleCtl = require("./controller/RoleCtl");
var UserCtl = require("./controller/UserCtl");
var StudentCtl = require("./controller/StudentCtl");

var express = require('express');

/**
 * Routes for all incoming requests require authentication
 */
var router = express.Router();

/**
 * It is Front Controller. It performs authentication for all incoming requests. 
 */
router.use(function (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        //res.status(403).send("OOPS Session is timeout");
        next();
    }
})


/**
 * Defines routes for application end pointes those require authentication
 */
router.all('/:usecase/:operation/:id?', function (request, response) {
    console.log('App Router');
    //console.log('Usecase:' + request.params.usecase);
    //console.log('Operation:' + request.params.operation);
    //console.log('ID:' + request.params.id);
    //console.log('Http Method :' + request.method);

    var op = request.params.operation;

    if ('OPTIONS' == request.method) {
        response.end('ok');
        return;
    }

    if ('POST' == request.method) {
        if ('get' == op || 'preload' == op) {
            response.status(400).send('Http Post is not allowed');
            return;
        }
    }

    if ('GET' == request.method) {
        if ('save' == op) {
            response.status(400).send('Http Get is not allowed');
            return;
        }
    }

    var usecase = request.params.usecase + "Ctl()";
    var ctl = eval("new " + usecase);//create controller
    console.log(usecase);

    var exp = "ctl." + op + "(request, response)";
    console.log(exp);
    eval(exp); //call method
});

module.exports = router;