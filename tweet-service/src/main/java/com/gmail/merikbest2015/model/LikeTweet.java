package com.gmail.merikbest2015.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(
        name = "liked_tweets",
        indexes = {
                @Index(name = "liked_tweets_user_id_idx", columnList = "user_id"),
                @Index(name = "liked_tweets_tweet_id_idx", columnList = "tweet_id"),
        })
public class LikeTweet {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "liked_tweets_seq")
    @SequenceGenerator(name = "liked_tweets_seq", sequenceName = "liked_tweets_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @Column(name = "liked_tweet_date", columnDefinition = "timestamp default current_timestamp")
    private LocalDateTime likeTweetDate = LocalDateTime.now();

    @NonNull
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @NonNull
    @Column(name = "tweet_id", nullable = false)
    private Long tweetId;
}
