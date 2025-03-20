package umm3601.response;



import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ResponseSpec {

  private static final String FAKE_ID_STRING_1 = "fakeIdOne";
  private static final String FAKE_ID_STRING_2 = "fakeIdTwo";

  private Response response1;
  private Response response2;

  @BeforeEach
  void setupEach() {
    response1 = new Response();
    response2 = new Response();
  }

  @Test
  void responsesWithEqualIdAreEqual() {
    response1._id = FAKE_ID_STRING_1;
    response2._id = FAKE_ID_STRING_1;

    assertTrue(response1.equals(response2));
  }

  @Test
  void responsesWithDifferentIdAreNotEqual() {
    response1._id = FAKE_ID_STRING_1;
    response2._id = FAKE_ID_STRING_2;

    assertFalse(response1.equals(response2));
  }

  @Test
  void hashCodesAreBasedOnId() {
    response1._id = FAKE_ID_STRING_1;
    response2._id = FAKE_ID_STRING_1;

    assertTrue(response1.hashCode() == response2.hashCode());
  }

  @SuppressWarnings("unlikely-arg-type")
  @Test
  void responsesAreNotEqualToOtherKindsOfThings() {
    response1._id = FAKE_ID_STRING_1;
    // a response is not equal to its id even though id is used for checking equality
    assertFalse(response1.equals(FAKE_ID_STRING_1));
  }
}
