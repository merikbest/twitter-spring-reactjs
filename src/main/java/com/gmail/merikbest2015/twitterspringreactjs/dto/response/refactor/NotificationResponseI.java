package com.gmail.merikbest2015.twitterspringreactjs.dto.response.refactor;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ImageResponse;
import com.gmail.merikbest2015.twitterspringreactjs.model.NotificationType;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
public class NotificationResponseI {
    private Long id;
    private LocalDateTime date;
    private NotificationType notificationType;
    private NotificationUserResponse user;
    private NotificationUserResponse userToFollow;
    private NotificationTweetResponse tweet;

    @Getter
    @Setter
    public static class NotificationUserResponse {
        private Long id;
        private String username;
        private ImageResponse avatar;
        private boolean isFollower;
    }

    @Getter
    @Setter
    public static class NotificationTweetResponse {
        private Long id;
        private String text;
        private UserCommonResponseI user;
    }
}
