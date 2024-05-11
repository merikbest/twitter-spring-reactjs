package com.gmail.merikbest2015.event;

import com.gmail.merikbest2015.enums.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ListsNotificationEvent {
    private NotificationType notificationType;
    private boolean notificationCondition;
    private User notifiedUser;
    private User user;
    private Lists lists;

    @Builder
    public static class User {
        private Long id;
        private String username;
        private String avatar;
    }

    @Builder
    public static class Lists {
        private Long id;
        private String listName;
    }
}
