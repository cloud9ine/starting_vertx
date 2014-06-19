function displayTodos(todo) {
	var tr =$("<tr>",{id: todo.id});
	tr.append($("<td rowspan='2'>").append(todo.id))
	.append($("<td>").append(todo.created))
	.append($("<td>").append(
		$("<button>",{type:'button', class: 'btn btn-default btn-todo-del', id: todo.id}).append('삭제')
	));	
	tr.appendTo($("#todo-place"));

	tr= $("<tr>",{id: todo.id});
	tr.append($("<td colspan='3'>").append(todo.description));
   tr.appendTo($("#todo-place"));	


}

function removeTodo(id) {
	$("tr[id='" + id + "']").remove();
}

var client = (function(){

	function TodoClient() {
		this.eb = new vertx.EventBus(window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/eventbus");
		this.eb.onopen = function() {
			console.log("open!");
			client.list();
			var self = this;

			self.registerHandler('todo.shared', function( todo) {
				if(todo.sessionID != self.sessionID) {
					displayTodos(todo);
				}
			});
		};
	}

	TodoClient.prototype.list = function() {
		console.log("get list");
		this.eb.send('todo.list', {}, function(result) {
			$.each(result.todos, function(i, item) {
				displayTodos(item);
			});	
		});
	}


	TodoClient.prototype.add = function(description, shared) {
		var self = this.eb;
		this.eb.send('todo.add', 
				{
					'description': description,
					'shared': shared,
					'sessionID': self.sessionID
				},
				 function(result) { displayTodos(result); });
	}

	
	TodoClient.prototype.view = function(id) {
		console.log("get todo : "  + id);
		this.eb.send('todo.view', {'id': id}, function(result) {
			console.log(result);
		});
	}

	TodoClient.prototype.delete = function(id) {
		console.log("delete todo : "  + id);
		this.eb.send('todo.delete', {'id': id}, function(result) {
			console.log(result);
			if(result.status === 'ok') {
				removeTodo(id);
			}
		});
	}


	TodoClient.prototype.login = function(username, password, callback) {
		this.eb.login(username, password, function(result) {
			if(result.status === 'ok') {
				callback();
			}
		});
	}


	return new TodoClient();

})();
