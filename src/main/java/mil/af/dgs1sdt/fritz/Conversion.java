package mil.af.dgs1sdt.fritz;

import mil.af.dgs1sdt.fritz.Stores.StatusStore;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.pdfbox.tools.imageio.ImageIOUtil;
import org.apache.poi.sl.draw.DrawFactory;
import org.apache.poi.sl.usermodel.Slide;
import org.apache.poi.sl.usermodel.SlideShow;
import org.apache.poi.sl.usermodel.SlideShowFactory;
import org.springframework.scheduling.annotation.Async;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.TreeSet;

public class Conversion {

  public static void convertToPDF(String pptName, String hash) throws Exception {
    String os = System.getProperty("os.name").toLowerCase();

    String completeDirStr = "/tmp/complete/" + hash;
    File completeDir = new File(completeDirStr);

    if (!completeDir.exists())
      completeDir.mkdirs();

    if (os.contains("mac")) {
      File logFile = new File("/tmp/libreoffice.log");
      ProcessBuilder builder = new ProcessBuilder("/Applications/LibreOffice.app/Contents/MacOS/soffice",
        "--invisible", "--convert-to", "pdf", "/tmp/working/" + pptName, "--outdir", completeDirStr);
      builder.redirectOutput(ProcessBuilder.Redirect.appendTo(logFile));
      builder.redirectError(ProcessBuilder.Redirect.appendTo(logFile));
      builder.start();

    } else {
      File logFile = new File("/tmp/libreoffice.log");
      ProcessBuilder builder2 = new ProcessBuilder("/home/vcap/app/squashfs-root/AppRun", "--invisible", "--headless"
        , "--convert-to", "pdf", "/tmp/working/" + pptName, "--outdir", completeDirStr);
      builder2.redirectOutput(ProcessBuilder.Redirect.appendTo(logFile));
      builder2.redirectError(ProcessBuilder.Redirect.appendTo(logFile));
      builder2.start();
    }
    convertToJPG(pptName.replace(".pptx", ""), hash);
  }

  public static void convertToJPG(String pdfName, String hash) throws Exception {
    PDDocument document = PDDocument.load(new File("/tmp/complete/" + hash + "/" + pdfName + ".pdf"));
    PDFRenderer pdfRenderer = new PDFRenderer(document);
    String completeDirStr = "/tmp/complete/" + hash;
    File completeDir = new File(completeDirStr);

    if (!completeDir.exists())
      completeDir.mkdirs();
    for (int page = 0; page < document.getNumberOfPages(); page++) {
      BufferedImage bim = pdfRenderer.renderImageWithDPI(page, 500, ImageType.RGB);
      ImageIOUtil.writeImage(bim, completeDirStr + "/" + "-" + (page + 1) + ".jpg", 500);
    }
    StatusStore.addToList(hash);
    document.close();
  }

  @Async
  public void convertPPTX(String filename, String hash) throws IOException {

    File file = new File("/tmp/working/" + hash + "/" + filename);
    float scale = 1;
    String slidenumStr = "-1";
    String outdir = "/tmp/complete/" + hash + "/";
    String format = "png";

    try (SlideShow<?, ?> ss = SlideShowFactory.create(file, null, true)) {
      List<? extends Slide<?, ?>> slides = ss.getSlides();

      Set<Integer> slidenum = slideIndexes(slides.size(), slidenumStr);


      Dimension pgsize = ss.getPageSize();
      int width = (int) (pgsize.width * scale);
      int height = (int) (pgsize.height * scale);

      for (Integer slideNo : slidenum) {
        Slide<?, ?> slide = slides.get(slideNo);

        BufferedImage img = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
        Graphics2D graphics = img.createGraphics();
        DrawFactory.getInstance(graphics).fixFonts(graphics);

        graphics.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        graphics.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
        graphics.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC);
        graphics.setRenderingHint(RenderingHints.KEY_FRACTIONALMETRICS, RenderingHints.VALUE_FRACTIONALMETRICS_ON);

        graphics.scale(scale, scale);

        slide.draw(graphics);

        if (!"null".equals(format)) {
          String outname = file.getName().replaceFirst(".pptx?", "");
          outname = String.format(Locale.ROOT, "%1$s-%2$04d.%3$s", outname, slideNo, format);
          File out = new File(outdir);
          if (!out.exists())
            out.mkdirs();
          File outfile = new File(outdir, outname);
          ImageIO.write(img, format, outfile);
        }

        StatusStore.addToList(hash);

        graphics.dispose();
        img.flush();
      }
    }

  }

  private static Set<Integer> slideIndexes(final int slideCount, String range) {
    Set<Integer> slideIdx = new TreeSet<>();
    if ("-1".equals(range)) {
      for (int i=0; i<slideCount; i++) {
        slideIdx.add(i);
      }
    } else {
      for (String subrange : range.split(",")) {
        String[] idx = subrange.split("-");
        switch (idx.length) {
          default:
          case 0: break;
          case 1: {
            int subidx = Integer.parseInt(idx[0]);
            if (subrange.contains("-")) {
              int startIdx = subrange.startsWith("-") ? 0 : subidx;
              int endIdx = subrange.endsWith("-") ? slideCount : Math.min(subidx,slideCount);
              for (int i=Math.max(startIdx,1); i<endIdx; i++) {
                slideIdx.add(i-1);
              }
            } else {
              slideIdx.add(Math.max(subidx,1)-1);
            }
            break;
          }
          case 2: {
            int startIdx = Math.min(Integer.parseInt(idx[0]), slideCount);
            int endIdx = Math.min(Integer.parseInt(idx[1]), slideCount);
            for (int i=Math.max(startIdx,1); i<endIdx; i++) {
              slideIdx.add(i-1);
            }
            break;
          }
        }
      }
    }
    return slideIdx;
  }
}

