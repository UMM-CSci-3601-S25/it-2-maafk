// package umm3601.prompt;

// import static org.junit.jupiter.api.Assertions.assertFalse;
// import static org.junit.jupiter.api.Assertions.assertTrue;

// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;

// class PromptSpec {

//   private static final String FAKE_ID_STRING_1 = "fakeIdOne";
//   private static final String FAKE_ID_STRING_2 = "fakeIdTwo";

//   private Prompt prompt1;
//   private Prompt prompt2;

//   @BeforeEach
//   void setupEach() {
//     prompt1 = new Prompt();
//     prompt2 = new Prompt();
//   }

//   @Test
//   void promptsWithEqualIdAreEqual() {
//     prompt1._id = FAKE_ID_STRING_1;
//     prompt2._id = FAKE_ID_STRING_1;

//     assertTrue(prompt1.equals(prompt2));
//   }

//   @Test
//   void promptsWithDifferentIdAreNotEqual() {
//     prompt1._id = FAKE_ID_STRING_1;
//     prompt2._id = FAKE_ID_STRING_2;

//     assertFalse(prompt1.equals(prompt2));
//   }

//   @Test
//   void hashCodesAreBasedOnId() {
//     prompt1._id = FAKE_ID_STRING_1;
//     prompt2._id = FAKE_ID_STRING_1;

//     assertTrue(prompt1.hashCode() == prompt2.hashCode());
//   }

//   @SuppressWarnings("unlikely-arg-type")
//   @Test
//   void promptsAreNotEqualToOtherKindsOfThings() {
//     prompt1._id = FAKE_ID_STRING_1;
//     // a prompt is not equal to its id even though id is used for checking equality
//     assertFalse(prompt1.equals(FAKE_ID_STRING_1));
//   }
// }
