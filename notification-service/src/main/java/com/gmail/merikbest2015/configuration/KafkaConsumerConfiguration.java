package com.gmail.merikbest2015.configuration;

import com.gmail.merikbest2015.event.*;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.DefaultKafkaHeaderMapper;
import org.springframework.kafka.support.converter.RecordMessageConverter;
import org.springframework.kafka.support.converter.StringJsonMessageConverter;
import org.springframework.kafka.support.mapping.DefaultJackson2JavaTypeMapper;
import org.springframework.kafka.support.mapping.Jackson2JavaTypeMapper;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.util.HashMap;
import java.util.Map;

@EnableKafka
@Configuration
public class KafkaConsumerConfiguration {

    @Value("${spring.kafka.bootstrap-servers}")
    private String bootstrapServers;

    @Value("${spring.kafka.consumer.group-id}")
    private String groupId;

    @Bean
    public Map<String, Object> consumerConfigs() {
        Map<String, Object> props = new HashMap<>();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        props.put(ConsumerConfig.GROUP_ID_CONFIG, groupId);
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
        return props;
    }

    @Bean
    public ConsumerFactory<String, ListsNotificationEvent> listsNotificationFactory() {
        return new DefaultKafkaConsumerFactory<>(
                consumerConfigs(),
                new StringDeserializer(),
                new JsonDeserializer<>(ListsNotificationEvent.class)
        );
    }

    @Bean
    public ConsumerFactory<String, FollowUserNotificationEvent> followUserNotificationFactory() {
        return new DefaultKafkaConsumerFactory<>(
                consumerConfigs(),
                new StringDeserializer(),
                new JsonDeserializer<>(FollowUserNotificationEvent.class)
        );
    }

    @Bean
    public ConsumerFactory<String, TweetNotificationEvent> tweetNotificationFactory() {
        return new DefaultKafkaConsumerFactory<>(
                consumerConfigs(),
                new StringDeserializer(),
                new JsonDeserializer<>(TweetNotificationEvent.class)
        );
    }

    @Bean
    public ConsumerFactory<String, UpdateListsEvent> updateListsFactory() {
        return new DefaultKafkaConsumerFactory<>(
                consumerConfigs(),
                new StringDeserializer(),
                new JsonDeserializer<>(UpdateListsEvent.class)
        );
    }

    @Bean
    public ConsumerFactory<String, UpdateTweetEvent> updateTweetFactory() {
        return new DefaultKafkaConsumerFactory<>(
                consumerConfigs(),
                new StringDeserializer(),
                new JsonDeserializer<>(UpdateTweetEvent.class)
        );
    }

    @Bean
    public ConsumerFactory<String, UpdateUserEvent> updateUserFactory() {
        return new DefaultKafkaConsumerFactory<>(
                consumerConfigs(),
                new StringDeserializer(),
                new JsonDeserializer<>(UpdateUserEvent.class)
        );
    }

    @Bean
    public ConsumerFactory<String, TweetSubscriberNotificationEvent> tweetSubscriberNotificationFactory() {
        return new DefaultKafkaConsumerFactory<>(
                consumerConfigs(),
                new StringDeserializer(),
                new JsonDeserializer<>(TweetSubscriberNotificationEvent.class)
        );
    }

    @Bean
    public ConsumerFactory<String, TweetMentionNotificationEvent> tweetMentionNotificationFactory() {
        return new DefaultKafkaConsumerFactory<>(
                consumerConfigs(),
                new StringDeserializer(),
                new JsonDeserializer<>(TweetMentionNotificationEvent.class)
        );
    }

    @Bean
    public RecordMessageConverter typeConverter() {
        StringJsonMessageConverter converter = new StringJsonMessageConverter();
        DefaultJackson2JavaTypeMapper typeMapper = new DefaultJackson2JavaTypeMapper();
        DefaultKafkaHeaderMapper headerMapper = new DefaultKafkaHeaderMapper();
        typeMapper.setTypePrecedence(Jackson2JavaTypeMapper.TypePrecedence.TYPE_ID);
        typeMapper.addTrustedPackages("*");
        Map<String, Class<?>> mappings = new HashMap<>();
        mappings.put("listsNotification", ListsNotificationEvent.class);
        mappings.put("followUserNotification", FollowUserNotificationEvent.class);
        mappings.put("tweetNotification", TweetNotificationEvent.class);
        mappings.put("updateLists", UpdateListsEvent.class);
        mappings.put("updateTweet", UpdateTweetEvent.class);
        mappings.put("updateUser", UpdateUserEvent.class);
        mappings.put("subscriberNotification", TweetSubscriberNotificationEvent.class);
        mappings.put("mentionNotification", TweetMentionNotificationEvent.class);
        typeMapper.setIdClassMapping(mappings);
        headerMapper.setEncodeStrings(true);
        converter.setTypeMapper(typeMapper);
        converter.setHeaderMapper(headerMapper);
        return converter;
    }
}
