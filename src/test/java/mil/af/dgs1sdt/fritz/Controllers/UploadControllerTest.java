package mil.af.dgs1sdt.fritz.Controllers;

import io.restassured.http.Header;
import mil.af.dgs1sdt.fritz.BaseIntegrationTest;
import mil.af.dgs1sdt.fritz.Models.TrackingModel;
import mil.af.dgs1sdt.fritz.Stores.StatusStore;
import mil.af.dgs1sdt.fritz.Stores.TrackingStore;
import org.junit.Test;

import java.io.File;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class UploadControllerTest extends BaseIntegrationTest {

  StatusStore store;
  TrackingStore trackingStore;
  TrackingModel tm = new TrackingModel();

  @Test
  public void getStatusTest() throws Exception {
    tm.setHash("1234");
    tm.setStatus("pending");
    trackingStore.addToList(tm);

    given()
      .port(port)
      .header(new Header("Cookie", "id=1234"))
      .when()
      .get(UploadController.URI + "/status")
      .then()
      .statusCode(200)
      .body("status", equalTo("pending"));


    TrackingModel tracking = TrackingStore.getTrackingList().stream()
      .filter(tm -> "1234".equals(tm.getHash()))
      .findAny()
      .orElse(new TrackingModel());

    tracking.setCompletedSlides(10);
    tracking.setStatus("complete");

    given()
      .port(port)
      .header(new Header("Cookie", "id=1234"))
      .when()
      .get(UploadController.URI + "/status")
      .then()
      .statusCode(200)
      .body("status", equalTo("complete"));
  }

  @Test
  public void uploadFileTest() throws Exception {
    given()
      .port(port)
      .multiPart("file[]", new File("./samplepptx.jpg"))
      .when()
      .post(UploadController.URI)
      .then()
      .statusCode(200)
      .body("file", equalTo("samplepptx.jpg"));
  }
}