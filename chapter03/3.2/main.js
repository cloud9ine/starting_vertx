var container = require('vertx/container');
var console = require('vertx/console');
var eb = require('vertx').eventBus;
var timer = require('vertx/timer');

container.deployVerticle('mouse1.js');
container.deployVerticle('mouse2.js');

timer.setTimer(3000, function(){
	eb.publish('warning.address', '고양이 출현!');	
});

eb.registerHandler('warning.address', function(message) {
	console.log('-->' + message);
	
});