import org.vertx.java.platform.Verticle;
public class Hello extends Verticle {
      public void start() {
         container.logger().info("Hello World");
   }
}
