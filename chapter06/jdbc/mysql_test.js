var console = require('vertx/console');
var container = require('vertx/container');
var timer = require('vertx/timer');
var eventBus = require('vertx/event_bus');

var config = {
	address: 'mysql.test',
	driver: 'com.mysql.jdbc.Driver',
	url: 'jdbc:mysql://localhost:3306/test',
	username: 'root',
	password: 'root'
};

container.deployModule('com.bloidonia~mod-jdbc-persistor~2.1', config);


eventBus.registerHandler('mysql.test.ready', function(msg){	
	console.log('-- sql connect --');
	console.log('status: ' + msg.status);	
});

