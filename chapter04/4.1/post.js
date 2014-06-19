var console = require('vertx/console');
var vertx = require('vertx');

var http = vertx.createHttpServer().requestHandler(function(req) {

	if(req.uri() === '/favicon.ico') {
		return;
	}

	console.log("URI " + req.uri());
	console.log("QUERY "  +req.query());
	console.log("PARAMS " + req.params());

	 req.headers().forEach(function(key, value) {

	 	console.log(key + ":" + value);
	 });

	 console.log(req.headers().get("Content-Type"));


	req.dataHandler(function(buffer) {

		var map = {};

		 java.net.URLDecoder.decode(buffer.toString(), 'UTF-8').split('&').forEach(function(data) {

			var s = data.split('=');
			map[s[0]] = s[1];
		})


		console.log(map.name);
		console.log(map.age);
		console.log(map.sex);
		

	});

	req.response.end("OK");

}).listen(8080);
