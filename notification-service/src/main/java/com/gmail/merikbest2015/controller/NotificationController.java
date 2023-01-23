package com.gmail.merikbest2015.controller;

import com.gmail.merikbest2015.dto.NotificationRequest;
import com.gmail.merikbest2015.dto.notification.NotificationResponse;
import com.gmail.merikbest2015.mapper.NotificationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import static com.gmail.merikbest2015.controller.PathConstants.API_V1_NOTIFICATION;

@RestController
@RequiredArgsConstructor
@RequestMapping(API_V1_NOTIFICATION)
public class NotificationController {

    private final NotificationMapper notificationMapper;
    private final SimpMessagingTemplate messagingTemplate;

    @PostMapping("/list")
    public void sendListNotification(@RequestBody NotificationRequest request) {
        NotificationResponse notification = notificationMapper.sendListNotification(request);

        if (notification.getId() != null) {
            messagingTemplate.convertAndSend("/topic/notifications/" + notification.getUser().getId(), notification);
        }
    }

    @GetMapping("/tweet/{tweetId}")
    public void sendTweetNotificationToSubscribers(@PathVariable("tweetId") Long tweetId) {
        notificationMapper.sendTweetNotificationToSubscribers(tweetId);
    }
}
