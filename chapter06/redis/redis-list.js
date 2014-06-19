var vertx = require('vertx');
var console = require('vertx/console');
var container = require('vertx/container');
var eb = require('vertx/event_bus');
var timer = require('vertx/timer');



var config = {
	address: 'test.redis',
	host: '127.0.0.1',
	port: 6379
};

container.deployModule('io.vertx~mod-redis~1.1.3', config);

timer.setTimer(3000, function() {

 eb.send(config.address, { command: 'rpush', args:['list-key', 'item2'] }, function(replier) {
 	console.log("Status > " + replier.status);
	if(replier.status == 'ok') {
		console.log("Result > " + replier.value);
	}
 })

});

timer.setTimer(5000, function() {

 eb.send(config.address, { command: 'lrange', args:['list-key' ,'0', '1'] }, function(replier) {

 	console.log("Status > " + replier.status);
	if(replier.status == 'ok') {
		console.log("Value > " + replier.value);
	}
 })

});
