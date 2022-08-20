package com.gmail.merikbest2015.twitterspringreactjs.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

import com.gmail.merikbest2015.twitterspringreactjs.enums.NotificationType;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "notifications_seq")
    @SequenceGenerator(name = "notifications_seq", sequenceName = "notifications_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @Column(name = "date")
    private LocalDateTime date;

    @Column(name = "notification_type")
    @Enumerated(EnumType.STRING)
    private NotificationType notificationType;

    @ManyToOne
    @JoinColumn(name = "notified_user_id")
    private User notifiedUser;

    @OneToOne
    private User user;

    @OneToOne
    private User userToFollow;

    @OneToOne
    private Tweet tweet;

    @OneToOne
    private Lists list;

    public Notification() {
        this.date = LocalDateTime.now().withNano(0);
    }
}
