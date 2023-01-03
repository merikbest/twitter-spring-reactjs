package com.gmail.merikbest2015.commons.repository;

import com.gmail.merikbest2015.commons.projection.NotificationInfoProjection;
import com.gmail.merikbest2015.commons.projection.NotificationProjection;
import com.gmail.merikbest2015.commons.models.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query("SELECT notification FROM Notification notification " +
            "WHERE notification.notifiedUser.id = :userId " +
            "AND notification.notificationType != 'TWEET' " +
            "ORDER BY notification.date DESC")
    Page<NotificationProjection> getNotificationsByUserId(Long userId, Pageable pageable);

    @Query("SELECT n.id AS id, n.date AS date, n.notificationType AS notificationType, n.user AS user, n.tweet AS tweet " +
            "FROM User u " +
            "LEFT JOIN u.notifications n " +
            "WHERE u.id = :userId " +
            "AND n.id = :notificationId")
    Optional<NotificationInfoProjection> getUserNotificationById(Long userId, Long notificationId);
}
