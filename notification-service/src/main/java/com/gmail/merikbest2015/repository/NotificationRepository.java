package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.model.Notification;
import com.gmail.merikbest2015.repository.projection.NotificationProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

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

    @Query("SELECT notification FROM Notification notification " +
            "WHERE notification.notifiedUserId = :userId " +
            "AND notification.notificationType != 'TWEET' " +
            "ORDER BY notification.date DESC")
    Page<NotificationProjection> getNotificationsByUserId(@Param("userId") Long userId, Pageable pageable);

//    @Query("SELECT notification.tweet.user as tweetAuthor FROM User user " +
//            "LEFT JOIN user.notifications notification " +
//            "LEFT JOIN notification.tweet.user.subscribers subscriber " +
//            "WHERE user.id = :userId " +
//            "AND notification.notificationType = 'TWEET' " +
//            "AND subscriber.id = :userId ")
//    List<TweetAuthorsProjection> getNotificationsTweetAuthors(@Param("userId") Long userId);


    @Query("SELECT notification.tweetId FROM Notification notification " +
            "WHERE notification.userId = :userId " +
            "AND notification.notificationType = 'TWEET'")
    List<Long> getTweetIdsByNotificationType(@Param("userId") Long userId);

}
