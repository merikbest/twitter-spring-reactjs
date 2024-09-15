package com.gmail.merikbest2015.client;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import static com.gmail.merikbest2015.commons.constants.FeignConstants.WEBSOCKET_SERVICE;
import static com.gmail.merikbest2015.commons.constants.PathConstants.API_V1_WEBSOCKET;

@CircuitBreaker(name = WEBSOCKET_SERVICE)
@FeignClient(name = WEBSOCKET_SERVICE)
public interface WebSocketClient {

    @PostMapping(API_V1_WEBSOCKET)
    void send(@RequestParam("destination") String destination, @RequestBody Object request);
}
