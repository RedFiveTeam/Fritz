package mil.af.dgs1sdt.fritz.Controllers;

import io.restassured.http.Header;
import mil.af.dgs1sdt.fritz.BaseIntegrationTest;
import mil.af.dgs1sdt.fritz.Stores.StatusStore;
import org.junit.Test;

import java.io.File;

import static org.junit.Assert.*;
import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class UploadControllerTest extends BaseIntegrationTest {

  StatusStore store = new StatusStore();

  @Test
  public void uploadFileTest() throws Exception {
    given()
      .port(port)
      .multiPart(new File("./samplepptx.pptx"))
      .when()
      .post(UploadController.URI)
      .then()
      .statusCode(200)
      .body("file", equalTo("samplepptx.pptx"));

    assertEquals(new File("/tmp/working/samplepptx.pptx").exists(), true);
  }

  @Test
  public void getStatusTest() throws Exception {
    given()
      .port(port)
      .header(new Header("Cookie", "id=12345678"))
      .when()
      .get(UploadController.URI + "/status")
      .then()
      .statusCode(200)
      .body("status", equalTo("pending"));


//    store.addToList.add("12345678");
//
//    given()
//      .port(port)
//      .header(new Header("Cookie", "id=12345678"))
//      .when()
//      .get(UploadController.URI + "/status")
//      .then()
//      .statusCode(200)
//      .body("status", equalTo("complete"));
  }

}