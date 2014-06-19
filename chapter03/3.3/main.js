var container = require('vertx/container');
var eb = require('vertx').eventBus;
var timer = require('vertx/timer');

container.deployVerticle('message.js');

timer.setTimer(5000, function(){
	eb.send('message.address', 'Hello!!');	
});
