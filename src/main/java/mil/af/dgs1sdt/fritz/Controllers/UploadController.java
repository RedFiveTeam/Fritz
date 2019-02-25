package mil.af.dgs1sdt.fritz.Controllers;

import mil.af.dgs1sdt.fritz.Conversion;
import mil.af.dgs1sdt.fritz.Models.StatusModel;
import mil.af.dgs1sdt.fritz.Stores.StatusStore;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.IOUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.nio.file.attribute.PosixFilePermission;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;

@Controller
@RequestMapping(UploadController.URI)
public class UploadController {

  public static final String URI = "/api/upload";

  @PostMapping(produces = "application/json")
  public @ResponseBody
  String handleFileUpload(@RequestParam("file") MultipartFile file, HttpServletResponse res) throws Exception {

    byte[] fileBytes = file.getBytes();
    MessageDigest md5 = MessageDigest.getInstance("MD5");
    byte[] digest = md5.digest(fileBytes);
    String hash = new BigInteger(1, digest).toString(16);

    String workingDir = "/tmp/working/" + hash;
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
    return "{ \"file\" : \"" + file.getOriginalFilename() + "\" }";
  }

  @ResponseBody
  @GetMapping(produces = "application/json", path="/status")
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
