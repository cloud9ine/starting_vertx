var console = require('vertx/console');
var vertx = require('vertx');
var eb = vertx.eventBus;
var address = 'ping.address'


eb.registerHandler(address, function(message) {
	console.log('Ping arrived ... ' + message);

});

