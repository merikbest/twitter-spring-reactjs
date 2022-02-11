package com.gmail.merikbest2015.twitterspringreactjs.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@Table(name = "retweets")
public class Retweet {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "retweets_seq")
    @SequenceGenerator(name = "retweets_seq", sequenceName = "retweets_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @Column(name = "retweet_date")
    private LocalDateTime retweetDate;

    @ManyToOne
    @JoinColumn(name = "users_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "tweets_id")
    private Tweet tweet;

    public Retweet() {
        this.retweetDate = LocalDateTime.now().withNano(0);
    }
}
