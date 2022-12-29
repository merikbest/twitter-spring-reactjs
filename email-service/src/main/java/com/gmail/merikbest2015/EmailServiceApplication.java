package com.gmail.merikbest2015;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class EmailServiceApplication {
    public static void main( String[] args ) {
        SpringApplication.run(EmailServiceApplication.class, args);
    }
}
