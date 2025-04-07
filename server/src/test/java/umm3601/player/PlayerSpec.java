// package umm3601.player;

// import static org.junit.jupiter.api.Assertions.assertFalse;
// import static org.junit.jupiter.api.Assertions.assertTrue;

// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;

// class PlayerSpec {

//   private static final String FAKE_ID_STRING_1 = "fakeIdOne";
//   private static final String FAKE_ID_STRING_2 = "fakeIdTwo";

//   private Player player1;
//   private Player player2;

//   @BeforeEach
//   void setupEach() {
//     player1 = new Player();
//     player2 = new Player();
//   }

//   @Test
//   void playersWithEqualIdAreEqual() {
//     player1._id = FAKE_ID_STRING_1;
//     player2._id = FAKE_ID_STRING_1;

//     assertTrue(player1.equals(player2));
//   }

//   @Test
//   void playersWithDifferentIdAreNotEqual() {
//     player1._id = FAKE_ID_STRING_1;
//     player2._id = FAKE_ID_STRING_2;

//     assertFalse(player1.equals(player2));
//   }

//   @Test
//   void hashCodesAreBasedOnId() {
//     player1._id = FAKE_ID_STRING_1;
//     player2._id = FAKE_ID_STRING_1;

//     assertTrue(player1.hashCode() == player2.hashCode());
//   }

//   @SuppressWarnings("unlikely-arg-type")
//   @Test
//   void playersAreNotEqualToOtherKindsOfThings() {
//     player1._id = FAKE_ID_STRING_1;
//     // a player is not equal to its id even though id is used for checking equality
//     assertFalse(player1.equals(FAKE_ID_STRING_1));
//   }
// }
