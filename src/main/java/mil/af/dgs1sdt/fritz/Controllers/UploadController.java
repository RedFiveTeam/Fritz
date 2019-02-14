package mil.af.dgs1sdt.fritz.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Controller
@RequestMapping(UploadController.URI)
public class UploadController {
  public static final String URI = "/api/upload";

  @PostMapping(produces = "application/json")
  public @ResponseBody
  String handleFileUpload(@RequestParam("file") MultipartFile file) throws Exception {
    File dir = new File("/tmp/working");
    if (!dir.exists())
      dir.mkdir();
    file.transferTo(new File("/tmp/working/" + file.getOriginalFilename()));
    return "{ \"file\" : \"" + file.getOriginalFilename() + "\" }";
  }
}
