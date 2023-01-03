package com.gmail.merikbest2015.dto.response;

import com.gmail.merikbest2015.commons.dto.TweetResponse;
import com.gmail.merikbest2015.commons.enums.NotificationType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotificationReplyResponse {
    private Long tweetId;
    private NotificationType notificationType;
    private TweetResponse tweet;
}
