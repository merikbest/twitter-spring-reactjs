package com.gmail.merikbest2015.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ListsNotificationEvent {
    private boolean notificationCondition;
    private UserNotificationDto notifiedUser;
    private UserNotificationDto user;
    private Lists lists;

    @Data
    @Builder
    public static class Lists {
        private Long id;
        private String listName;
    }
}
