package umm3601.response;

import static com.mongodb.client.model.Filters.eq;


import java.util.ArrayList;
import java.util.Map;
import org.bson.UuidRepresentation;
import org.bson.types.ObjectId;
import org.mongojack.JacksonMongoCollection;

import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.DeleteResult;

import io.javalin.Javalin;
import io.javalin.http.Context;
import io.javalin.http.HttpStatus;
import io.javalin.http.NotFoundResponse;
import umm3601.Controller;

public class ResponseController implements Controller {
  private static final String API_RESPONSE = "/api/responses";


  private final JacksonMongoCollection<Response> responseCollection;

  public ResponseController(MongoDatabase database) {
    responseCollection = JacksonMongoCollection.builder().build(
        database,
        "responses",
        Response.class,
        UuidRepresentation.STANDARD);
  }

  public void getResponse(Context ctx) {
    ArrayList<Response> responses = responseCollection.find().into(new ArrayList<>());
    ctx.json(responses);
  }

  public void getResponseById(Context ctx) {
    String id = ctx.pathParam("id");
    Response response;
    try {
      response = responseCollection.find(eq("_id", new ObjectId(id))).first();
    } catch (IllegalArgumentException e) {
      throw new NotFoundResponse("The requested response was not found");
    }
    if (response == null) {
      throw new NotFoundResponse("The requested response was not found");
    } else {
      ctx.json(response);
    }
  }

  public void addNewResponse(Context ctx) {

    String body = ctx.body();
    Response newResponse = ctx.bodyValidator(Response.class)
      .check(prm -> prm.text != null && prm.text.length() > 0,
        "Response must have a non-empty value; body was " + body)
      .get();

      responseCollection.insertOne(newResponse);
    ctx.json(Map.of("id", newResponse._id));
    ctx.status(HttpStatus.CREATED);
  }


  public void deleteResponse(Context ctx) {
    String id = ctx.pathParam("id");
    DeleteResult deleteResult = responseCollection.deleteOne(eq("_id", new ObjectId(id)));
    if (deleteResult.getDeletedCount() != 1) {
      ctx.status(HttpStatus.NOT_FOUND);
      throw new NotFoundResponse(
        "Was unable to delete ID "
          + id
          + "; perhaps illegal ID or an ID for an item not in the system?");
    }
    ctx.status(HttpStatus.OK);
  }



  @Override
  public void addRoutes(Javalin server) {

    server.get(API_RESPONSE, this::getResponse);

    server.post(API_RESPONSE, this::addNewResponse);

    server.delete(API_RESPONSE, this::deleteResponse);
  }
}
