package mil.af.dgs1sdt.fritz.Metrics;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Metric {
  @Id
  @GeneratedValue
  private Long id;

  private String uid;

  private String action;

  private Long startTime;

  private Long endTime;

  public Metric(String uid, String action, Long startTime, Long endTime) {
    this.uid = uid;
    this.action = action;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  public Metric update(MetricJSON json) {
    this.setId(json.getId());
    this.setUid(json.getUid());
    this.setAction(json.getAction());
    this.setStartTime(json.getStartTime());
    this.setEndTime(json.getEndTime());
    return this;
  }
}
