package mil.af.dgs1sdt.fritz;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@SpringBootApplication
@RestController
public class FritzApplication {

  @RequestMapping("/user")
  public Principal user(Principal principal) {
    System.out.println("looking up user");
    System.out.println(principal.toString());
    return principal;
  }

	public static void main(String[] args) {
		SpringApplication.run(FritzApplication.class, args);
	}

}

