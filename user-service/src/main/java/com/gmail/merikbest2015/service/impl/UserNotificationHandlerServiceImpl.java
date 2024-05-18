package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.broker.producer.TweetSubscriberNotificationProducer;
import com.gmail.merikbest2015.event.TweetSubscriberNotificationEvent;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.UserRepository;
import com.gmail.merikbest2015.service.UserNotificationHandlerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserNotificationHandlerServiceImpl implements UserNotificationHandlerService {

    private final UserRepository userRepository;
    private final TweetSubscriberNotificationProducer tweetSubscriberNotificationProducer;

    @Override
    @Transactional
    public void increaseNotificationsCount(Long notifiedUserEventId) {
        userRepository.increaseNotificationsCount(notifiedUserEventId);
    }

    @Override
    @Transactional
    public void increaseMentionsCount(Long notifiedUserEventId) {
        userRepository.increaseMentionsCount(notifiedUserEventId);
    }

    @Override
    @Transactional
    public void resetNotificationCount(Long notifiedUserEventId) {
        userRepository.resetNotificationCount(notifiedUserEventId);
    }

    @Override
    @Transactional
    public void resetMentionCount(Long notifiedUserEventId) {
        userRepository.resetMentionCount(notifiedUserEventId);
    }

    @Override
    public void processSubscriberNotificationListener(TweetSubscriberNotificationEvent event) {
        List<User> subscribers = userRepository.getSubscribersByUserId(event.getUser().getId());
        tweetSubscriberNotificationProducer.sendTweetSubscriberNotificationEvent(event, subscribers);
    }
}
