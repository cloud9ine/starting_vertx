var console = require('vertx/console');
var vertx = require('vertx');
var bus = vertx.eventBus;

console.log('flickr-client deployed!');

var client = vertx.createHttpClient().host('api.flickr.com').port('80');

bus.registerHandler('flickr_api_address', function(message, replier) {

	client.getNow('/services/feeds/photos_public.gne?tags=' + message + '&format=json', function(res) {

			console.log('ResponseCode ' + res.statusCode());

			res.bodyHandler(function(bodyRes) {

				var body = bodyRes.toString();				
				body = body.substring( body.indexOf('(') + 1, body.length -1).trim();
			 	body = body.replace(new RegExp("\\\\'", "g"), "'");

			 	
			 	replier(body);

			});

		});

});