package mil.af.dgs1sdt.fritz.Statistics;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StatisticJSON {


  private Long id;
  private Long imagesConverted;

  public StatisticJSON(Long imagesConverted) {
    this.imagesConverted = imagesConverted;
  }

}
