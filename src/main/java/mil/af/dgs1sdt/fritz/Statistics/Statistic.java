package mil.af.dgs1sdt.fritz.Statistics;

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
public class Statistic {
  @Id
  @GeneratedValue
  private Long id;

  private Long imagesConverted;

  public Statistic(Long imagesConverted) {
    this.imagesConverted = imagesConverted;
  }
}
