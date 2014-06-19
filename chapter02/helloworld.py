import vertx
server = vertx.create_http_server()
@server.request_handler
def handle(req):
   req.response.end("Hello World")
server.listen(8080)
