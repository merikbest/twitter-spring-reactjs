package com.gmail.merikbest2015.twitterspringreactjs.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@Table(name = "lists")
public class Lists {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "lists_seq")
    @SequenceGenerator(name = "lists_seq", sequenceName = "lists_seq", initialValue = 100, allocationSize = 1)
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
