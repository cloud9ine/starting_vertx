var console = require('vertx/console');
var vertx = require('vertx');

var http = vertx.createHttpServer().requestHandler(function(req) {

	if(req.uri() === '/favicon.ico') {
		return;
	}

	console.log("METHOD " + req.method());
	console.log("URI " + req.uri());
	console.log("QUERY "  +req.query());
	console.log("PARAMS " + req.params().get("productId"));

	 req.params().forEach(function(key, value) {

	 	console.log("Key: " + key + ", Value: " + value);
	 });

	req.response.end();

}).listen(8080);
