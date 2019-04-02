package mil.af.dgs1sdt.fritz.Statistics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Optional;

@Controller
@RequestMapping(StatisticController.URI)
public class StatisticController {
  public static final String URI = "/api/statistics";

  @Autowired
  StatisticRepository statisticRepository;

  @GetMapping
  public @ResponseBody
  Optional<Statistic> getAll() {
    return statisticRepository.findById(1L);
  }
}
