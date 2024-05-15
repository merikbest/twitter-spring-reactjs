package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.event.TweetSubscriberNotificationEvent;

public interface UserNotificationHandlerService {

    void increaseNotificationsCount(Long notifiedUserEventId);

    void increaseMentionsCount(Long notifiedUserEventId);

    void resetNotificationCount(Long notifiedUserEventId);

    void resetMentionCount(Long notifiedUserEventId);

    void processSubscriberNotificationListener(TweetSubscriberNotificationEvent event);
}
