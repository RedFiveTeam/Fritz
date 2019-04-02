package mil.af.dgs1sdt.fritz.Statistics;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface StatisticRepository extends JpaRepository<Statistic, Long> {
  @Modifying(clearAutomatically = true)
  @Transactional
  @Query("UPDATE Statistic s SET s.imagesConverted = s.imagesConverted + ?1 WHERE s.id = 1")
  void increase(Long count);
}
