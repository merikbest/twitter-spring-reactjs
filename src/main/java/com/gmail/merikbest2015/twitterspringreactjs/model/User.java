package com.gmail.merikbest2015.twitterspringreactjs.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "username")
    private String username;

    @Column(name = "location")
    private String location;

    @Column(name = "about")
    private String about;

    @Column(name = "website")
    private String website;

    @Column(name = "birthday")
    private String birthday;

    @Column(name = "registration_date")
    private LocalDateTime registrationDate;

    @Column(name = "activation_code")
    private String activationCode;

    @Column(name = "password_reset_code")
    private String passwordResetCode;

    @Column(name = "role")
    private String role;

    @Column(name = "tweet_count", columnDefinition = "int default 0")
    private Long tweetCount;

    @Column(name = "active", columnDefinition = "boolean default false")
    private boolean active;

    @Column(name = "profile_customized", columnDefinition = "boolean default false")
    private boolean profileCustomized;

    @ManyToMany
    private List<Tweet> tweets;

    @OneToOne
    @JoinColumn(name = "avatar_id")
    private Image avatar;

    @OneToOne
    @JoinColumn(name = "wallpaper_id")
    private Image wallpaper;

    @ManyToMany(mappedBy = "likes")
    private List<Tweet> likedTweets;

    @ManyToMany
    @JoinTable(name = "user_subscriptions",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "subscriber_id"))
    private List<User> followers;

    @ManyToMany
    @JoinTable(name = "user_subscriptions",
            joinColumns = @JoinColumn(name = "subscriber_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> following;

    public User() {
        this.registrationDate = LocalDateTime.now().withNano(0);
    }
}
