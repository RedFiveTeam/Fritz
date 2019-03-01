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
  private Long time;

  public MetricJSON(String uid, String action, Long time) {
    this.uid = uid;
    this.time = time;
    this.action = action;
  }
}

