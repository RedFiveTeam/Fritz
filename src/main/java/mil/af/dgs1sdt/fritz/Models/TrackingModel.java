package mil.af.dgs1sdt.fritz.Models;

import lombok.Data;
import org.springframework.lang.NonNull;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Data
public class TrackingModel {

  private String hash;
  private String status;

  @NonNull
  private int completedSlides = 0;

  @NonNull
  private int totalSlides = 1;

  private Thread th;

  private List<String> fileList = new ArrayList<>();

  private String[] times;

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
}
