package com.marcin.kupiec;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class SpringBootJwtApplication extends SpringBootServletInitializer {
	  @Override
	    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
	         return application.sources(SpringBootJwtApplication.class);
	    }
	  
	public static void main(String[] args) {
		SpringApplication.run(SpringBootJwtApplication.class, args);
	}
}
