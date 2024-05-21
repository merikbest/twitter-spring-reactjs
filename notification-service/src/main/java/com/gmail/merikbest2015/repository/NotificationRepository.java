package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.model.Notification;
import com.gmail.merikbest2015.repository.projection.NotificationInfoProjection;
import com.gmail.merikbest2015.repository.projection.NotificationProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query("""
            SELECT CASE WHEN count(notification) > 0 THEN true ELSE false END
            FROM Notification notification
            WHERE notification.notifiedUser.id = :notifiedUserId
            AND notification.user.id = :authUserId
            AND notification.notificationType = :notificationType
            AND (
                    (:notificationType IN ('TWEET', 'RETWEET', 'REPLY', 'LIKE') AND notification.tweet.id = :id) OR
                    (:notificationType = 'LISTS' AND notification.list.id = :id) OR
                    (:notificationType = 'FOLLOW' AND notification.userToFollow.id = :id)
                )
            """)
    boolean isNotificationExists(@Param("notifiedUserId") Long notifiedUserId,
                                 @Param("authUserId") Long authUserId,
                                 @Param("notificationType") NotificationType notificationType,
                                 @Param("id") Long id);

    @Query("""
            SELECT notification FROM Notification notification
            WHERE notification.notifiedUser.id = :userId
            AND notification.notificationType NOT IN ('TWEET', 'MENTION')
            ORDER BY notification.date DESC
            """)
    Page<NotificationProjection> getNotificationsByUserId(@Param("userId") Long userId, Pageable pageable);

    @Query("""
            SELECT notification.tweet.id FROM Notification notification
            WHERE notification.notifiedUser.id = :userId
            AND notification.notificationType = 'MENTION'
            ORDER BY notification.date DESC
            """)
    Page<Long> getTweetNotificationMentionIds(@Param("userId") Long userId, Pageable pageable);

    @Query("""
            SELECT notification.tweet.id FROM Notification notification
            WHERE notification.user.id IN :userIds
            AND notification.notificationType = 'TWEET'
            AND notification.notifiedUser.id = :userId
            """)
    Page<Long> getTweetIdsByNotificationType(@Param("userIds") List<Long> userIds,
                                             @Param("userId") Long userId,
                                             Pageable pageable);

    @Query("""
            SELECT notification FROM Notification notification
            WHERE notification.notifiedUser.id = :userId
            AND notification.id = :notificationId
            """)
    Optional<NotificationInfoProjection> getUserNotificationById(@Param("userId") Long userId,
                                                                 @Param("notificationId") Long notificationId);
}
