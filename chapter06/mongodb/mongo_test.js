var container = require('vertx/container');

container.deployModule('io.vertx~mod-mongo-persistor~2.1.0', {
	address: 'testdb.persistor',
	db_name: 'testdb',
	host: '127.0.0.1',
	port: 27017
});

