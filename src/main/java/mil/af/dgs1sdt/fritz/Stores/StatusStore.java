package mil.af.dgs1sdt.fritz.Stores;

import java.util.ArrayList;
import java.util.List;

public class StatusStore {

  public List getList() {
    return this.completed;
  }

  public void addToList(String hash) {
    this.completed.add(hash);
  }

  private static List<String> completed = new ArrayList<>();
}
