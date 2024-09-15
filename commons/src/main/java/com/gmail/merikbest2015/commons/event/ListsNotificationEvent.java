package com.gmail.merikbest2015.commons.event;

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
    private ListsNotificationDto lists;
}
