var console = require('vertx/console');
var vertx = require('vertx');
var route = new vertx.RouteMatcher();

var wshandler = function(websocket) {

	if(websocket.path() == '/echo') {
		console.log("websocket !");
	}else {
		websocket.reject();
	}
};

route.get('/', function(req) {
	req.response.sendFile('static/index.html');
});


var server = vertx.createHttpServer();
server.websocketHandler(wshandler).requestHandler(route).listen(8080);
