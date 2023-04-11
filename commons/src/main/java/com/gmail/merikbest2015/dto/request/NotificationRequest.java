package com.gmail.merikbest2015.dto.request;

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
public class NotificationRequest {
    private NotificationType notificationType;
    private Long notifiedUserId;
    private Long userId;
    private Long userToFollowId;
    private Long tweetId;
    private Long listId;
    private boolean notificationCondition;
    private TweetResponse tweet;
}
