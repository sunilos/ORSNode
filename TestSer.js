//Import dependencies 
var express = require('express');
var session = require("express-session")
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var multer = require('multer');//Halble multipart form

//Create express app
var app = express();

//Configure modules
app.use(bodyParser.json());//parse json data from request
app.use(bodyParser.urlencoded({ extended: true })); //parse request parameters  
app.use(multer({ dest: __dirname + '/tmp/' }).any());//tempretory folder to store uploaded files
app.use(cookieParser()) //Cookie aprser


//Set static resources folder
app.use(express.static('./public'));

//From controller
app.use(function (req, res, next) {
    console.log(req.url);
    next();
})

app.all('/:path/:method/:id?', function (request, response) {
    console.log('----->' + request.method)
    console.log('Path:' + request.params.path);
    console.log('Method:' + request.params.method);
    console.log('ID:' + request.params.id);
    console.log('Params[0]:'+ request.params[0]);
    console.log(request.params);
    response.send('Ok');
});


//Start server at 8080 port
var listener = app.listen(8080, "localhost", function () {
    var host = listener.address().address
    var port = listener.address().port
    console.log('listening to http://' + host + ':' + port);
});

