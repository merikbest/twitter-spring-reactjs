package com.gmail.merikbest2015.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static com.gmail.merikbest2015.constants.PathConstants.PAGE_TOTAL_COUNT;

@Configuration
public class MvcConfiguration implements WebMvcConfigurer {

    @Value("${hostname}")
    private String hostname;

    @Bean
    @LoadBalanced
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("*")
                .allowedOrigins(hostname)
                .allowedMethods("HEAD", "OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE")
                .exposedHeaders(PAGE_TOTAL_COUNT)
                .allowedHeaders("*");
    }
}
