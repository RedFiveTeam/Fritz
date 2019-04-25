package mil.af.dgs1sdt.fritz.Models;

import lombok.Data;

@Data
public class ReleasabilityModel {
  private String releasabilityId;
  private String releasabilityName;

  public String getReleasabilityId() {
    return releasabilityId;
  }

  public void setReleasabilityId(String releasabilityId) {
    this.releasabilityId = releasabilityId;
  }

  public String getReleasabilityName() {
    return releasabilityName;
  }

  public void setReleasabilityName(String releasabilityName) {
    this.releasabilityName = releasabilityName;
  }
}
