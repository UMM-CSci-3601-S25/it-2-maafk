package umm3601.game;

import org.mongojack.Id;
import org.mongojack.ObjectId;

@SuppressWarnings({"VisibilityModifier"})
public class Round {

  @ObjectId @Id
  @SuppressWarnings({"MemberName"})
  public String _id;

  public String[] players;
  public String judge;
  public String prompt;

  @Override
  public boolean equals(Object obj) {
    if (!(obj instanceof Round)) {
      return false;
    }
    Round other = (Round) obj;
    return _id.equals(other._id);
  }

  @Override
  public int hashCode() {
    return _id.hashCode();
  }

  @Override
  public String toString() {
    return "A round with judge: " + judge + ", and " + players.toString();
  }
}