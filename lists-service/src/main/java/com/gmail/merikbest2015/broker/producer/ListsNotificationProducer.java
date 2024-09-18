package com.gmail.merikbest2015.broker.producer;

import com.gmail.merikbest2015.commons.constants.KafkaTopicConstants;
import com.gmail.merikbest2015.commons.event.ListsNotificationEvent;
import com.gmail.merikbest2015.mapper.ListsProducerMapper;
import com.gmail.merikbest2015.model.Lists;
import com.gmail.merikbest2015.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ListsNotificationProducer {

    private final KafkaTemplate<String, ListsNotificationEvent> kafkaTemplate;
    private final ListsProducerMapper listsProducerMapper;

    public void sendNotificationEvent(User notifiedUser, User user, Lists lists) {
        ListsNotificationEvent notificationEvent = listsProducerMapper.toListsNotificationEvent(notifiedUser, user, lists);
        kafkaTemplate.send(KafkaTopicConstants.SEND_LISTS_NOTIFICATION_TOPIC, notificationEvent);
    }
}
