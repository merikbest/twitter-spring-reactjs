package com.gmail.merikbest2015.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@Table(name = "bookmarks")
public class Bookmark {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "bookmarks_seq")
    @SequenceGenerator(name = "bookmarks_seq", sequenceName = "bookmarks_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @Column(name = "bookmark_date")
    private LocalDateTime bookmarkDate = LocalDateTime.now();

    @NonNull
    @Column(name = "tweet_id", nullable = false)
    private Long tweetId;

    @NonNull
    @Column(name = "user_id", nullable = false)
    private Long userId;
//    @ManyToOne
//    @JoinColumn(name = "users_id")
//    private User user;

//    @OneToOne
//    private Tweet tweet;
}
