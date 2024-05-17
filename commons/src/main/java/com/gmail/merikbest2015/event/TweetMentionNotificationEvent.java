package com.gmail.merikbest2015.event;

import com.gmail.merikbest2015.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.enums.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TweetMentionNotificationEvent {
    private NotificationType notificationType;
    private UserNotificationDto notifiedUser;
    private UserNotificationDto user;
    private TweetNotificationDto tweet;
    private TweetResponse tweetResponse;
}
