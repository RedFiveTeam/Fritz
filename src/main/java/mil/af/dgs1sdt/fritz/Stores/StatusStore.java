package mil.af.dgs1sdt.fritz.Stores;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class StatusStore {

  public static Set getList() {
    return completed;
  }

  public static void addToList(String hash) {
    completed.add(hash);
  }

  public static void removeFromList(String hash) { completed.remove(hash); }

  private static Set<String> completed = new HashSet<>();
}
