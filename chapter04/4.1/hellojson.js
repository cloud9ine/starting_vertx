var vertx = require('vertx');
vertx.createHttpServer().requestHandler(function(req) {

	req.response.putHeader("Content-Type", "application/json");

	var hello = { name: 'Hello World' };
	req.response.end(JSON.stringify(hello));

}).listen(8080);
