// package umm3601.prompt;

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

// class PromptControllerSpec {

//   private PromptController promptController;

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

//     MongoCollection<Document> promptDocuments = db.getCollection("prompts");
//     promptDocuments.drop();

//     promptController = new PromptController(db);
//   }

//   @Test
//   void getPrompts() {
//     promptController.getPrompts(ctx);
//     verify(ctx).json(Collections.emptyList());
//   }

//   @Test
//   void addNewPrompt() throws IOException {
//     Prompt newPrompt = new Prompt();
//     newPrompt.text = "Test Prompt";

//     String newPromptJson = javalinJackson.toJsonString(newPrompt, Prompt.class);

//     when(ctx.bodyValidator(Prompt.class))
//         .thenReturn(new BodyValidator<>(newPromptJson, Prompt.class,
//             () -> javalinJackson.fromJsonString(newPromptJson, Prompt.class)));

//     promptController.addNewPrompt(ctx);
//     verify(ctx).json(mapCaptor.capture());

//     verify(ctx).status(HttpStatus.CREATED);

//     Document addedPrompt = db.getCollection("prompts")
//         .find(new Document("_id", new ObjectId(mapCaptor.getValue().get("id")))).first();

//     assertNotNull(addedPrompt);
//     assertEquals(newPrompt.text, addedPrompt.get("text"));
//   }


//   @Test
//   void addNewPromptWithEmptyText() throws IOException {
//     Prompt newPrompt = new Prompt();
//     newPrompt.text = "";

//     String newPromptJson = javalinJackson.toJsonString(newPrompt, Prompt.class);

//     when(ctx.bodyValidator(Prompt.class))
//         .thenReturn(new BodyValidator<>(newPromptJson, Prompt.class,
//             () -> javalinJackson.fromJsonString(newPromptJson, Prompt.class)));

//     assertThrows(IllegalArgumentException.class, () -> {
//       try {
//         promptController.addNewPrompt(ctx);
//       } catch (io.javalin.validation.ValidationException e) {
//         throw new IllegalArgumentException(e);
//       }
//     });
//   }

//   @Test
//   void addNewPromptWithNullText() throws IOException {
//     Prompt newPrompt = new Prompt();
//     newPrompt.text = null;

//     String newPromptJson = javalinJackson.toJsonString(newPrompt, Prompt.class);

//     when(ctx.bodyValidator(Prompt.class))
//         .thenReturn(new BodyValidator<>(newPromptJson, Prompt.class,
//             () -> javalinJackson.fromJsonString(newPromptJson, Prompt.class)));

//     assertThrows(IllegalArgumentException.class, () -> {
//       try {
//         promptController.addNewPrompt(ctx);
//       } catch (io.javalin.validation.ValidationException e) {
//         throw new IllegalArgumentException(e);
//       }
//     });
//   }

//  }
