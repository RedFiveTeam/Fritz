package mil.af.dgs1sdt.fritz.Models;

import lombok.Data;

@Data
public class RenameModel {

  private String _oldName;
  private String _newName;

  public String getOldName() {
    return this._oldName;
  }

  public String getNewName() {
    return this._newName;
  }

  public void setOldName(String name) {
    this._oldName = name;
  }

  public void setNewName(String name) {
    this._newName = name;
  }
}
