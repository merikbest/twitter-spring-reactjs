package com.gmail.merikbest2015.feign;

import com.gmail.merikbest2015.configuration.FeignConfiguration;
import com.gmail.merikbest2015.dto.request.EmailRequest;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import static com.gmail.merikbest2015.constants.FeignConstants.EMAIL_SERVICE;
import static com.gmail.merikbest2015.constants.PathConstants.API_V1_EMAIL;
import static com.gmail.merikbest2015.constants.PathConstants.SUGGESTED;

@CircuitBreaker(name = EMAIL_SERVICE)
@FeignClient(value = EMAIL_SERVICE, path = API_V1_EMAIL, configuration = FeignConfiguration.class)
public interface EmailClient {

    @PostMapping(SUGGESTED)
    ResponseEntity<Void> sendEmail(@RequestBody EmailRequest emailRequest);
}
