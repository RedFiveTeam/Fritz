package mil.af.dgs1sdt.fritz.Controllers;

import mil.af.dgs1sdt.fritz.Interfaces.UnicornInterface;
import mil.af.dgs1sdt.fritz.Models.MissionModel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping(UnicornController.URI)
public class UnicornController {

  public static final String URI = "/api/unicorn";

  @ResponseBody
  @GetMapping(produces = "application/json", path = "/missions")
  public List<MissionModel> missions() throws Exception {
    UnicornInterface unicorn = new UnicornInterface();
    return unicorn.getMissions();
  }
}
