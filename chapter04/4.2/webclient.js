var console = require('vertx/console');
var vertx = require('vertx');
var client = vertx.createHttpClient().host('api.flickr.com').port('80');

client.getNow('/services/feeds/photos_public.gne?tags=벗꽃'+ '&format=json', function(res) {

	console.log('Response Code: ' + res.statusCode());

	res.bodyHandler(function(bodyRes) {
		var body = bodyRes.toString();
		body = body.substring( body.indexOf('(') + 1, body.length -1).trim();
	 	body = body.replace(new RegExp("\\\\'", "g"), "'");
		console.log(body);
	});
});

