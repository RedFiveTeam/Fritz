package mil.af.dgs1sdt.fritz.Controllers;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Arrays;

@Controller
@RequestMapping(ImageController.URI)
public class ImageController {

  public static final String URI = "/api/image";

  @GetMapping(path = "/{imageId}", produces = MediaType.IMAGE_PNG_VALUE)
  public void getImage(@CookieValue("id") String id, @PathVariable int imageId, HttpServletResponse response) throws FileNotFoundException, IOException {
    File[] images = new File("/tmp/complete/" + id + "/").listFiles(new FilenameFilter() {
      @Override
      public boolean accept(File dir, String name) {
        return name.toLowerCase().endsWith(".png");
      }
    });

    Arrays.sort(images);

    File img = images[imageId];
    InputStream is = new FileInputStream(img);
    response.setContentType(MediaType.IMAGE_PNG_VALUE);
    StreamUtils.copy(is, response.getOutputStream());
  }
}
