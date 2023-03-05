package com.gmail.merikbest2015.feign;

import com.gmail.merikbest2015.configuration.FeignConfiguration;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import static com.gmail.merikbest2015.constants.FeignConstants.IMAGE_SERVICE;
import static com.gmail.merikbest2015.constants.PathConstants.API_V1_IMAGE;

@CircuitBreaker(name = IMAGE_SERVICE)
@FeignClient(name = IMAGE_SERVICE, configuration = FeignConfiguration.class)
public interface ImageClient {
    
    @PostMapping(API_V1_IMAGE + "/upload")
    String uploadImage(@RequestPart("file") MultipartFile file);
}
