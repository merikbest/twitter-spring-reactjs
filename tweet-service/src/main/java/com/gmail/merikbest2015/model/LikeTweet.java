package com.gmail.merikbest2015.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(
        name = "liked_tweets",
        indexes = {
                @Index(name = "liked_tweets_user_id_idx", columnList = "user_id"),
                @Index(name = "liked_tweets_tweet_id_idx", columnList = "tweet_id"),
        })
public class LikeTweet {

    @EmbeddedId
    private TweetUserId tweetUserId;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @MapsId("tweetId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tweet_id", nullable = false)
    private Tweet tweet;

    @Column(name = "liked_tweet_date", columnDefinition = "timestamp default current_timestamp")
    private LocalDateTime likeTweetDate = LocalDateTime.now();

    public LikeTweet(User user, Tweet tweet) {
        this.tweetUserId = new TweetUserId(user.getId(), tweet.getId());
        this.user = user;
        this.tweet = tweet;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Embeddable
    public static class TweetUserId implements Serializable {

        @Column(name = "user_id", nullable = false)
        private Long userId;

        @Column(name = "tweet_id", nullable = false)
        private Long tweetId;
    }
}
