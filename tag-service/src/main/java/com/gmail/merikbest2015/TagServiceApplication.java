package com.gmail.merikbest2015;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class TagServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(TagServiceApplication.class, args);
    }
}
