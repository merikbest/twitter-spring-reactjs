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

    @Column(name = "country_code")
    private String countryCode;

    @Column(name = "phone")
    private Long phone;

    @Column(name = "country")
    private String country;

    @Column(name = "gender")
    private String gender;

    @Column(name = "language")
    private String language;

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

    @Column(name = "media_tweet_count", columnDefinition = "int default 0")
    private Long mediaTweetCount;

    @Column(name = "like_count", columnDefinition = "int default 0")
    private Long likeCount;

    @Column(name = "notifications_count", columnDefinition = "int default 0")
    private Long notificationsCount;

    @Column(name = "active", columnDefinition = "boolean default false")
    private boolean active;

    @Column(name = "profile_customized", columnDefinition = "boolean default false")
    private boolean profileCustomized;

    @Column(name = "profile_started", columnDefinition = "boolean default false")
    private boolean profileStarted;

    @Column(name = "muted_direct_messages", columnDefinition = "boolean default false")
    private boolean mutedDirectMessages;

    @Column(name = "private_profile", columnDefinition = "boolean default false")
    private boolean privateProfile;

    @Column(name = "background_color")
    @Enumerated(EnumType.STRING)
    private BackgroundColorType backgroundColor;

    @Column(name = "color_scheme")
    @Enumerated(EnumType.STRING)
    private ColorSchemeType colorScheme;

    @OneToOne
    @JoinTable(name = "user_pinned_tweet",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "tweet_id"))
    private Tweet pinnedTweet;

    @OneToOne
    @JoinColumn(name = "avatar_id")
    private Image avatar;

    @OneToOne
    @JoinColumn(name = "wallpaper_id")
    private Image wallpaper;

    @ManyToMany
    private List<Tweet> tweets;

    @OneToMany(mappedBy = "user")
    private List<LikeTweet> likedTweets;

    @OneToMany(mappedBy = "user")
    private List<Retweet> retweets;

    @OneToMany(mappedBy = "user")
    private List<Bookmark> bookmarks;

    @OneToMany
    private List<Notification> notifications;

    @ManyToMany
    private List<Lists> userLists;

    @ManyToMany(mappedBy = "participants")
    private List<Chat> chats;

    @OneToMany
    @JoinTable(name = "user_muted",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "muted_user_id"))
    private List<User> userMutedList;

    @OneToMany
    @JoinTable(name = "user_blocked",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "blocked_user_id"))
    private List<User> userBlockedList;

    @ManyToMany
    @JoinTable(name = "unread_messages",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "chat_message_id"))
    private List<ChatMessage> unreadMessages;

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

    @ManyToMany
    @JoinTable(name = "subscribers",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "subscriber_id"))
    private List<User> subscribers;

    public User() {
        this.registrationDate = LocalDateTime.now().withNano(0);
        this.bookmarks = new ArrayList<>();
        this.userLists = new ArrayList<>();
        this.unreadMessages = new ArrayList<>();
        this.backgroundColor = BackgroundColorType.DEFAULT;
        this.colorScheme = ColorSchemeType.BLUE;
    }
}
