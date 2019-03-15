package mil.af.dgs1sdt.fritz.Controllers;

import mil.af.dgs1sdt.fritz.Conversion;
import mil.af.dgs1sdt.fritz.Metrics.MetricRepository;
import mil.af.dgs1sdt.fritz.Models.StatusModel;
import mil.af.dgs1sdt.fritz.Models.TrackingModel;
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
  private Conversion convert = new Conversion();

  public static final String URI = "/api/upload";

  @Autowired
  MetricRepository metricRepository;

  @PostMapping(produces = "application/json")
  public @ResponseBody
  String handleFileUpload(@RequestParam("file") MultipartFile file, HttpServletResponse res) throws Exception {

    byte[] fileBytes = file.getBytes();
    MessageDigest md5 = MessageDigest.getInstance("MD5");
    byte[] digest = md5.digest(fileBytes);
    String hash = new BigInteger(1, digest).toString(16);

    TrackingModel tracking = TrackingStore.getTrackingList().stream()
      .filter(tm -> hash.equals(tm.getHash()))
      .findAny()
      .orElse(new TrackingModel());

    String workingDir = "/tmp/working/" + hash;
    String completedDir = "/tmp/complete/" + hash;
    File workingDirToBeDeleted = new File(workingDir);
    File completedDirToBeDeleted = new File(completedDir);

    if (workingDirToBeDeleted.exists()) {
      FileUtils.deleteDirectory(workingDirToBeDeleted);
    }

    if (completedDirToBeDeleted.exists()) {
      FileUtils.deleteDirectory(completedDirToBeDeleted);
    }

    File dir = new File(workingDir);
    if (!dir.exists())
      dir.mkdirs();
    file.transferTo(new File("/tmp/working/" + hash + "/" + file.getOriginalFilename()));

    if (tracking.getTh() != null && tracking.getTh().isAlive())
      tracking.getTh().interrupt();
    tracking.setTh(new Thread() {
      @Override
      public void run() {
        try {
          convert.convertPPTX(file.getOriginalFilename(), hash);
        } catch (Exception e) {
        }
      }
    });
    tracking.getTh().start();
    tracking.setHash(hash);
    TrackingStore.addToList(tracking);

    res.addCookie(new Cookie("id", hash));
    return "{ \"file\" : \"" + file.getOriginalFilename() + "\", \"hash\" : \"" + hash + "\" }";
  }

  @ResponseBody
  @GetMapping(produces = "application/json", path = "/status")
  public StatusModel status(@CookieValue("id") String id) {

    TrackingModel tracking = TrackingStore.getTrackingList().stream()
      .filter(tm -> id.equals(tm.getHash()))
      .findAny()
      .orElse(null);
    if (tracking != null) {
      if (id.length() > 0 && tracking.getCompletedSlides() == tracking.getTotalSlides()) {
        StatusModel status = new StatusModel();
        List<String> fileNames = new ArrayList<>();
        File[] files = new File("/tmp/complete/" + id + "/").listFiles(new FilenameFilter() {
          @Override
          public boolean accept(File dir, String name) {
            return name.toLowerCase().endsWith(".png");
          }
        });
        if (files != null) {
          Arrays.sort(files);
          for (File file : files) {
            fileNames.add(file.getName());
          }
          status.setFiles(fileNames);
        }
        status.setStatus("complete");
        TrackingStore.removeFromList(tracking);
        return status;
      }
      StatusModel status = new StatusModel();

      status.setFiles(new ArrayList<>());
      status.setProgress(tracking.getCompletedSlides());
      status.setTotal(tracking.getTotalSlides());
      status.setStatus("pending");
      return status;
    }
    return new StatusModel();
  }
}