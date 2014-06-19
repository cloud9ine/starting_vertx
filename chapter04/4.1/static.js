var console = require('vertx/console');
var vertx = require('vertx');

vertx.createHttpServer().requestHandler(function(req) {

	req.response.sendFile('static' + req.path());

}).listen(8080);