package com.gmail.merikbest2015.configuration;

import lombok.Getter;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Getter
@Configuration
public class AmqpConsumerConfiguration {

    @Value("${rabbitmq.exchanges.internal}")
    private String internalExchange;

    @Value("${rabbitmq.queues.mail}")
    private String mailQueue;

    @Value("${rabbitmq.routing-keys.internal-mail}")
    private String internalMailRoutingKey;

    @Bean
    public TopicExchange internalTopicExchange() {
        return new TopicExchange(this.internalExchange);
    }

    @Bean
    public Queue mailQueue() {
        return new Queue(this.mailQueue);
    }

    @Bean
    public Binding internalToMailBinding() {
        return BindingBuilder
                .bind(mailQueue())
                .to(internalTopicExchange())
                .with(this.internalMailRoutingKey);
    }
}
