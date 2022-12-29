package com.gmail.merikbest2015.feign;

import com.gmail.merikbest2015.dto.EmailRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient("email")
public interface EmailClient {

    @PostMapping("/api/v1/email/suggested")
    ResponseEntity<Void> sendEmail(@RequestBody EmailRequest emailRequest);
}
