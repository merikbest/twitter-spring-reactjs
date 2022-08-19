package com.gmail.merikbest2015.twitterspringreactjs.repository;

import com.gmail.merikbest2015.twitterspringreactjs.model.Notification;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.notification.NotificationInfoProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.notification.NotificationProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query("SELECT n as notification FROM User u " +
            "LEFT JOIN u.notifications n " +
            "WHERE u.id = :userId " +
            "AND n.notificationType != 'TWEET' " +
            "ORDER BY n.date DESC")
    Page<NotificationProjection> getNotificationsByUserId(Long userId, Pageable pageable);

    @Query("SELECT n.id AS id, n.date AS date, n.notificationType AS notificationType, n.user AS user, n.tweet AS tweet " +
            "FROM User u " +
            "LEFT JOIN u.notifications n " +
            "WHERE u.id = :userId " +
            "AND n.id = :notificationId")
    Optional<NotificationInfoProjection> getUserNotificationById(Long userId, Long notificationId);
}
