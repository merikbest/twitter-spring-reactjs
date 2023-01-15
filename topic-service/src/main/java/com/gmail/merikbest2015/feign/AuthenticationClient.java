package com.gmail.merikbest2015.feign;

import com.gmail.merikbest2015.configuration.FeignConfiguration;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import static com.gmail.merikbest2015.controller.PathConstants.API_V1_AUTH;

@FeignClient(name = "user-service", contextId = "AuthenticationClient", configuration = FeignConfiguration.class)
public interface AuthenticationClient {

    @GetMapping(API_V1_AUTH + "/user/id")
    Long getAuthenticatedUserId();
}
