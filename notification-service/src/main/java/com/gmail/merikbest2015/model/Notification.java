package com.gmail.merikbest2015.model;

import com.gmail.merikbest2015.enums.NotificationType;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

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

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private LocalDateTime date;

    @Enumerated(EnumType.STRING)
    @Column(name = "notification_type", nullable = false)
    private NotificationType notificationType;

    @OneToOne
    @JoinColumn(name = "notified_user_id", nullable = false)
    private User notifiedUser;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToOne
    @JoinColumn(name = "user_to_follow_id")
    private User userToFollow;

    @OneToOne
    @JoinColumn(name = "tweet_id")
    private Tweet tweet;

    @OneToOne
    @JoinColumn(name = "list_id")
    private Lists list;
}
