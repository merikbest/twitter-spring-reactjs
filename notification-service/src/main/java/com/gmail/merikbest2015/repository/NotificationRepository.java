package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query("SELECT CASE WHEN count(notification) > 0 THEN true ELSE false END FROM Notification notification " +
            "WHERE notification.notifiedUserId = :userId " +
            "AND notification.listId = :listId " +
            "AND notification.notificationType = :notificationType")
    boolean isListNotificationExists(@Param("userId") Long userId,
                                     @Param("listId") Long listId,
                                     @Param("notificationType") NotificationType type);

    @Query("SELECT CASE WHEN count(notification) > 0 THEN true ELSE false END FROM Notification notification " +
            "WHERE notification.notifiedUserId = :userId " +
            "AND notification.tweetId = :tweetId " +
            "AND notification.notificationType = :notificationType")
    boolean isTweetNotificationExists(@Param("userId") Long userId,
                                      @Param("tweetId") Long tweetId,
                                      @Param("notificationType") NotificationType type);
}
