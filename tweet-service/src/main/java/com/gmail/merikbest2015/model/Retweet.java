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
        name = "retweets",
        indexes = {
                @Index(name = "retweets_user_id_idx", columnList = "user_id"),
                @Index(name = "retweets_tweet_id_idx", columnList = "tweet_id"),
        })
public class Retweet {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "retweets_seq")
    @SequenceGenerator(name = "retweets_seq", sequenceName = "retweets_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @Column(name = "retweet_date", columnDefinition = "timestamp default current_timestamp")
    private LocalDateTime retweetDate = LocalDateTime.now();

    @NonNull
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @NonNull
    @Column(name = "tweet_id", nullable = false)
    private Long tweetId;
}
