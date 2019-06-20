package mil.af.dgs1sdt.fritz.Controllers;

import mil.af.dgs1sdt.fritz.Interfaces.UnicornInterface;
import mil.af.dgs1sdt.fritz.Metrics.Statistic;
import mil.af.dgs1sdt.fritz.Metrics.StatisticRepository;
import mil.af.dgs1sdt.fritz.Models.*;
import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Controller
@RequestMapping(UnicornController.URI)
public class UnicornController {

  @Value("${UNICORN_URL}")
  private String unicornBaseURL;

  @Value("${PERSONNEL_ID}")
  private String personnelId;

  @Value("${CLASSIFICATION_ID}")
  private String classificationId;

  @Autowired
  StatisticRepository statisticRepository;

  public static final String URI = "/api/unicorn";

  @ResponseBody
  @GetMapping(path = "/status")
  public int status() throws Exception {
    UnicornInterface unicorn = new UnicornInterface();
    return unicorn.checkUnicornStatus();
  }

  @ResponseBody
  @GetMapping(produces = "application/json", path = "/missions")
  public List<MissionModel> missions() throws Exception {
    UnicornInterface unicorn = new UnicornInterface();
    return unicorn.getMissions();
  }

  @ResponseBody
  @GetMapping(produces = "application/json", path = "/targets/{missionId}")
  public List<CalloutModel> targets(@PathVariable String missionId) throws Exception {
    UnicornInterface unicorn = new UnicornInterface();
    List<CalloutModel> callouts = new ArrayList<>();
    callouts = unicorn.getCallouts(missionId);
    Collections.sort(callouts);
    return callouts;
  }

  @ResponseBody
  @GetMapping(produces = "application/json", path = "/releasabilities")
  public List<ReleasabilityModel> releasabilities() throws Exception {
    UnicornInterface unicorn = new UnicornInterface();
    List<ReleasabilityModel> releasabilities = unicorn.getReleasabilities();
    List<Statistic> statistics = statisticRepository.findAll();

    for (ReleasabilityModel r: releasabilities) {
      for (Statistic s: statistics) {
        if (r.getReleasabilityId().equals(s.getUid())) {
          r.setTimesClicked(s.getTimesUsed());
          break;
        }
      }
    }
    return releasabilities;
  }

  @PostMapping(produces = "application/json")
  public @ResponseBody
  UnicornUploadStatusModel upload(@CookieValue("id") String id, @RequestBody UnicornUploadModel json) throws Exception {
    File convFile = new File("/tmp/complete/" + id + "/" + json.getFileName() + (
      json.getFileName().contains("jpg") ? "" : ".jpg"));
    String image = UnicornInterface.convertFileToBase64(convFile);
    UnicornInterface unicorn = new UnicornInterface();
    List<NameValuePair> params = new ArrayList<org.apache.http.NameValuePair>();
    params.add(new BasicNameValuePair("productName", json.getProductName() + ".jpg"));
    params.add(new BasicNameValuePair("missionId", json.getMissionId()));
    params.add(new BasicNameValuePair("targetEventId", json.getTargetEventId()));
    params.add(new BasicNameValuePair("classificationId", classificationId));
    params.add(new BasicNameValuePair("releasabilityId", json.getReleasabilityId()));
    params.add(new BasicNameValuePair("personnelId", personnelId));
    params.add(new BasicNameValuePair("isrRoleId", ""));
    params.add(new BasicNameValuePair("endFilePath", "Mission\\" + json.getMissionId() + "\\"));
    params.add(new BasicNameValuePair("uploadType", "targetevent"));
    params.add(new BasicNameValuePair("uploadedFile", image));
    String URL = unicornBaseURL + "/WebServices/PowerPointUploadServices.asmx/UploadFile";
    return unicorn.makePostRequest(URL, params);
  }
}
