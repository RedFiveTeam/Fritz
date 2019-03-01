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
  private long id;

  private String uid;

  private String action;

  private Long time;

  public Metric(String uid, String action, Long time) {
    this.uid = uid;
    this.action = action;
    this.time = time;
  }
}
