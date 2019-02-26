package mil.af.dgs1sdt.fritz.Controllers;

import io.restassured.http.Header;
import mil.af.dgs1sdt.fritz.BaseIntegrationTest;
import org.junit.Test;


import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;


public class RenameControllerTest extends BaseIntegrationTest {

  @Test
  public void renameTest() throws Exception {
    given()
      .port(port)
      .header(new Header("Cookie", "id=1234"))
      .when()
      .get(UploadController.URI + "/status")
      .then()
      .statusCode(200)
      .body("status", equalTo("pending"));



    given()
      .port(port)
      .header(new Header("Cookie", "id=1234"))
      .when()
      .get(UploadController.URI + "/status")
      .then()
      .statusCode(200)
      .body("status", equalTo("pending"));
  }
}
