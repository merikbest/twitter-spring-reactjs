package com.gmail.merikbest2015.model;

import com.gmail.merikbest2015.enums.LinkCoverSize;
import com.gmail.merikbest2015.enums.ReplyType;
import com.gmail.merikbest2015.enums.TweetType;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "tweets", indexes = @Index(name = "tweets_author_id_idx", columnList = "author_id"))
public class Tweet {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tweets_seq")
    @SequenceGenerator(name = "tweets_seq", sequenceName = "tweets_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @Column(name = "tweet_text", length = 1337, nullable = false)
    private String text;

    @Enumerated(EnumType.STRING)
    @Column(name = "tweet_type", nullable = false, columnDefinition = "varchar(255) default 'TWEET'")
    private TweetType tweetType = TweetType.TWEET;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "scheduled_date")
    private LocalDateTime scheduledDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "reply_type", nullable = false, columnDefinition = "varchar(255) default 'EVERYONE'")
    private ReplyType replyType = ReplyType.EVERYONE;

    @Column(name = "link")
    private String link;

    @Column(name = "link_title")
    private String linkTitle;

    @Column(name = "link_description")
    private String linkDescription;

    @Column(name = "link_cover")
    private String linkCover;

    @Enumerated(EnumType.STRING)
    @Column(name = "link_cover_size")
    private LinkCoverSize linkCoverSize;

    @Column(name = "deleted", nullable = false, columnDefinition = "boolean default false")
    private boolean deleted = false;

    @OneToOne
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    @Column(name = "list_id")
    private Long listId;

    @Column(name = "image_description")
    private String imageDescription;

    @Column(name = "retweets_count", nullable = false, columnDefinition = "int8 default 0")
    private Long retweetsCount = 0L;

    @Column(name = "replies_count", nullable = false, columnDefinition = "int8 default 0")
    private Long repliesCount = 0L;

    @Column(name = "likes_count", nullable = false, columnDefinition = "int8 default 0")
    private Long likesCount = 0L;

    @Column(name = "quotes_count", nullable = false, columnDefinition = "int8 default 0")
    private Long quotesCount = 0L;

    @OneToOne
    @JoinColumn(name = "addressed_user_id")
    private User addressedUser;

    @OneToOne
    @JoinColumn(name = "addressed_tweet_id")
    private Tweet addressedTweet;

    @OneToMany
    @JoinTable(name = "tweets_images",
            joinColumns = @JoinColumn(name = "tweet_id"),
            inverseJoinColumns = @JoinColumn(name = "image_id"))
    private Set<TweetImage> images = new HashSet<>();

    @OneToMany
    @JoinTable(name = "tagged_image_users",
            joinColumns = @JoinColumn(name = "tweet_id"),
            inverseJoinColumns = @JoinColumn(name = "tagged_image_user_id"))
    private Set<User> taggedImageUsers = new HashSet<>();

    @OneToOne
    @JoinTable(name = "tweet_quotes",
            joinColumns = @JoinColumn(name = "tweet_id"),
            inverseJoinColumns = @JoinColumn(name = "quote_tweet_id"))
    private Tweet quoteTweet;

    @OneToOne
    @JoinTable(name = "retweets",
            joinColumns = @JoinColumn(name = "tweet_id"),
            inverseJoinColumns = @JoinColumn(name = "retweet_id"))
    private Tweet retweet;

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
    private Set<Tweet> replies = new HashSet<>();

    @OneToMany
    @JoinTable(name = "quotes",
            joinColumns = @JoinColumn(name = "tweet_id"),
            inverseJoinColumns = @JoinColumn(name = "quote_id"))
    private Set<Tweet> quotes = new HashSet<>();
}
