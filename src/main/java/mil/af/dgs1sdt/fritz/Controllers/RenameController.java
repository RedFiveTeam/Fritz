package mil.af.dgs1sdt.fritz.Controllers;

import mil.af.dgs1sdt.fritz.Models.RenameModel;
import org.apache.commons.compress.utils.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Controller
@RequestMapping(RenameController.URI)
public class RenameController {

  public static final String URI = "/api/rename";

  @PostMapping(produces="application/zip")
  public void renameAndZip(@CookieValue("id") String id, @RequestBody List<RenameModel> json, HttpServletResponse res) throws IOException {

    for (RenameModel model : json) {
      File originalFile;
      if (model.getOldName().endsWith(".png"))
        originalFile = new File("/tmp/complete/" + id + "/" + model.getOldName());
      else
        originalFile = new File("/tmp/complete/" + id + "/" + model.getOldName() + ".png");
      File newFile = new File("/tmp/complete/" + id + "/" + model.getNewName() + ".png");
      boolean status = originalFile.renameTo(newFile);
      if (!status) {
        System.out.println("error renaming " + model.getOldName());
      }
    }

    res.setStatus(HttpServletResponse.SC_OK);

    ZipOutputStream zos = new ZipOutputStream(res.getOutputStream());

    File[] files = new File("/tmp/complete/" + id + "/").listFiles(new FilenameFilter() {
      @Override
      public boolean accept(File dir, String name) {
        return name.toLowerCase().endsWith(".png");
      }
    });

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
