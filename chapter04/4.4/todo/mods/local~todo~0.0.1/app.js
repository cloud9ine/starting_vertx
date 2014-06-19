var vertx = require('vertx');
var console = require('vertx/console');
var container = require('vertx/container');

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
	[
		{address: 'todo.list'},
		{address: 'todo.view'},
		{address: 'todo.add'},		
		{address: 'todo.delete'},
		{address: 'vertx.basicauthmanager.login'}
	],

	[
		{address: 'todo.shared'}
	]

);


server.listen(8080);

container.deployVerticle('todo.js');
container.deployVerticle('auth.js');
