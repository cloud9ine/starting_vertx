var console = require('vertx/console');
var vertx = require('vertx');
var eb = vertx.eventBus;
var address = 'ping.address';

vertx.setPeriodic(2000, ping);

var count = 0;

function ping() {
	var msg = 'ping ' + count++;
	eb.send(address, msg);
	console.log('Ping ... ' + msg);
}

