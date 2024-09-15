package com.gmail.merikbest2015.broker.consumer;

import com.gmail.merikbest2015.commons.event.UpdateListsEvent;
import com.gmail.merikbest2015.service.ListsHandlerService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import static com.gmail.merikbest2015.commons.constants.KafkaTopicConstants.UPDATE_LISTS_TOPIC;

@Component
@RequiredArgsConstructor
public class ListsConsumer {

    private final ListsHandlerService listsHandlerService;

    @KafkaListener(topics = UPDATE_LISTS_TOPIC, groupId = "${spring.kafka.consumer.group-id}")
    public void listsUpdateListener(UpdateListsEvent listsEvent) {
        listsHandlerService.handleUpdateList(listsEvent);
    }
}
