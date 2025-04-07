// package umm3601.player;

// import org.mongojack.Id;
// import org.mongojack.ObjectId;



// @SuppressWarnings({"VisibilityModifier"})
// public class Player {

//   @ObjectId @Id
//   @SuppressWarnings({"MemberName"})
//   public String _id;

//   public String name;

//   @Override
//   public boolean equals(Object obj) {
//     if (!(obj instanceof Player)) {
//       return false;
//     }
//     Player other = (Player) obj;
//     return _id.equals(other._id);
//   }

//   @Override
//   public int hashCode() {
//     return _id.hashCode();
//   }

//   @Override
//   public String toString() {
//     return name;
//   }

// }
