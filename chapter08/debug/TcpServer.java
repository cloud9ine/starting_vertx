
import org.vertx.java.core.Handler;
import org.vertx.java.core.net.NetSocket;
import org.vertx.java.platform.Verticle;

public class TcpServer extends Verticle{
	@Override
	public void start() {
		
		vertx.createNetServer().connectHandler(new Handler<NetSocket>() {
			
			@Override
			public void handle(NetSocket socket) {
			
				String addr = socket.remoteAddress().getHostName();
				
				socket.write("Welcome to the MyServer from " + addr);
			}
		}).listen(23);
	}
}

