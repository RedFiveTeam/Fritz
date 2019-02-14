package mil.af.dgs1sdt.fritz.Controllers;

import mil.af.dgs1sdt.fritz.Stores.StatusStore;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigInteger;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.nio.file.attribute.PosixFilePermission;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashSet;
import java.util.Set;

@Controller
@RequestMapping(UploadController.URI)
public class UploadController {
  StatusStore store = new StatusStore();

  public static final String URI = "/api/upload";

  @PostMapping(produces = "application/json")
  public @ResponseBody
  String handleFileUpload(@RequestParam("file") MultipartFile file, HttpServletResponse res) throws NoSuchAlgorithmException, IOException {

    byte[] fileBytes = file.getBytes();
    MessageDigest md5 = MessageDigest.getInstance("MD5");
    byte[] digest = md5.digest(fileBytes);
    String hash = new BigInteger(1, digest).toString(16);

    String workingDir = "/tmp/working";
    File dir = new File(workingDir);
    if (!dir.exists())
      dir.mkdir();

    file.transferTo(new File("/tmp/working/" + file.getOriginalFilename()));

    res.addCookie(new Cookie("id", hash));
    return "{ \"file\" : \"" + file.getOriginalFilename() + "\" }";
  }

  @ResponseBody
  @GetMapping(produces = "application/json", path="/status")
  public String status(@CookieValue("id") String id) {
    if (id.length() > 0 && store.getList().contains(id)) {
      return "{ \"status\" : \"complete\" }";
    }
    return "{ \"status\" : \"pending\" }";
  }

  @ResponseBody
  @GetMapping(path = "/test")
  public String[] test() throws IOException {
    String os = System.getProperty("os.name").toLowerCase();

    if (os.contains("mac")) {
      Runtime.getRuntime().exec(String.format("/Applications/LibreOffice.app/Contents/MacOS/soffice --invisible --convert-to pdf /tmp/working/samplepptx.pptx --outdir /tmp"));
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
      Files.setPosixFilePermissions(libre.toPath(), perms);

      Runtime.getRuntime().exec(String.format("/tmp/libreoffice.AppImage --invisible --convert-to pdf /tmp/samplepptx.pptx --outdir /tmp"));
    }
    String tmpDir = "/tmp";
    File file = new File(tmpDir);
    return file.list();
  }
}
