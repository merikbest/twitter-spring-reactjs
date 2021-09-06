package com.gmail.merikbest2015.twitterspringreactjs.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "tweets")
public class Tweet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "text", length = 1337, columnDefinition = "text")
    private String text;

    @Column(name = "date_time")
    private LocalDateTime dateTime;

    @Column(name = "addressed_username")
    private String addressedUsername;

    @Column(name = "addressed_id")
    private Long addressedId;

    @Column(name = "addressed_tweet_id")
    private Long addressedTweetId;

    @Column(name = "reply_type")
    @Enumerated(EnumType.STRING)
    private ReplyType replyType;

    @OneToOne
    private Tweet quoteTweet;

    @OneToOne
    private Poll poll;

    @ManyToOne
    private User user;

    @OneToMany
    private List<Image> images;

    @OneToMany(mappedBy = "tweet")
    private List<LikeTweet> likedTweets;

    @OneToMany(mappedBy = "tweet")
    private List<Retweet> retweets;

    @ManyToMany
    @JoinTable(name = "replies",
            joinColumns = @JoinColumn(name = "tweets_id"),
            inverseJoinColumns = @JoinColumn(name = "reply_id"))
    private List<Tweet> replies;

    public Tweet() {
        this.dateTime = LocalDateTime.now().withNano(0);
        this.likedTweets = new ArrayList<>();
        this.retweets = new ArrayList<>();
    }
}
