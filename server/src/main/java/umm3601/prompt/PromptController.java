package umm3601.prompt;

import java.util.ArrayList;
import java.util.Map;
import org.bson.UuidRepresentation;
import org.mongojack.JacksonMongoCollection;
import com.mongodb.client.MongoDatabase;
import io.javalin.Javalin;
import io.javalin.http.Context;
import io.javalin.http.HttpStatus;
import umm3601.Controller;

public class PromptController implements Controller {
  private static final String API_PROMPTS = "/api/prompts";
  private static final String API_PROMPT_BY_ID = "/api/prompts/{id}";

  private final JacksonMongoCollection<Prompt> promptCollection;

  public PromptController(MongoDatabase database) {
    promptCollection = JacksonMongoCollection.builder().build(
        database,
        "prompts",
        Prompt.class,
        UuidRepresentation.STANDARD);
  }

  public void getPrompts(Context ctx) {
    ArrayList<Prompt> prompts = promptCollection.find().into(new ArrayList<>());
    ctx.json(prompts);
  }

  public void addNewPrompt(Context ctx) {
    String body = ctx.body();
    Prompt newPrompt = ctx.bodyValidator(Prompt.class)
      .check(prm -> prm.text != null && prm.text.length() > 0,
        "Prompt must have a non-empty value; body was " + body)
      .get();

    promptCollection.insertOne(newPrompt);
    ctx.json(Map.of("id", newPrompt._id));
    ctx.status(HttpStatus.CREATED);
  }

  @Override
  public void addRoutes(Javalin server) {
    server.get(API_PROMPTS, this::getPrompts);
    server.post(API_PROMPTS, this::addNewPrompt);
    server.get(API_PROMPT_BY_ID, this::getPromptById);
  }

  private void getPromptById(Context ctx) {
    String id = ctx.pathParam("id");
    Prompt prompt = promptCollection.findOneById(id);
    if (prompt != null) {
      ctx.json(prompt);
    } else {
      ctx.status(HttpStatus.NOT_FOUND);
    }
  }
}