package com.gmail.merikbest2015;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableEurekaClient
@EnableFeignClients
@EntityScan("com.gmail.merikbest2015.model")
@EnableJpaRepositories("com.gmail.merikbest2015.repository")
//@SpringBootApplication(scanBasePackages = "com.gmail.merikbest2015", exclude = {DataSourceAutoConfiguration.class})
@SpringBootApplication(scanBasePackages = "com.gmail.merikbest2015")
public class TopicServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(TopicServiceApplication.class, args);
    }
}
