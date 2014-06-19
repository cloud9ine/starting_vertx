var vertx = require('vertx');
var eb = vertx.eventBus;
var console = require('vertx/console');
console.log('쥐2 deployed');

eb.registerHandler('warning.address', function(message, replier) {
	console.log('쥐2 ' + message);	
});
