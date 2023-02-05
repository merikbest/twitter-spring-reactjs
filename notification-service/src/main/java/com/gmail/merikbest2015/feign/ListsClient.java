package com.gmail.merikbest2015.feign;

import com.gmail.merikbest2015.configuration.FeignConfiguration;
import com.gmail.merikbest2015.dto.response.notification.NotificationListResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import static com.gmail.merikbest2015.constants.PathConstants.API_V1_LISTS;
import static com.gmail.merikbest2015.constants.FeignConstants.LISTS_SERVICE;

@FeignClient(name = LISTS_SERVICE, configuration = FeignConfiguration.class)
public interface ListsClient {

    @GetMapping(API_V1_LISTS + "/{listId}")
    NotificationListResponse getNotificationList(@PathVariable("listId") Long listId);
}
