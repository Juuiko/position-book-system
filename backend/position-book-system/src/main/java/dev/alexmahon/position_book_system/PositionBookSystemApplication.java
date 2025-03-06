package dev.alexmahon.position_book_system;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@SpringBootApplication
@RestController
@OpenAPIDefinition(
	info = @Info(
		title = "Position Book System",
		version = "1.0",
		description = "Position Book System API"
	)
)
public class PositionBookSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(PositionBookSystemApplication.class, args);
	}

}
