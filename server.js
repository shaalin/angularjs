var express = require('express');
var routeRegistrar = require("./infra/routeRegistrar");
var app = express();

var oneMin = 60;


var _basicLogger = function(req, res, next){
  console.log('%s %s %s %s %s', req.host, req.url, req.protocol, req.connection.remoteAddress, req.connection.remotePort);
  next();
};


app.use(express.favicon());
app.use(express.responseTime());
app.use(express.staticCache());
app.use(express.cookieParser("Secret for cookie"));
app.use(express.bodyParser());


app.use('/static',express.static(__dirname + '/public',{maxAge: oneMin}));

app.use(_basicLogger);

routeRegistrar(app); 

// simple logger


app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});




app.listen(3000); 	

console.log('Listening on port 3000');