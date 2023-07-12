package com.gmail.merikbest2015;

import com.gmail.merikbest2015.dto.response.notification.NotificationListResponse;
import com.gmail.merikbest2015.dto.response.notification.NotificationTweetResponse;
import com.gmail.merikbest2015.dto.response.notification.NotificationUserResponse;
import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.repository.projection.NotificationInfoProjection;
import com.gmail.merikbest2015.repository.projection.NotificationProjection;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.gmail.merikbest2015.util.TestConstants.USER_ID;

public class NotificationTestHelper {

    public static final ProjectionFactory factory = new SpelAwareProxyProjectionFactory();

    public static List<NotificationProjection> getMockNotificationProjectionList() {
        Map<String, Object> notificationMap = new HashMap<>();
        notificationMap.put("id", 1L);
        notificationMap.put("date", LocalDateTime.now());
        notificationMap.put("notificationType", NotificationType.TWEET);
        notificationMap.put("userId", USER_ID);
        notificationMap.put("userToFollowId", 1L);
        notificationMap.put("tweetId", 3L);
        notificationMap.put("listId", 4L);
        notificationMap.put("user", new NotificationUserResponse());
        notificationMap.put("userToFollow", new NotificationUserResponse());
        notificationMap.put("tweet", new NotificationTweetResponse());
        notificationMap.put("list", new NotificationListResponse());
        NotificationProjection notification1 = factory.createProjection(NotificationProjection.class, notificationMap);
        NotificationProjection notification2 = factory.createProjection(NotificationProjection.class, notificationMap);
        return Arrays.asList(notification1, notification2);
    }

    public static NotificationInfoProjection getMockNotificationInfoProjection() {
        return factory.createProjection(
                NotificationInfoProjection.class,
                Map.of(
                        "id", 1L,
                        "date", LocalDateTime.now(),
                        "notificationType", NotificationType.TWEET,
                        "userId", USER_ID,
                        "tweetId", 3L,
                        "user", new NotificationUserResponse(),
                        "tweet", new NotificationTweetResponse()
                ));
    }
}
