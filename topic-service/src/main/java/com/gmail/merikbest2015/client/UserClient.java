package com.gmail.merikbest2015.client;

import com.gmail.merikbest2015.configuration.FeignConfiguration;
import com.gmail.merikbest2015.event.UpdateUserEvent;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

import static com.gmail.merikbest2015.constants.FeignConstants.USER_SERVICE;
import static com.gmail.merikbest2015.constants.PathConstants.API_V1_USER;
import static com.gmail.merikbest2015.constants.PathConstants.BATCH_USERS;

@CircuitBreaker(name = USER_SERVICE)
@FeignClient(value = USER_SERVICE, path = API_V1_USER, configuration = FeignConfiguration.class)
public interface UserClient {

    @GetMapping(BATCH_USERS)
    List<UpdateUserEvent> getBatchUsers(@RequestParam("period") Integer period,
                                        @RequestParam("page") Integer page,
                                        @RequestParam("limit") Integer limit);
}
