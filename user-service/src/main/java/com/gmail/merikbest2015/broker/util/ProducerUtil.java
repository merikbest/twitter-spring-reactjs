package com.gmail.merikbest2015.broker.util;

import lombok.experimental.UtilityClass;
import org.apache.kafka.clients.producer.ProducerRecord;

import static com.gmail.merikbest2015.commons.constants.PathConstants.AUTH_USER_ID_HEADER;

@UtilityClass
public class ProducerUtil {

    public static <V> ProducerRecord<String, V> authHeaderWrapper(String topic, V event, Long authUserId) {
        ProducerRecord<String, V> producerRecord = new ProducerRecord<>(topic, event);
        producerRecord.headers().add(AUTH_USER_ID_HEADER, authUserId.toString().getBytes());
        return producerRecord;
    }
}
