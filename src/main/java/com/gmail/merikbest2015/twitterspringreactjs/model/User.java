package com.gmail.merikbest2015.twitterspringreactjs.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String password;
    private String fullName;
    private String username;
    private String location;
    private String about;
    private String website;
    private String activationCode;
    private String passwordResetCode;
    private String role;
    private boolean active;

    @OneToMany
    private List<Tweet> tweets;

    @OneToOne
    @JoinColumn(name = "avatar_id")
    private Image avatar;

    @OneToOne
    @JoinColumn(name = "wallpaper_id")
    private Image wallpaper;

    @ManyToMany(mappedBy = "likes")
    private List<Tweet> likedTweets;
}
