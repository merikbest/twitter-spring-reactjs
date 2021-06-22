package com.gmail.merikbest2015.twitterspringreactjs.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "tweets")
public class Tweet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String text;
    private String imageSrc;
    private LocalDateTime dateTime;

    @ManyToOne
    private User user;

    @OneToMany
    private List<Image> images;

    @ManyToMany
    @JoinTable(name = "tweet_likes",
            joinColumns = @JoinColumn(name = "tweets_id"),
            inverseJoinColumns = @JoinColumn(name = "users_id"))
    private List<User> likes;

    public Tweet() {
        this.dateTime = LocalDateTime.now().withNano(0);
    }
}
