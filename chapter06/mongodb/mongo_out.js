var vertx = require('vertx');
var console = require('vertx/console');
var container = require('vertx/container');
var eventBus = require('vertx/event_bus');


container.deployModule('io.vertx~mod-mongo-persistor~2.1.0', {
	address: 'testdb.persistor',
	db_name: 'testdb',
	host: '127.0.0.1',
	port: 27017	
});



vertx.createHttpServer().requestHandler(function(req) {

	eventBus.send(
	 'testdb.persistor',
	 { action: "find", collection: "testcoll", matcher:{} },
	 function(reply) {	 	

	 	if(reply.status == 'ok') {
	 		var books = [];
				reply.results.forEach(function(el, i) {
	 			books.push(new Book(el));
	 		});

 			req.response.putHeader('Content-Type', 'application/json');
			req.response.end(JSON.stringify(books));
				
		
	 	}else {
	 		req.response.end('No data found');
	 	}

	});

}).listen(8080);


function Book(el) {
	this.id = el._id.$oid;
	this.product = el.product_name;
	this.price = el.price.toFixed();
}