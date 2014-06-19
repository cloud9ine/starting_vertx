var vertx = require('vertx');
var console = require('vertx/console');

var server = vertx.createHttpServer();

server.requestHandler(function(req) {

	var uri = req.uri();

	if(uri == "/upload") {
		console.log("req start");
		req.expectMultiPart(true);
		req.uploadHandler(function(upload) {
			var filename = upload.filename();
			vertx.fileSystem.open(filename, function(err, file) {
			    var pump = new vertx.Pump(req, file)
			    req.endHandler(function() {
			      file.close(function() {
			        console.log("Uploaded " + pump.bytesPumped() + " bytes to " + filename);
			        req.response.end();
			      });
			    });
			    pump.start()
			    req.resume();
				
			});

			
		});			
	}else {
		req.response.sendFile("upload.html");
	}
	

}).listen(8080, 'localhost');

