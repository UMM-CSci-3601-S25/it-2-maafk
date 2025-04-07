package umm3601.prompt;


import org.mongojack.Id;
import org.mongojack.ObjectId;

@SuppressWarnings({"VisibilityModifier"})
public class Prompt {
  @ObjectId @Id
  @SuppressWarnings({"MemberName"})
  public String _id;

  public String text;

  @Override
  public boolean equals(Object obj) {
    if (!(obj instanceof Prompt)) {
      return false;
    }
    Prompt other = (Prompt) obj;
    return _id.equals(other._id);
  }

  @Override
  public int hashCode() {
    return _id.hashCode();
  }

  @Override
  public String toString() {
    return text;
  }
}
