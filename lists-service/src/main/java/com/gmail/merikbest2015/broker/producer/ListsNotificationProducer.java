package com.gmail.merikbest2015.broker.producer;

import com.gmail.merikbest2015.event.ListsNotificationEvent;
import com.gmail.merikbest2015.event.UserNotificationDto;
import com.gmail.merikbest2015.model.Lists;
import com.gmail.merikbest2015.model.User;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import static com.gmail.merikbest2015.constants.KafkaTopicConstants.SEND_LISTS_NOTIFICATION_TOPIC;
import static com.gmail.merikbest2015.constants.PathConstants.AUTH_USER_ID_HEADER;

@Component
@RequiredArgsConstructor
public class ListsNotificationProducer {

    private final KafkaTemplate<String, ListsNotificationEvent> kafkaTemplate;

    public void sendNotificationEvent(User notifiedUser, User user, Lists lists) {
        ProducerRecord<String, ListsNotificationEvent> producerRecord = new ProducerRecord<>(
                SEND_LISTS_NOTIFICATION_TOPIC, toListsNotificationEvent(notifiedUser, user, lists));
        producerRecord.headers().add(AUTH_USER_ID_HEADER, user.getId().toString().getBytes());
        kafkaTemplate.send(producerRecord);
    }

    private static ListsNotificationEvent toListsNotificationEvent(User notifiedUser, User user, Lists lists) {
        return ListsNotificationEvent.builder()
                .notificationCondition(true)
                .notifiedUser(toUserDto(notifiedUser))
                .user(toUserDto(user))
                .lists(toListsDto(lists))
                .build();
    }

    private static UserNotificationDto toUserDto(User user) {
        return UserNotificationDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .avatar(user.getAvatar())
                .build();
    }

    private static ListsNotificationEvent.Lists toListsDto(Lists lists) {
        return ListsNotificationEvent.Lists.builder()
                .id(lists.getId())
                .listName(lists.getListName())
                .build();
    }
}
