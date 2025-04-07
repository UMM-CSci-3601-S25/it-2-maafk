// package umm3601.player;

// import java.util.ArrayList;


// import java.util.Map;


// import org.bson.UuidRepresentation;
// import org.mongojack.JacksonMongoCollection;

// import com.mongodb.client.MongoDatabase;


// import io.javalin.Javalin;
// import io.javalin.http.Context;
// import io.javalin.http.HttpStatus;
// import umm3601.Controller;

// public class PlayerController implements Controller {
//   private static final String API_PLAYERS = "/api/players";


//   private final JacksonMongoCollection<Player> playerCollection;

//   public PlayerController(MongoDatabase database) {
//     playerCollection = JacksonMongoCollection.builder().build(
//         database,
//         "players",
//         Player.class,
//         UuidRepresentation.STANDARD);
//   }

//   public void getPlayers(Context ctx) {
//     ArrayList<Player> players = playerCollection.find().into(new ArrayList<>());
//     ctx.json(players);
//   }



//   public void addNewPlayer(Context ctx) {

//     String body = ctx.body();
//     Player newPlayer = ctx.bodyValidator(Player.class)
//       .check(prm -> prm.name != null && prm.name.length() > 0,
//         "players must have a non-empty value; body was " + body)
//       .get();

//       playerCollection.insertOne(newPlayer);

//     ctx.json(Map.of("id", newPlayer._id));
//     ctx.status(HttpStatus.CREATED);
//   }

//   @Override
//   public void addRoutes(Javalin server) {

//     // Get all players
//     server.get(API_PLAYERS, this::getPlayers);

//     // Add new players
//     server.post(API_PLAYERS, this::addNewPlayer);
//   }
// }






// New code 
package umm3601.player;

import java.util.ArrayList;
import java.util.Map;
import org.bson.UuidRepresentation;
import org.mongojack.JacksonMongoCollection;
import com.mongodb.client.MongoDatabase;
import io.javalin.Javalin;
import io.javalin.http.Context;
import io.javalin.http.HttpStatus;
import umm3601.Controller;

public class PlayerController implements Controller {
    private static final String API_PLAYERS = "/api/players";
    private final JacksonMongoCollection<Player> playerCollection;

    public PlayerController(MongoDatabase database) {
        playerCollection = JacksonMongoCollection.builder().build(
            database, "players", Player.class, UuidRepresentation.STANDARD);
    }

    public void getPlayers(Context ctx) {
        ArrayList<Player> players = playerCollection.find().into(new ArrayList<>());
        ctx.json(players);
    }

    public void addNewPlayer(Context ctx) {
        Player newPlayer = ctx.bodyValidator(Player.class)
          .check(p -> p.name != null && !p.name.isEmpty(), "Player must have a name")
          .get();
        playerCollection.insertOne(newPlayer);
        ctx.json(Map.of("id", newPlayer._id));
        ctx.status(HttpStatus.CREATED);
    }

    @Override
    public void addRoutes(Javalin server) {
        server.get(API_PLAYERS, this::getPlayers);
        server.post(API_PLAYERS, this::addNewPlayer);
    }
}

