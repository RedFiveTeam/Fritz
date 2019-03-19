package mil.af.dgs1sdt.fritz.Controllers;

import mil.af.dgs1sdt.fritz.Models.RenameModel;
import org.apache.commons.compress.utils.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Controller
@CrossOrigin(exposedHeaders = "Content-Length")
@RequestMapping(RenameController.URI)
public class RenameController {

  public static final String URI = "/api/rename";

  @PostMapping(produces="application/zip")
  public void renameAndZip(@CookieValue("id") String id, @RequestBody List<RenameModel> json, HttpServletResponse res) throws IOException {

    List<File> files = new ArrayList<>();

    for (RenameModel model : json) {
      if (model.getDeleted())
        continue;
      File originalFile;
      if (model.getOldName().endsWith(".png"))
        originalFile = new File("/tmp/complete/" + id + "/" + model.getOldName());
      else
        originalFile = new File("/tmp/complete/" + id + "/" + model.getOldName() + ".png");
      File newFile = new File("/tmp/complete/" + id + "/" + model.getNewName() + ".png");
      boolean status = originalFile.renameTo(newFile);
      if (status) {
        files.add(newFile);
      }
    }

    res.setStatus(HttpServletResponse.SC_OK);

    ZipOutputStream zos = new ZipOutputStream(res.getOutputStream());

    try {
      for (File file : files) {
        zos.putNextEntry(new ZipEntry(file.getName()));
        FileInputStream fis = new FileInputStream(file);

        IOUtils.copy(fis, zos);

        fis.close();
        zos.closeEntry();
      }
    } finally {
      zos.close();
    }



  }
}
