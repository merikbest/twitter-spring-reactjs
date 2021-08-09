package com.gmail.merikbest2015.twitterspringreactjs.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "like_tweets")
public class LikeTweet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
