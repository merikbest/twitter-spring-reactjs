package com.gmail.merikbest2015.model;

import com.gmail.merikbest2015.enums.NotificationType;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "notifications_seq")
    @SequenceGenerator(name = "notifications_seq", sequenceName = "notifications_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @Column(name = "date", columnDefinition = "timestamp default current_timestamp")
    private LocalDateTime date = LocalDateTime.now();

    @Column(name = "notification_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private NotificationType notificationType;

    @Column(name = "notified_user_id", nullable = false)
    private Long notifiedUserId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "user_to_follow_id")
    private Long userToFollowId;

    @Column(name = "tweet_id")
    private Long tweetId;

    @Column(name = "list_id")
    private Long listId;
}
