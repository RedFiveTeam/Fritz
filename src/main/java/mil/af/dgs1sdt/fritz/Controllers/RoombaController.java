package mil.af.dgs1sdt.fritz.Controllers;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;

@Controller
@RequestMapping(RoombaController.URI)
public class RoombaController {

  public static final String URI = "/api/roomba";

  @ResponseBody
  @PostMapping
  public void clean(@CookieValue("id") String hash) throws IOException {
    String completedDir = "/tmp/complete/" + hash;
    String workingDir = "/tmp/working/" + hash;
    File completedDirToBeRoombaed = new File(completedDir);
    File workingDirToBeRoombaed = new File(workingDir);

    if (completedDirToBeRoombaed.exists()) {
      FileUtils.deleteDirectory(completedDirToBeRoombaed);
    }

    if (workingDirToBeRoombaed.exists()) {
      FileUtils.deleteDirectory(workingDirToBeRoombaed);
    }
  }
}
