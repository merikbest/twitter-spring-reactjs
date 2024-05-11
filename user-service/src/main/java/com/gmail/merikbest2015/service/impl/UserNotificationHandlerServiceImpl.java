package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.repository.UserRepository;
import com.gmail.merikbest2015.service.UserNotificationHandlerService;
import com.gmail.merikbest2015.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserNotificationHandlerServiceImpl implements UserNotificationHandlerService {

    private final UserRepository userRepository;

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
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        userRepository.resetNotificationCount(authUserId);
    }

    @Override
    @Transactional
    public void resetMentionCount(Long notifiedUserEventId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        userRepository.resetMentionCount(authUserId);
    }
}
