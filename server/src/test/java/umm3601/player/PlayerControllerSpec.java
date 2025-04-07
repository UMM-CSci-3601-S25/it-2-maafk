// package umm3601.player;

// import static org.junit.jupiter.api.Assertions.assertEquals;
// import static org.junit.jupiter.api.Assertions.assertNotNull;
// import static org.junit.jupiter.api.Assertions.assertThrows;
// // import static org.junit.jupiter.api.Assertions.assertThrows;
// // import static org.mockito.ArgumentMatchers.any;
// // import static org.mockito.Mockito.mock;
// import static org.mockito.Mockito.verify;
// import static org.mockito.Mockito.when;

// import java.io.IOException;
// import java.util.Collections;
// import java.util.Map;

// import org.bson.Document;
// import org.bson.types.ObjectId;
// import org.junit.jupiter.api.AfterAll;
// import org.junit.jupiter.api.BeforeAll;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.mockito.ArgumentCaptor;
// import org.mockito.Captor;
// import org.mockito.Mock;
// import org.mockito.MockitoAnnotations;

// import com.mongodb.MongoClientSettings;
// import com.mongodb.ServerAddress;
// import com.mongodb.client.MongoClient;
// import com.mongodb.client.MongoClients;
// import com.mongodb.client.MongoCollection;
// import com.mongodb.client.MongoDatabase;

// // import io.javalin.Javalin;
// import io.javalin.http.Context;
// import io.javalin.http.HttpStatus;
// import io.javalin.validation.BodyValidator;
// // import io.javalin.validation.ValidationException;
// import io.javalin.json.JavalinJackson;

// class PlayerControllerSpec {

//   private PlayerController playerController;

//   private static MongoClient mongoClient;
//   private static MongoDatabase db;

//   private static JavalinJackson javalinJackson = new JavalinJackson();

//   @Mock
//   private Context ctx;

//   @Captor
//   private ArgumentCaptor<Map<String, String>> mapCaptor;

//   @BeforeAll
//   static void setupAll() {
//     String mongoAddr = System.getenv().getOrDefault("MONGO_ADDR", "localhost");

//     mongoClient = MongoClients.create(
//         MongoClientSettings.builder()
//             .applyToClusterSettings(builder -> builder.hosts(Collections.singletonList(new ServerAddress(mongoAddr))))
//             .build());
//     db = mongoClient.getDatabase("test");
//   }

//   @AfterAll
//   static void teardown() {
//     db.drop();
//     mongoClient.close();
//   }

//   @BeforeEach
//   void setupEach() throws IOException {
//     MockitoAnnotations.openMocks(this);

//     MongoCollection<Document> playerDocuments = db.getCollection("players");
//     playerDocuments.drop();

//     playerController = new PlayerController(db);
//   }




//   @Test
//   void getPlayers() {
//     playerController.getPlayers(ctx);
//     verify(ctx).json(Collections.emptyList());
//   }

//   @Test
//   void addNewPlayer() throws IOException {
//     Player newPlayer = new Player();
//     newPlayer.name = "Test Player";

//     String newPlayerJson = javalinJackson.toJsonString(newPlayer, Player.class);

//     when(ctx.bodyValidator(Player.class))
//         .thenReturn(new BodyValidator<>(newPlayerJson, Player.class,
//             () -> javalinJackson.fromJsonString(newPlayerJson, Player.class)));

//     playerController.addNewPlayer(ctx);
//     verify(ctx).json(mapCaptor.capture());

//     verify(ctx).status(HttpStatus.CREATED);

//     Document addedPlayer = db.getCollection("players")
//         .find(new Document("_id", new ObjectId(mapCaptor.getValue().get("id")))).first();

//     assertNotNull(addedPlayer);
//     assertEquals(newPlayer.name, addedPlayer.get("name"));
//   }


//   @Test
//   void addNewPlayerWithEmptyText() throws IOException {
//     Player newPlayer = new Player();
//     newPlayer.name = "";

//     String newPlayerJson = javalinJackson.toJsonString(newPlayer, Player.class);

//     when(ctx.bodyValidator(Player.class))
//         .thenReturn(new BodyValidator<>(newPlayerJson, Player.class,
//             () -> javalinJackson.fromJsonString(newPlayerJson, Player.class)));

//     assertThrows(IllegalArgumentException.class, () -> {
//       try {
//         playerController.addNewPlayer(ctx);
//       } catch (io.javalin.validation.ValidationException e) {
//         throw new IllegalArgumentException(e);
//       }
//     });
//   }


//   @Test
//   void addNewPlayerWithNullText() throws IOException {
//     Player newPlayer = new Player();
//     newPlayer.name = null;

//     String newPlayerJson = javalinJackson.toJsonString(newPlayer, Player.class);

//     when(ctx.bodyValidator(Player.class))
//         .thenReturn(new BodyValidator<>(newPlayerJson, Player.class,
//             () -> javalinJackson.fromJsonString(newPlayerJson, Player.class)));

//     assertThrows(IllegalArgumentException.class, () -> {
//       try {
//         playerController.addNewPlayer(ctx);
//       } catch (io.javalin.validation.ValidationException e) {
//         throw new IllegalArgumentException(e);
//       }
//     });
//   }


//   @Test
//   void addNewPlayerWithNullName() throws IOException {
//     Player newPlayer = new Player();
//     newPlayer.name = null;

//     String newPlayerJson = javalinJackson.toJsonString(newPlayer, Player.class);

//     when(ctx.bodyValidator(Player.class))
//         .thenReturn(new BodyValidator<>(newPlayerJson, Player.class,
//             () -> javalinJackson.fromJsonString(newPlayerJson, Player.class)));

//     assertThrows(IllegalArgumentException.class, () -> {
//       try {
//         playerController.addNewPlayer(ctx);
//       } catch (io.javalin.validation.ValidationException e) {
//         throw new IllegalArgumentException(e);
//       }
//     });
//   }

//   @Test
//   void addNewPlayerWithEmptyName() throws IOException {
//     Player newPlayer = new Player();
//     newPlayer.name = "";

//     String newPlayerJson = javalinJackson.toJsonString(newPlayer, Player.class);

//     when(ctx.bodyValidator(Player.class))
//         .thenReturn(new BodyValidator<>(newPlayerJson, Player.class,
//             () -> javalinJackson.fromJsonString(newPlayerJson, Player.class)));

//     assertThrows(IllegalArgumentException.class, () -> {
//       try {
//         playerController.addNewPlayer(ctx);
//       } catch (io.javalin.validation.ValidationException e) {
//         throw new IllegalArgumentException(e);
//       }
//     });
//   }

//   @Test
//   void addNewPlayerWithEmptyNameAndNullName() throws IOException {
//     Player newPlayer = new Player();
//     newPlayer.name = null;

//     String newPlayerJson = javalinJackson.toJsonString(newPlayer, Player.class);

//     when(ctx.bodyValidator(Player.class))
//         .thenReturn(new BodyValidator<>(newPlayerJson, Player.class,
//             () -> javalinJackson.fromJsonString(newPlayerJson, Player.class)));

//     assertThrows(IllegalArgumentException.class, () -> {
//       try {
//         playerController.addNewPlayer(ctx);
//       } catch (io.javalin.validation.ValidationException e) {
//         throw new IllegalArgumentException(e);
//       }
//     });
//   }


//  }
