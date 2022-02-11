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
@Table(name = "like_tweets")
public class LikeTweet {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "like_tweets_seq")
    @SequenceGenerator(name = "like_tweets_seq", sequenceName = "like_tweets_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @Column(name = "like_tweet_date")
    private LocalDateTime likeTweetDate;

    @ManyToOne
    @JoinColumn(name = "users_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "tweets_id")
    private Tweet tweet;

    public LikeTweet() {
        this.likeTweetDate = LocalDateTime.now().withNano(0);
    }
}
