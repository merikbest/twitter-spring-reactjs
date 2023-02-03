package com.gmail.merikbest2015.dto.response;

import com.gmail.merikbest2015.dto.TweetResponse;
import com.gmail.merikbest2015.dto.UserResponse;
import com.gmail.merikbest2015.enums.NotificationType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NotificationInfoResponse {
    private Long id;
    private LocalDateTime date;
    private NotificationType notificationType;
    private UserResponse user;
    private TweetResponse tweet;
}
