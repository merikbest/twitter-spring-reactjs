package com.gmail.merikbest2015.client.email;

import com.gmail.merikbest2015.commons.configuration.FeignConfiguration;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import static com.gmail.merikbest2015.commons.controller.PathConstants.API_V1_EMAIL;

@FeignClient(value = "email-service", configuration = FeignConfiguration.class)
public interface EmailClient {

    @PostMapping(API_V1_EMAIL + "/suggested")
    ResponseEntity<Void> sendEmail(@RequestBody EmailRequest emailRequest);
}
