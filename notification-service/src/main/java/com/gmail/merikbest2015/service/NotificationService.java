package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.repository.projection.NotificationProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface NotificationService {

    Page<NotificationProjection> getUserNotifications(Pageable pageable);

    void getTweetAuthorsNotifications();

}
