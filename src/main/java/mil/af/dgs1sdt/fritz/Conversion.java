package mil.af.dgs1sdt.fritz;

import mil.af.dgs1sdt.fritz.Controllers.UploadController;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.pdfbox.tools.imageio.ImageIOUtil;

import java.awt.image.BufferedImage;
import java.io.File;

public class Conversion {

  public static void convertToPDF(String pptPath, String hash) throws Exception {
    String os = System.getProperty("os.name").toLowerCase();

    String completeDirStr = "/tmp/complete" + hash;
    File completeDir = new File(completeDirStr);

    if (!completeDir.exists())
      completeDir.mkdirs();

    if (os.contains("mac")) {
      File logFile = new File("/tmp/libreoffice.log");
      ProcessBuilder builder = new ProcessBuilder("/Applications/LibreOffice.app/Contents/MacOS/soffice", "--invisible", "--convert-to", "pdf", "/tmp/" + pptPath, "--outdir", completeDirStr);
      builder.redirectOutput(ProcessBuilder.Redirect.appendTo(logFile));
      builder.redirectError(ProcessBuilder.Redirect.appendTo(logFile));
      builder.start();

    } else {
      File logFile = new File("/tmp/libreoffice.log");
      ProcessBuilder builder2 = new ProcessBuilder("/home/vcap/app/squashfs-root/AppRun", "--invisible", "--headless", "--convert-to", "pdf", "/tmp/" + pptPath, "--outdir", completeDirStr);
      builder2.redirectOutput(ProcessBuilder.Redirect.appendTo(logFile));
      builder2.redirectError(ProcessBuilder.Redirect.appendTo(logFile));
      builder2.start();
    }
  }

  public static void convertToJPG(String pdfPath, String hash) throws Exception {
    PDDocument document = PDDocument.load(new File(pdfPath));
    PDFRenderer pdfRenderer = new PDFRenderer(document);
    String completeDirStr = "/tmp/complete" + hash;
    File completeDir = new File(completeDirStr);

    if (!completeDir.exists())
      completeDir.mkdirs();
    for (int page = 0; page < document.getNumberOfPages(); page++) {
      BufferedImage bim = pdfRenderer.renderImageWithDPI(page, 500, ImageType.RGB);
      ImageIOUtil.writeImage(bim, completeDirStr + "-" + (page + 1) + ".png", 500);
    }
    UploadController.store.addToList(hash);
    document.close();
  }
}
