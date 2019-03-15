package mil.af.dgs1sdt.fritz.Models;

import lombok.Data;

import java.util.List;

@Data
public class StatusModel {

  private String status = "pending";
  private List<String> files;
  private int progress;
  private int total;
  private Thread thread;

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public List<String> getFiles() {
    return files;
  }

  public void setFiles(List<String> files) {
    this.files = files;
  }

  public int getProgress() {
    return progress;
  }

  public void setProgress(int progress) {
    this.progress = progress;
  }

  public int getTotal() {
    return total;
  }

  public void setTotal(int total) {
    this.total = total;
  }
}