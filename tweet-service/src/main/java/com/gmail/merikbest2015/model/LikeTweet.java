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
@Table(name = "liked_tweets")
public class LikeTweet {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "liked_tweets_seq")
    @SequenceGenerator(name = "liked_tweets_seq", sequenceName = "liked_tweets_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @Column(name = "liked_tweet_date")
    private LocalDateTime likeTweetDate = LocalDateTime.now();

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
