var vertx = require('vertx');
var eb = vertx.eventBus;
var console = require('vertx/console');

console.log('쥐1 deployed');

eb.registerHandler('warning.address', function(message) {
	console.log('쥐1 ' +message);	
});