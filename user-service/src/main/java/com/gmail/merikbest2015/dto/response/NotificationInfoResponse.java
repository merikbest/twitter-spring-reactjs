package com.gmail.merikbest2015.dto.response;

import com.gmail.merikbest2015.commons.dto.TweetResponse;
import com.gmail.merikbest2015.commons.dto.UserResponse;
import com.gmail.merikbest2015.commons.enums.NotificationType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class NotificationInfoResponse {
    private Long id;
    private LocalDateTime date;
    private NotificationType notificationType;
    private UserResponse user;
    private TweetResponse tweet;
}
