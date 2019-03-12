package mil.af.dgs1sdt.fritz.Controllers;

import io.restassured.http.Header;
import mil.af.dgs1sdt.fritz.BaseIntegrationTest;
import mil.af.dgs1sdt.fritz.Models.RenameModel;
import org.junit.Test;


import java.io.File;
import java.util.ArrayList;
import java.util.List;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;


public class RenameControllerTest extends BaseIntegrationTest {

  RenameModel rn1 = new RenameModel("sampl.pptx-0001.png", "14TTTTZMAR19_TEST_ACTY_TEST_TEST1");
  RenameModel rn2 = new RenameModel("sampl.pptx-0000.png", "14TTTTZMAR19_TEST_ACTY_TEST_TEST2");

  List<RenameModel> renameList = new ArrayList<>();

  @Test
  public void renameTest() throws Exception {
    renameList.add(rn1);
    renameList.add(rn2);

    given()
      .port(port)
      .multiPart(new File("./samplepptx.pptx"))
      .when()
      .post(UploadController.URI)
      .then()
      .statusCode(200)
      .body("file", equalTo("samplepptx.pptx"));

    File dir = new File("/tmp/complete/72432c9fb76cf45094c29fc92c4b16f0/");
    dir.mkdir();

    while (new File("/tmp/complete/72432c9fb76cf45094c29fc92c4b16f0/").listFiles().length != 2) {
      Thread.sleep(100);
    }

    given()
      .port(port)
      .header(new Header("Cookie", "id=72432c9fb76cf45094c29fc92c4b16f0"))
      .contentType("application/json")
      .body(renameList)
      .when()
      .post(RenameController.URI)
      .then()
      .statusCode(200);

    assert(new File("/tmp/complete/72432c9fb76cf45094c29fc92c4b16f0/").listFiles()[0].toString().indexOf("14TTTTZMAR19_TEST_ACTY_TEST_TEST") > -1);
  }
}
