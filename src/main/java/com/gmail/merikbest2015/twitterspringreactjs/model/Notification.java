package com.gmail.merikbest2015.twitterspringreactjs.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date")
    private LocalDateTime date;

    @Column(name = "notification_type")
    @Enumerated(EnumType.STRING)
    private NotificationType notificationType;

    @OneToOne
    private User user;

    @OneToOne
    private User userToFollow;

    @OneToOne
    private Tweet tweet;

    public Notification() {
        this.date = LocalDateTime.now().withNano(0);
    }
}
