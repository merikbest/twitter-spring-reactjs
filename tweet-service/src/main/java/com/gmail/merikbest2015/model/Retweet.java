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
        name = "retweets",
        indexes = {
                @Index(name = "retweets_user_id_idx", columnList = "user_id"),
                @Index(name = "retweets_tweet_id_idx", columnList = "tweet_id"),
        })
public class Retweet {

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

    @Column(name = "retweet_date", columnDefinition = "timestamp default current_timestamp")
    private LocalDateTime retweetDate = LocalDateTime.now();

    public Retweet(User user, Tweet tweet) {
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
