package umm3601.game;

import java.util.Map;

import org.bson.UuidRepresentation;
import org.mongojack.JacksonMongoCollection;

import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Updates;

import io.javalin.Javalin;
import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.HttpStatus;
import io.javalin.http.NotFoundResponse;
import umm3601.Controller;

public class GameController implements Controller {

  private static final String API_GAMES = "/api/games";
  private static final String API_GAME_BY_ID = "/api/games/{id}";
  private static final String API_ADD_PLAYER = "/api/games/{id}/{player}";
  static final String JOINCODE_KEY = "joincode";

  private final JacksonMongoCollection<Game> gameCollection;


  public GameController(MongoDatabase database) {
    gameCollection = JacksonMongoCollection.builder().build(
        database,
        "games",
        Game.class,
        UuidRepresentation.STANDARD);
  }


  public void getGame(Context ctx) {
    String id = ctx.pathParam("id");
    Game game;

    try {
      game = gameCollection.findOneById(id);

    } catch (IllegalArgumentException e) {
      throw new BadRequestResponse("The requested game id wasn't a legal Mongo Object ID.");
    }
    if (game == null) {
      throw new NotFoundResponse("The requested game was not found");
    } else {
      ctx.json(game);
      ctx.status(HttpStatus.OK);
    }
  }


  public void addNewGame(Context ctx) {
  
    String body = ctx.body();
    Game newGame = ctx.bodyValidator(Game.class)
    .check(usr -> usr.joincode != null && usr.joincode.length() > 0,
        "Game must have a non-empty join code; body was " + body)
      .get();

    // newGame.currentRound = 0;
    gameCollection.insertOne(newGame);
    ctx.json(Map.of("id", newGame._id));
    ctx.status(HttpStatus.CREATED);
  }


  public void addPlayerToGame(Context ctx) {
    String id = ctx.pathParam("id");
    String newPlayer = ctx.pathParam("player");
    Game gameToUpdate;
    try {
      gameToUpdate = gameCollection.findOneById(id);
    } catch (IllegalArgumentException e) {
      throw new BadRequestResponse("The requested game id wasn't a legal Mongo Object ID.");
    }
    if (gameToUpdate == null) {
      throw new NotFoundResponse("The requested game was not found");
    } else {

      if (gameToUpdate.players == null) {
        gameCollection.updateById(id, Updates.set("players", new String[]{newPlayer}));
      } else {
        gameCollection.updateById(id, Updates.addToSet("players", newPlayer));
      }
      gameToUpdate = gameCollection.findOneById(id);
      ctx.json(gameToUpdate);
      ctx.status(HttpStatus.OK);
    }
  }

  @Override
  public void addRoutes(Javalin server) {
    server.get(API_GAME_BY_ID, this::getGame);

    server.post(API_GAMES, this::addNewGame);

    server.put(API_ADD_PLAYER, this::addPlayerToGame);
  }
}