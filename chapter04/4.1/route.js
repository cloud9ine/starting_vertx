var vertx = require('vertx');
var server = vertx.createHttpServer();

var routeMatcher = new vertx.RouteMatcher();

routeMatcher.get('/', function(req) {
	req.response.end("index");
});

routeMatcher.get('/hello', function(req) {
	req.response.end("hello");
});

routeMatcher.getWithRegEx('^\\/.*(js|css)$', function(req) {
	req.response.sendFile('static/' + req.path().substring(1));
});

routeMatcher.noMatch(function(req) {
    req.response().end("404 Not found");
});

routeMatcher.get("/item/:id ", function(req) {
    var id = req.params().get("id");
    req.response().end(id);
}

server.requestHandler(routeMatcher).listen(8080);
