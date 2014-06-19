var console = require('vertx/console');
var vertx = require('vertx');
var bus = vertx.eventBus;
var container = require('vertx/container');

container.deployVerticle('flickr-client.js');

var rm = new vertx.RouteMatcher();

rm.get('/', function(req) {

	var tag = req.params().get('q');

	bus.send('flickr_api_address', tag, function(message) {

		var items = JSON.parse(message).items;

		var html = '<html><h1>Result for ' + tag + '</h1>';

		for(var i=0; i < items.length; i++) {

			html += '<h3>' + items[i].title + '</h3>';
			html += '<a href="' + items[i].link + '"><img src="' + items[i].media.m + '" /></a>';
			html +=  '<p>Tags: ' + items[i].tags +'</p>';
		}

		html += '</html>';

		req.response.end(html);

	});
});

rm.getWithRegEx('.*', function(req) {
	req.response.end("Invalid Search Keyword");
});


vertx.createHttpServer().requestHandler(rm).listen(8080);