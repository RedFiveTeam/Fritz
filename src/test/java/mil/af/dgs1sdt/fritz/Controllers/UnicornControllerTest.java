package mil.af.dgs1sdt.fritz.Controllers;

import mil.af.dgs1sdt.fritz.BaseIntegrationTest;
import org.junit.Test;

import static io.restassured.RestAssured.given;

public class UnicornControllerTest extends BaseIntegrationTest {

  @Test
  public void getMissionsTest() {

    given()
      .port(port)
      .when()
      .get(UnicornController.URI + "/missions")
      .then()
      .statusCode(200);
  }
}
