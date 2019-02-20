package mil.af.dgs1sdt.fritz;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.nio.file.attribute.PosixFilePermission;
import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class FritzApplication {
	public static void main(String[] args) {
		SpringApplication.run(FritzApplication.class, args);
	}

  @EventListener(ApplicationReadyEvent.class)
  public void setupLibreOffice() throws Exception {
    String os = System.getProperty("os.name").toLowerCase();
    if (!os.contains("mac")) {
      InputStream is = getClass().getClassLoader().getResourceAsStream("libreoffice.AppImage");
      String librePath = "/tmp/libreoffice.AppImage";
      if (is != null) {
        Path path = new File(librePath).toPath();
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
      ProcessBuilder builder = new ProcessBuilder("/tmp/libreoffice.AppImage", "--appimage-extract");
      builder.redirectOutput(ProcessBuilder.Redirect.appendTo(logFile));
      builder.redirectError(ProcessBuilder.Redirect.appendTo(logFile));
      builder.start();
    }
  }
}

