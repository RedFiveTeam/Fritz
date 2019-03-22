package mil.af.dgs1sdt.fritz;

import mil.af.dgs1sdt.fritz.Controllers.UploadController;
import mil.af.dgs1sdt.fritz.Models.TrackingModel;
import mil.af.dgs1sdt.fritz.Statistics.Statistic;
import mil.af.dgs1sdt.fritz.Statistics.StatisticRepository;
import mil.af.dgs1sdt.fritz.Stores.TrackingStore;
import org.apache.poi.sl.usermodel.Slide;
import org.apache.poi.sl.usermodel.SlideShow;
import org.apache.poi.sl.usermodel.SlideShowFactory;
import org.apache.poi.xslf.usermodel.XMLSlideShow;
import org.apache.poi.xslf.usermodel.XSLFShape;
import org.apache.poi.xslf.usermodel.XSLFSlide;
import org.apache.poi.xslf.usermodel.XSLFTextBox;
import org.apache.xmlbeans.XmlObject;
import org.apache.xmlbeans.XmlString;
import org.openxmlformats.schemas.presentationml.x2006.main.CTSlide;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Controller;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.*;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Conversion {

  @Async
  public void convertPPTX(String filename, String hash) throws IOException {

    TrackingModel tracking = TrackingStore.getTrackingList().stream()
      .filter(tm -> hash.equals(tm.getHash()))
      .findAny()
      .orElse(new TrackingModel()); 

    File file = new File("/tmp/working/" + hash + "/" + filename);
    float scale = 2;
    String slidenumStr = "-1";
    String outdir = "/tmp/complete/" + hash + "/";
    String format = "png";

    try (SlideShow<?, ?> ss = SlideShowFactory.create(file, null, true)) {
      List<? extends Slide<?, ?>> slides = ss.getSlides();

      XMLSlideShow slideShow = new XMLSlideShow(new FileInputStream(file));

      tracking.setTimes(new String[slides.size()]);

      Set<Integer> slidenum = slideIndexes(slides.size(), slidenumStr);
      tracking.setTotalSlides(slidenum.size());

      Dimension pgsize = ss.getPageSize();
      int width = (int) (pgsize.width * scale);
      int height = (int) (pgsize.height * scale);

      String pattern = "[0-9]{4}Z?";

      for (Integer slideNo : slidenum) {
        Slide<?, ?> slide = slides.get(slideNo);

        XSLFSlide xmlSlide = slideShow.getSlides().get(slideNo);
        List<XSLFShape> shapes = xmlSlide.getShapes();
        for (XSLFShape shape : shapes) {
          if (shape instanceof XSLFTextBox) {
            XSLFTextBox textBox = (XSLFTextBox) shape;
            String text = textBox.getText();
            Matcher m = Pattern.compile(pattern).matcher(text);
            if (m.find()) {
              String[] times = tracking.getTimes();
              times[slideNo] = (m.group().replace("Z", ""));
              tracking.setTimes(times);
            }
          }
        }

        BufferedImage img = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
        Graphics2D graphics = img.createGraphics();

        graphics.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        graphics.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
        graphics.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC);
        graphics.setRenderingHint(RenderingHints.KEY_FRACTIONALMETRICS, RenderingHints.VALUE_FRACTIONALMETRICS_ON);
        graphics.setRenderingHint(RenderingHints.KEY_DITHERING, RenderingHints.VALUE_DITHER_DISABLE);

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

        graphics.dispose();
        img.flush();
        tracking.setCompletedSlides(tracking.getCompletedSlides() + 1);
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

