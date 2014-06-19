var eventbus = require('vertx/event_bus');
var console = require('vertx/console');

eventbus.registerHandler('vertx.basicauthmanager.login', function(args, replier) {
	console.log("login -- username: " + args.username +", password: " + args.password);

	replier({'status': 'ok', 'sessionID': java.util.UUID.randomUUID().toString()});
});

console.log('auth.js deployed!');
