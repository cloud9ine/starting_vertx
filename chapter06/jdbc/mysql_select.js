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

timer.setTimer(2000, function() {

	eventBus.send(
		'mysql.test', 		
		{
			action: 'select',
			stmt: 'select * from memo'			
		 },
		function(msg) {
			console.log('-- sql result --');
			console.log('status: ' + msg.status);			

			for(var i in msg.result) {
				console.log( "Id: " + msg.result[i].id + ", Content: " + msg.result[i].content);
			}
		}
	);
});