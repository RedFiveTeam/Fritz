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

    Conversion convert = new Conversion();
    convert.convertPPTX(file.getOriginalFilename(), hash);
    // Conversion.convertToPDF(file.getOriginalFilename(), hash);

    res.addCookie(new Cookie("id", hash));
    return "{ \"file\" : \"" + file.getOriginalFilename() + "\" }";
  }

  @ResponseBody
  @GetMapping(produces = "application/json", path="/status")
  public StatusModel status(@CookieValue("id") String id) {
    if (id.length() > 0 && StatusStore.getList().contains(id)) {
      StatusModel status = new StatusModel();
      status.files = Arrays.asList(new File("/tmp/complete/" + id + "/").listFiles());
      status.status = "complete";
      return status;
    }
    StatusModel status = new StatusModel();
    status.files = new ArrayList<>();
    status.status = "pending";
    return status;
  }

  /*
  @ResponseBody
  @GetMapping(path = "/test")
  public List test() throws Exception {
    String os = System.getProperty("os.name").toLowerCase();
    List<String> list = new ArrayList<>();

    if (os.contains("mac")) {
      File logFile = new File("/tmp/libreoffice.log");
      ProcessBuilder builder = new ProcessBuilder("/Applications/LibreOffice.app/Contents/MacOS/soffice", "--invisible", "--convert-to", "pdf", "/tmp/working/samplepptx.pptx", "--outdir", "/tmp");
      builder.redirectOutput(ProcessBuilder.Redirect.appendTo(logFile));
      builder.redirectError(ProcessBuilder.Redirect.appendTo(logFile));
      builder.start();

    } else {

      InputStream is = getClass().getClassLoader().getResourceAsStream("libreoffice.AppImage");
      String librePath = "/tmp/libreoffice.AppImage";
      if (is != null) {
        Path path = new File(librePath).toPath();
        Files.copy(is, path, StandardCopyOption.REPLACE_EXISTING);
      }

      InputStream ppt = getClass().getClassLoader().getResourceAsStream("samplepptx.pptx");
      if (ppt != null) {
        String pptPath = "/tmp/samplepptx.pptx";
        Path path = new File(pptPath).toPath();
        Files.copy(is, path, StandardCopyOption.REPLACE_EXISTING);
      }

      File libre = new File(librePath);
      Set<PosixFilePermission> perms = new HashSet<>();
      perms.add(PosixFilePermission.OWNER_EXECUTE);
      perms.add(PosixFilePermission.GROUP_EXECUTE);
      perms.add(PosixFilePermission.OTHERS_EXECUTE);
      perms.add(PosixFilePermission.OWNER_READ);
      perms.add(PosixFilePermission.GROUP_READ);
      perms.add(PosixFilePermission.OTHERS_READ);
      perms.add(PosixFilePermission.OWNER_WRITE);
      perms.add(PosixFilePermission.GROUP_WRITE);
      perms.add(PosixFilePermission.OTHERS_WRITE);
      Files.setPosixFilePermissions(libre.toPath(), perms);

      File logFile = new File("/tmp/libreoffice.log");
//      ProcessBuilder builder = new ProcessBuilder("/tmp/libreoffice.AppImage", "--invisible", "--convert-to", "pdf", "/tmp/samplepptx.pptx", "--outdir", "/tmp");
      ProcessBuilder builder = new ProcessBuilder("/tmp/libreoffice.AppImage", "--appimage-extract");
      builder.redirectOutput(ProcessBuilder.Redirect.appendTo(logFile));
      builder.redirectError(ProcessBuilder.Redirect.appendTo(logFile));
      builder.start();
      Thread.sleep(5000);
      ProcessBuilder builder2 = new ProcessBuilder("/home/vcap/app/squashfs-root/AppRun", "--invisible", "--headless", "--convert-to", "pdf", "/tmp/samplepptx.pptx", "--outdir", "/tmp");
      builder2.redirectOutput(ProcessBuilder.Redirect.appendTo(logFile));
      builder2.redirectError(ProcessBuilder.Redirect.appendTo(logFile));
      builder2.start();
    }
    String tmpDir = "/tmp";
    File file = new File(tmpDir);

    list.add(new String(Files.readAllBytes(Paths.get("/tmp/libreoffice.log")), StandardCharsets.UTF_8));

    for (String mystuff : file.list()) {
      list.add(mystuff);
    }

    return list;
  }
  */
}
