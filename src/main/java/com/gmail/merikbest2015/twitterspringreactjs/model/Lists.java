package com.gmail.merikbest2015.twitterspringreactjs.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "lists")
public class Lists {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "private")
    private boolean isPrivate;

    @Column(name = "pinned_date")
    private LocalDateTime pinnedDate;

    @Column(name = "alt_wallpaper")
    private String altWallpaper;

    @OneToOne
    @JoinColumn(name = "wallpaper_id")
    private Image wallpaper;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User listOwner;

    @ManyToMany
    private List<Tweet> tweets;

    @ManyToMany
    private List<User> members;

    @ManyToMany
    private List<User> followers;

    public Lists() {
        this.tweets = new ArrayList<>();
        this.members = new ArrayList<>();
        this.followers = new ArrayList<>();
    }
}
