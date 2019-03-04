package mil.af.dgs1sdt.fritz.Controllers;

import mil.af.dgs1sdt.fritz.Conversion;
import mil.af.dgs1sdt.fritz.Metrics.Metric;
import mil.af.dgs1sdt.fritz.Metrics.MetricRepository;
import mil.af.dgs1sdt.fritz.Models.StatusModel;
import mil.af.dgs1sdt.fritz.Stores.StatusStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FilenameFilter;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping(UploadController.URI)
public class UploadController {

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

    Thread th = new Thread() {
      @Override
      public void run() {
        try {
          Conversion convert = new Conversion();
          convert.convertPPTX(file.getOriginalFilename(), hash);
        } catch (Exception e) {
        }
      }
    };
    th.start();

    res.addCookie(new Cookie("id", hash));
    return "{ \"file\" : \"" + file.getOriginalFilename() + "\", \"hash\" : \"" + hash + "\" }";
  }

  @ResponseBody
  @GetMapping(produces = "application/json", path = "/status")
  public StatusModel status(@CookieValue("id") String id) {
    if (id.length() > 0 && StatusStore.getList().contains(id)) {
      StatusModel status = new StatusModel();
      List<String> fileNames = new ArrayList<>();
      File[] files = new File("/tmp/complete/" + id + "/").listFiles(new FilenameFilter() {
        @Override
        public boolean accept(File dir, String name) {
          return name.toLowerCase().endsWith(".png");
        }
      });
      if (files != null) {
        for (File file : files) {
          fileNames.add(file.getName());
        }
        status.setFiles(fileNames);
      }
      status.setStatus("complete");
      return status;
    }
    StatusModel status = new StatusModel();
    status.setFiles(new ArrayList<>());
    status.setStatus("pending");
    return status;
  }
}
