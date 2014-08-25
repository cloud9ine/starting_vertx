var vertx = require('vertx/http');
vertx.createHttpServer().requestHandler(function(req) {
req.response.end("Hello World");
}).listen(8080);
