package mil.af.dgs1sdt.fritz.Controllers;

import mil.af.dgs1sdt.fritz.Metrics.MetricRepository;
import mil.af.dgs1sdt.fritz.Models.StatusModel;
import mil.af.dgs1sdt.fritz.Models.TrackingModel;
import mil.af.dgs1sdt.fritz.Statistics.StatisticRepository;
import mil.af.dgs1sdt.fritz.Stores.TrackingStore;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FilenameFilter;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Controller
@RequestMapping(UploadController.URI)
public class UploadController {

  public static final String URI = "/api/upload";

  @Autowired
  MetricRepository metricRepository;

  @Autowired
  StatisticRepository statisticRepository;

  @PostMapping(produces = "application/json")
  public @ResponseBody
  String handleFileUpload(@RequestParam("file[]") MultipartFile[] file, HttpServletResponse res) throws Exception {

    byte[] fileBytes = file[0].getBytes();
    MessageDigest md5 = MessageDigest.getInstance("MD5");
    byte[] digest = md5.digest(fileBytes);
    String hash = new BigInteger(1, digest).toString(16);

    TrackingModel tracking = TrackingStore.getTrackingList().stream()
      .filter(tm -> hash.equals(tm.getHash()))
      .findAny()
      .orElse(new TrackingModel());

    tracking.setStatus("pending");
    tracking.setHash(hash);

    String workingDir = "/tmp/working/" + hash;
    File workingDirToBeDeleted = new File(workingDir);

    if (workingDirToBeDeleted.exists()) {
      FileUtils.deleteDirectory(workingDirToBeDeleted);
    }


    for (MultipartFile image : file) {
      File dir = new File(workingDir);
      if (!dir.exists())
        dir.mkdirs();
      image.transferTo(new File("/tmp/working/" + hash + "/" + image.getOriginalFilename()));

      res.addCookie(new Cookie("id", hash));
    }
    tracking.setStatus("complete");
    TrackingStore.getTrackingList().add(tracking);
    return "{ \"file\" : \"" + file[0].getOriginalFilename() + "\", \"hash\" : \"" + hash + "\" }";
  }

  @ResponseBody
  @GetMapping(produces = "application/json", path = "/status")
  public StatusModel status(@CookieValue("id") String id) {

    TrackingModel tracking = TrackingStore.getTrackingList().stream()
      .filter(tm -> id.equals(tm.getHash()))
      .findAny()
      .orElse(null);

    StatusModel status = new StatusModel();
    List<String> fileNames = new ArrayList<>();
    File[] files = new File("/tmp/working/" + id + "/").listFiles(new FilenameFilter() {
      @Override
      public boolean accept(File dir, String name) {
        return name.toLowerCase().endsWith(".jpg");
      }
    });
    if (files != null) {
      Arrays.sort(files);
      for (File file : files) {
        fileNames.add(file.getName());
      }
    }
    status.setFiles(fileNames);
    if (tracking != null) {
      status.setStatus(tracking.getStatus());
    }
    return status;
  }
}
