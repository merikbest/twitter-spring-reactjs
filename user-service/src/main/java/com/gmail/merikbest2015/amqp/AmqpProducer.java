package com.gmail.merikbest2015.amqp;

import com.gmail.merikbest2015.dto.request.EmailRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AmqpProducer {

    private final AmqpTemplate amqpTemplate;

    @Value("${rabbitmq.exchanges.internal}")
    private String exchange;

    @Value("${rabbitmq.routing-keys.internal-mail}")
    private String routingKey;

    public void sendEmail(EmailRequest emailRequest) {
        amqpTemplate.convertAndSend(exchange, routingKey, emailRequest);
    }
}
