var vertx = require('vertx');
var console = require('vertx/console');
var eventbus = require('vertx/event_bus');

var todoStore = [];
var count = 0;


eventbus.registerHandler('todo.list', function(args, replier){
	replier({
		"todos": Object.keys(todoStore).map(function(key){
			if(key)
				return todoStore[key];
		})
	})
});


eventbus.registerHandler('todo.add', function(todo, replier) {

	if(!todo.id) {
		todo.id = ++count;
		todo.created = new Date();
	}

	todoStore[todo.id] = todo;
	replier(todo);

	if(todo.shared) {		
		eventbus.publish('todo.shared', todo);
	}
});


eventbus.registerHandler('todo.view', function(args, replier) {
	if (todoStore[args.id] != undefined) {
		replier(todoStore[args.id]);
	}else {
		replier({});
	}
});


eventbus.registerHandler('todo.delete', function(args, replier) {
	if (todoStore[args.id] != undefined) {
		delete todoStore[args.id];
		replier({status: 'ok'});
	}else {
		replier({status: 'error'});
	}
});


console.log('todo.js deployed!');
