package com.gmail.merikbest2015.dto.response;

import com.gmail.merikbest2015.dto.TweetResponse;
import com.gmail.merikbest2015.enums.NotificationType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotificationReplyResponse {
    private Long tweetId;
    private NotificationType notificationType;
    private TweetResponse tweet;
}
