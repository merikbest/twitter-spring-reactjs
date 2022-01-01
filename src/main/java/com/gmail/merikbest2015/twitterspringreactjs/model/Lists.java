package com.gmail.merikbest2015.twitterspringreactjs.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@EqualsAndHashCode(of = {"id"})
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

    @OneToOne
    @JoinColumn(name = "user_id")
    private User listOwner;

    @ManyToMany
    private Set<Tweet> tweets;

    @ManyToMany
    private Set<User> members;

    @ManyToMany
    private Set<User> followers;

    public Lists() {
        this.tweets = new HashSet<>();
        this.members = new HashSet<>();
        this.followers = new HashSet<>();
    }
}
