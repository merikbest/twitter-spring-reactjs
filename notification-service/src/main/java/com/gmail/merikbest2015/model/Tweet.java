package com.gmail.merikbest2015.model;

import com.gmail.merikbest2015.enums.TweetType;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "tweets")
public class Tweet {

    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "tweet_text", length = 1337, nullable = false)
    private String text;

    @Enumerated(EnumType.STRING)
    @Column(name = "tweet_type", nullable = false, columnDefinition = "varchar(255) default 'TWEET'")
    private TweetType tweetType;

    @OneToOne
    @JoinColumn(name = "author_id", nullable = false)
    private User author;
}
