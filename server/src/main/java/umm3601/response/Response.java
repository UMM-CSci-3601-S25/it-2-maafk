package umm3601.response;

import org.mongojack.Id;
import org.mongojack.ObjectId;



@SuppressWarnings({"VisibilityModifier"})
public class Response {

  @ObjectId @Id
  @SuppressWarnings({"MemberName"})


  public String _id;

  public String player;

  public String text;


  @Override
  public boolean equals(Object obj) {
    if (!(obj instanceof Response)) {
      return false;
    }
    Response other = (Response) obj;
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