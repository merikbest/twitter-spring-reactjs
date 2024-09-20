package com.gmail.merikbest2015.client;

import com.gmail.merikbest2015.commons.configuration.FeignConfiguration;
import com.gmail.merikbest2015.commons.constants.FeignConstants;
import com.gmail.merikbest2015.commons.constants.PathConstants;
import com.gmail.merikbest2015.commons.event.UpdateUserEvent;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@CircuitBreaker(name = FeignConstants.USER_SERVICE)
@FeignClient(value = FeignConstants.USER_SERVICE, path = PathConstants.API_V1_USER, configuration = FeignConfiguration.class)
public interface UserClient {

    @GetMapping(PathConstants.BATCH_USERS)
    List<UpdateUserEvent> getBatchUsers(@RequestParam("period") Integer period,
                                        @RequestParam("page") Integer page,
                                        @RequestParam("limit") Integer limit);
}
