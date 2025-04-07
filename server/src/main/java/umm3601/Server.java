package umm3601;

import java.util.Arrays;

import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

import org.bson.UuidRepresentation;

import io.javalin.Javalin;
import io.javalin.http.InternalServerErrorResponse;

/**
 * The main server class that configures and starts the Javalin server
 * with MongoDB connection and controller routes.
 */
public class Server {

    private static final int SERVER_PORT = 4567;
    private final MongoClient mongoClient;
    private final Controller[] controllers;

    /**
     * Constructs a new Server instance.
     *
     * @param mongoClient the MongoDB client
     * @param controllers the array of controllers to handle routes
     */
    public Server(MongoClient mongoClient, Controller[] controllers) {
        this.mongoClient = mongoClient;
        this.controllers = Arrays.copyOf(controllers, controllers.length);
    }

    /**
     * Configures the MongoDB client with the given server address.
     *
     * @param mongoAddr the MongoDB server address
     * @return configured MongoClient
     */
    public static MongoClient configureDatabase(String mongoAddr) {
        return MongoClients.create(MongoClientSettings
            .builder()
            .applyToClusterSettings(builder ->
                builder.hosts(Arrays.asList(new ServerAddress(mongoAddr))))
            .uuidRepresentation(UuidRepresentation.STANDARD)
            .build());
    }

    /**
     * Starts the Javalin server.
     */
    public void startServer() {
        Javalin javalin = configureJavalin();
        setupRoutes(javalin);
        javalin.start(SERVER_PORT);
    }

    private Javalin configureJavalin() {
        Javalin server = Javalin.create(config ->
            config.bundledPlugins.enableRouteOverview("/api")
        );

        configureShutdowns(server);

        server.exception(Exception.class, (e, ctx) -> {
            throw new InternalServerErrorResponse(e.toString());
        });

        return server;
    }

    private void configureShutdowns(Javalin server) {
        Runtime.getRuntime().addShutdownHook(new Thread(server::stop));
        server.events(event -> {
            event.serverStartFailed(mongoClient::close);
            event.serverStopped(mongoClient::close);
        });
    }

    private void setupRoutes(Javalin server) {
        for (Controller controller : controllers) {
            controller.addRoutes(server);
        }
    }
}
