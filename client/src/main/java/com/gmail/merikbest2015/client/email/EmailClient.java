package com.gmail.merikbest2015.client.email;

import com.gmail.merikbest2015.commons.configuration.FeignConfiguration;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(value = "email-service", configuration = FeignConfiguration.class)
public interface EmailClient {

    @PostMapping("/api/v1/email/suggested")
    ResponseEntity<Void> sendEmail(@RequestBody EmailRequest emailRequest);
}
