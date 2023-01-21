package com.gmail.merikbest2015.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NonNull;
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
    private LocalDateTime retweetDate = LocalDateTime.now();

    @NonNull
    @Column(name = "tweet_id", nullable = false)
    private Long tweetId;

    @NonNull
    @Column(name = "user_id", nullable = false)
    private Long userId;
//    @ManyToOne
//    @JoinColumn(name = "users_id")
//    private User user;
//
//    @ManyToOne
//    @JoinColumn(name = "tweets_id")
//    private Tweet tweet;
}
