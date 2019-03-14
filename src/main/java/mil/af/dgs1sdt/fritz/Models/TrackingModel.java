package mil.af.dgs1sdt.fritz.Models;

import lombok.Data;
import org.springframework.lang.NonNull;

import javax.validation.constraints.NotNull;

@Data
public class TrackingModel {

  private String hash;
  private String status;

  @NonNull
  private int completedSlides = 0;

  @NonNull
  private int totalSlides = 1;
  private Thread th;

  public String getHash() {
    return hash;
  }

  public void setHash(String hash) {
    this.hash = hash;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  @NonNull
  public int getCompletedSlides() {
    return completedSlides;
  }

  @NonNull
  public void setCompletedSlides(int completedSlides) {
    this.completedSlides = completedSlides;
  }

  public int getTotalSlides() {
    return totalSlides;
  }

  public void setTotalSlides(int totalSlides) {
    this.totalSlides = totalSlides;
  }

  public Thread getTh() {
    return th;
  }

  public void setTh(Thread th) {
    this.th = th;
  }
}
