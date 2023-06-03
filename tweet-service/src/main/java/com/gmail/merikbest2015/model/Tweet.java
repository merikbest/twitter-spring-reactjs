package com.gmail.merikbest2015.model;

import com.gmail.merikbest2015.enums.LinkCoverSize;
import com.gmail.merikbest2015.enums.ReplyType;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = {"id", "authorId"})
@Table(name = "tweets", indexes = @Index(name = "tweets_author_id_idx", columnList = "author_id"))
public class Tweet {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tweets_seq")
    @SequenceGenerator(name = "tweets_seq", sequenceName = "tweets_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @Column(name = "text", length = 1337, nullable = false)
    private String text;

    @Column(name = "date_time", columnDefinition = "timestamp default current_timestamp")
    private LocalDateTime dateTime = LocalDateTime.now();

    @Column(name = "scheduled_date")
    private LocalDateTime scheduledDate;

    @Column(name = "addressed_username")
    private String addressedUsername;

    @Column(name = "addressed_id")
    private Long addressedId;

    @Column(name = "addressed_tweet_id")
    private Long addressedTweetId;

    @Column(name = "reply_type", columnDefinition = "varchar(255) default 'EVERYONE'")
    @Enumerated(EnumType.STRING)
    private ReplyType replyType = ReplyType.EVERYONE;

    @Column(name = "link")
    private String link;

    @Column(name = "link_title")
    private String linkTitle;

    @Column(name = "link_description")
    private String linkDescription;

    @Column(name = "link_cover")
    private String linkCover;

    @Column(name = "link_cover_size")
    @Enumerated(EnumType.STRING)
    private LinkCoverSize linkCoverSize;

    @Column(name = "deleted", columnDefinition = "boolean default false")
    private boolean deleted = false;

    @Column(name = "author_id", nullable = false)
    private Long authorId;

    @Column(name = "list_id")
    private Long listId;

    @Column(name = "image_description")
    private String imageDescription;

    @OneToMany
    private List<TweetImage> images = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "tagged_image_users", joinColumns = @JoinColumn(name = "tweet_id"))
    @Column(name = "tagged_image_user_id")
    private List<Long> taggedImageUsers;

    @OneToOne
    @JoinTable(name = "tweet_quote",
            joinColumns = @JoinColumn(name = "tweet_id"),
            inverseJoinColumns = @JoinColumn(name = "quote_tweet_id"))
    private Tweet quoteTweet;

    @OneToOne
    @JoinColumn(name = "poll_id")
    private Poll poll;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "gif_image_id")
    private GifImage gifImage;

    @ManyToMany
    @JoinTable(name = "replies",
            joinColumns = @JoinColumn(name = "tweet_id"),
            inverseJoinColumns = @JoinColumn(name = "reply_id"))
    private List<Tweet> replies;

    @OneToMany
    @JoinTable(name = "quotes",
            joinColumns = @JoinColumn(name = "tweet_id"),
            inverseJoinColumns = @JoinColumn(name = "quote_id"))
    private List<Tweet> quotes;
}
