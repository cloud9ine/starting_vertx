var vertx = require('vertx');
var console = require('vertx/console');
var container = require('vertx/container');
var eb = require('vertx/event_bus');

var server = vertx.createHttpServer();
var route = new vertx.RouteMatcher();

route.get('/', function(req){
	req.response.sendFile('static/index.html');
});

route.getWithRegEx('^\\/.*(js|css)$', function(req){
	console.log("static resource: " + req.path().substring(1));
	req.response.sendFile('static/' + req.path().substring(1));
});

server.requestHandler(route);

var sockj = vertx.createSockJSServer(server);
sockj.bridge(
	{ prefix: '/eventbus' },
	[],
	[]
);


server.listen(8080);
