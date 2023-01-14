package com.gmail.merikbest2015.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@RequiredArgsConstructor
@Table(name = "tweet_tags")
public class TweetTag {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tweet_tags_seq")
    @SequenceGenerator(name = "tweet_tags_seq", sequenceName = "tweet_tags_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @NonNull
    @Column(name = "tag_id", nullable = false)
    private Long tagId;

    @NonNull
    @Column(name = "tweet_id", nullable = false)
    private Long tweetId;
}
