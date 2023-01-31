package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.repository.NotificationRepository;
import com.gmail.merikbest2015.repository.projection.NotificationProjection;
import com.gmail.merikbest2015.service.NotificationService;
import com.gmail.merikbest2015.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserClient userClient;

    @Override
    @Transactional
    public Page<NotificationProjection> getUserNotifications(Pageable pageable) {
        Long userId = AuthUtil.getAuthenticatedUserId();
//        user.setNotificationsCount(0L);
        return notificationRepository.getNotificationsByUserId(userId, pageable);
    }

    @Override
    @Transactional
    public void getTweetAuthorsNotifications() {
        Long userId = AuthUtil.getAuthenticatedUserId();
//        List<Long> tweetIds = notificationRepository.getTweetIdsByNotificationType(userId);
//        user.setNotificationsCount(0L);

        // get subscribers ids
        //

//        return userRepository.getNotificationsTweetAuthors(user.getId());
    }
}
