package trash;

import java.util.logging.Logger;

/**
 * Application launcher.
 * Starts a HTTP server and listens for requests
 * 
 * @author bisol
 *
 */
public class Server {
	private static final Logger logger = Logger.getLogger(Server.class.getName());
	
//	private static URI getBaseURI() {
//		return UriBuilder.fromUri("http://localhost/").port(8000).build();
//	}
//
//	public static final URI BASE_URI = getBaseURI();
//
//	protected static HttpServer createServer() throws IOException {
//		logger.info("Starting server...");
//		ResourceConfig rc = new PackagesResourceConfig("com.bisol.hexagon.http");
//		rc.getFeatures().put(JSONConfiguration.FEATURE_POJO_MAPPING, true);
//		HttpServer server = HttpServerFactory.create(getBaseURI(), rc);
//	    return server;
//	}
//
//	public static void main(String[] args) throws IOException {
//		HttpServer httpServer = createServer();
//		httpServer.start();
//		logger.info(String.format("Medical registry started with WADL available at %sapplication.wadl\n\n", BASE_URI, BASE_URI));
//	}
}