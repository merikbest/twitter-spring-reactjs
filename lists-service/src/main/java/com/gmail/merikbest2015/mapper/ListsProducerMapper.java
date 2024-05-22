package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.event.ListsNotificationDto;
import com.gmail.merikbest2015.event.ListsNotificationEvent;
import com.gmail.merikbest2015.event.UserNotificationDto;
import com.gmail.merikbest2015.model.Lists;
import com.gmail.merikbest2015.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ListsProducerMapper {

    private final BasicMapper basicMapper;

    public ListsNotificationEvent toListsNotificationEvent(User notifiedUser, User user, Lists lists) {
        return ListsNotificationEvent.builder()
                .notificationCondition(true)
                .notifiedUser(toUserDto(notifiedUser))
                .user(toUserDto(user))
                .lists(toListsDto(lists))
                .build();
    }

    private UserNotificationDto toUserDto(User user) {
        return basicMapper.convertToResponse(user, UserNotificationDto.class);
    }

    private ListsNotificationDto toListsDto(Lists lists) {
        return basicMapper.convertToResponse(lists, ListsNotificationDto.class);
    }
}
