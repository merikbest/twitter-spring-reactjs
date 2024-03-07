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
        name = "bookmarks",
        indexes = {
                @Index(name = "bookmarks_user_id_idx", columnList = "user_id"),
                @Index(name = "bookmarks_tweet_id_idx", columnList = "tweet_id"),
        })
public class Bookmark {

    @EmbeddedId
    private TweetUserId tweetUserId;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @MapsId("tweetId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tweet_id", nullable = false)
    private Tweet tweet;

    @Column(name = "bookmark_date", columnDefinition = "timestamp default current_timestamp")
    private LocalDateTime bookmarkDate = LocalDateTime.now();

    public Bookmark(User user, Tweet tweet) {
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
