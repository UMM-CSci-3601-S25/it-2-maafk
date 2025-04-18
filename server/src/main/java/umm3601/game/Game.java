package umm3601.game;

import org.mongojack.Id;
import org.mongojack.ObjectId;

@SuppressWarnings({"VisibilityModifier"})
public class Game {
  @ObjectId @Id
  @SuppressWarnings({"MemberName"})
  public String _id;

  public String joincode;
  public String[] players;
  public String[] prompts;  
  public String[] responses;
  public int currentRound;  

  @Override
  public boolean equals(Object obj) {
    if (!(obj instanceof Game)) {
      return false;
    }
    Game other = (Game) obj;
    return _id.equals(other._id);
  }

  @Override
  public int hashCode() {
    return _id.hashCode();
  }

  @Override
  public String toString() {
    return "A game with joincode: " + joincode + 
           ", " + players.length + " players, " + 
           prompts.length + " prompts, and round " + currentRound;
  }
}