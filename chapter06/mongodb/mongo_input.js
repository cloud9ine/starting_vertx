var console = require('vertx/console');
var container = require('vertx/container');
var eventBus = require('vertx/event_bus');
var timer = require('vertx/timer');


container.deployModule('io.vertx~mod-mongo-persistor~2.1.0', {
	address: 'testdb.persistor',
	db_name: 'testdb'
});


timer.setTimer(2000, function(){

	eventBus.send(
	 'testdb.persistor',
	 { action: "save", collection: "testcoll", document: { "product": "book", "price": 21000} },
	 function(reply) {		
	 	console.log(reply.status);
	 	console.log(reply._id);
	});

});


