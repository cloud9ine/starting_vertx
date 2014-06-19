import org.vertx.java.platform.Verticle;

public class HelloWorld extends Verticle {
    public void start() {
        vertx.createHttpServer().requestHandler(new Handler<HttpServerRequest>() {
           public void handle(HttpServerRequest req) {
               req.response().end("Hello World");
          }
     }).listen(8080);
}
