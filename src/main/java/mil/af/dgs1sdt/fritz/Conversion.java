package mil.af.dgs1sdt.fritz;

import mil.af.dgs1sdt.fritz.Models.TrackingModel;
import mil.af.dgs1sdt.fritz.Stores.TrackingStore;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.pdfbox.tools.imageio.ImageIOUtil;
import org.springframework.scheduling.annotation.Async;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Conversion {

  @Async
  public void convertPDF(String filename, String hash) throws IOException {

    TrackingModel tracking = TrackingStore.getTrackingList().stream()
      .filter(tm -> hash.equals(tm.getHash()))
      .findAny()
      .orElse(new TrackingModel());

    File file = new File("/tmp/working/" + hash + "/" + filename);
    String outdir = "/tmp/complete/" + hash + "/";

    File out = new File(outdir);
    if (!out.exists())
      out.mkdirs();

    try (final PDDocument document = PDDocument.load(file)) {
      String pattern = "[0-9]{4}Z";
      tracking.setTimes(new String[document.getNumberOfPages()]);
      tracking.setTotalSlides(document.getNumberOfPages());
      PDFRenderer pdfRenderer = new PDFRenderer(document);
      for (int page = 0; page < document.getNumberOfPages(); page++) {
        PDFTextStripper stripper = new PDFTextStripper();
        stripper.setStartPage(page + 1);
        stripper.setEndPage(page + 1);
        String text = stripper.getText(document);
        Matcher m = Pattern.compile(pattern).matcher(text);
        if (m.find()) {
          String[] times = tracking.getTimes();
          times[page] = (m.group().replace("Z", ""));
          tracking.setTimes(times);
        }
        BufferedImage bim = pdfRenderer.renderImageWithDPI(page, 300, ImageType.RGB);
        String fileName = outdir + "image-" + page + ".jpg";
        ImageIOUtil.writeImage(bim, fileName, 300);
        tracking.setCompletedSlides(tracking.getCompletedSlides() + 1);
      }
      document.close();
    } catch (IOException e) {
      System.err.println("Exception while trying to create pdf document - " + e);
    }
  }
}

