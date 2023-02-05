package com.gmail.merikbest2015.feign;

import com.gmail.merikbest2015.configuration.FeignConfiguration;
import com.gmail.merikbest2015.dto.request.NotificationRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import static com.gmail.merikbest2015.constants.PathConstants.API_V1_NOTIFICATION;
import static com.gmail.merikbest2015.constants.FeignConstants.NOTIFICATION_SERVICE;

@FeignClient(value = NOTIFICATION_SERVICE, configuration = FeignConfiguration.class)
public interface NotificationClient {

    @PostMapping(API_V1_NOTIFICATION + "/user")
    void sendUserNotification(@RequestBody NotificationRequest request);
}
