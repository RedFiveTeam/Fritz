package mil.af.dgs1sdt.fritz.Metrics;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MetricJSON {

  private Long id;
  private String uid;
  private String action;
  private Long startTime;
  private Long endTime;

  public MetricJSON(String uid, String action, Long startTime, Long endTime) {
    this.uid = uid;
    this.startTime = startTime;
    this.endTime = endTime;
    this.action = action;
  }
}

