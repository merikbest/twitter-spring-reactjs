package com.gmail.merikbest2015.twitterspringreactjs.repository;

import com.gmail.merikbest2015.twitterspringreactjs.model.Notification;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.NotificationProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query("SELECT notification as notification FROM User user " +
            "LEFT JOIN user.notifications notification " +
            "WHERE user.id = :userId " +
            "AND notification.notificationType != 'TWEET' " +
            "ORDER BY notification.date DESC")
    List<NotificationProjection> getNotificationsByUserId(Long userId);
}
