package mil.af.dgs1sdt.fritz.Stores;

import java.util.ArrayList;
import java.util.List;

public class StatusStore {

  public static List getList() {
    return completed;
  }

  public static void addToList(String hash) {
    completed.add(hash);
  }

  public static void removeFromList(String hash) { completed.remove(hash); }

  private static List<String> completed = new ArrayList<>();
}
