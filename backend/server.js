var express = require('express');
var app = express();

global.router = express.Router();

var bodyParser = require('body-parser');
path= require('path');
appRoot= __dirname;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended:true}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,token,user_id');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

global.NodeCache = require( "node-cache" );
global.myCache = new NodeCache();
app.use(logErrors);
app.use('/app', require('./routes/routes'));

function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}

app.get('/', function(req, res) {
    res.send("server is running");
});

var server = app.listen(5008, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server is listening at http://%s:%s', host, port);
});
