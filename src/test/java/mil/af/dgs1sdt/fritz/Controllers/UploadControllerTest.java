package mil.af.dgs1sdt.fritz.Controllers;

import mil.af.dgs1sdt.fritz.BaseIntegrationTest;
import org.junit.Test;

import java.io.File;

import static org.junit.Assert.*;
import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class UploadControllerTest extends BaseIntegrationTest {

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


}