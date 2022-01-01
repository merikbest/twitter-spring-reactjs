package com.gmail.merikbest2015.twitterspringreactjs.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
@Table(name = "users")
@NamedEntityGraph(name = "user-entity-graph",
        attributeNodes = {
                @NamedAttributeNode("tweets"),
                @NamedAttributeNode("likedTweets"),
                @NamedAttributeNode("retweets"),
                @NamedAttributeNode("bookmarks"),
                @NamedAttributeNode("notifications"),
                @NamedAttributeNode("tweets"),
                @NamedAttributeNode("userLists"),
                @NamedAttributeNode("chats"),
                @NamedAttributeNode("userMutedList"),
                @NamedAttributeNode("userBlockedList"),
                @NamedAttributeNode("unreadMessages"),
                @NamedAttributeNode("followers"),
                @NamedAttributeNode("following"),
                @NamedAttributeNode("followerRequests"),
                @NamedAttributeNode("subscribers"),
                @NamedAttributeNode("tweets"),
        }
)
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
    @JsonBackReference
    private Set<Tweet> tweets;

    @OneToMany(mappedBy = "user")
    private Set<LikeTweet> likedTweets;

    @OneToMany(mappedBy = "user")
    private Set<Retweet> retweets;

    @OneToMany(mappedBy = "user")
    private Set<Bookmark> bookmarks;

    //    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @OneToMany
    private Set<Notification> notifications;

    @ManyToMany
    private Set<Lists> userLists;

    @OneToMany(mappedBy = "user")
    private Set<ChatParticipant> chats;

    @ManyToMany
    @JoinTable(name = "user_muted",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "muted_user_id"))
    private Set<User> userMutedList;

    @ManyToMany
    @JoinTable(name = "user_blocked",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "blocked_user_id"))
    private Set<User> userBlockedList;

    @ManyToMany
    @JoinTable(name = "unread_messages",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "chat_message_id"))
    private Set<ChatMessage> unreadMessages;

    @ManyToMany
    @JoinTable(name = "user_subscriptions",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "subscriber_id"))
    private Set<User> followers;

    @ManyToMany
    @JoinTable(name = "user_subscriptions",
            joinColumns = @JoinColumn(name = "subscriber_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> following;

    @ManyToMany
    @JoinTable(name = "user_follower_requests",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "follower_id"))
    private Set<User> followerRequests;

    @ManyToMany
    @JoinTable(name = "subscribers",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "subscriber_id"))
    private Set<User> subscribers;

    public User() {
        this.registrationDate = LocalDateTime.now().withNano(0);
        this.tweets = new HashSet<>();
        this.likedTweets = new HashSet<>();
        this.retweets = new HashSet<>();
        this.bookmarks = new HashSet<>();
        this.notifications = new HashSet<>();
        this.userLists = new HashSet<>();
        this.chats = new HashSet<>();
        this.userMutedList = new HashSet<>();
        this.userBlockedList = new HashSet<>();
        this.unreadMessages = new HashSet<>();
        this.followers = new HashSet<>();
        this.following = new HashSet<>();
        this.followerRequests = new HashSet<>();
        this.subscribers = new HashSet<>();
        this.backgroundColor = BackgroundColorType.DEFAULT;
        this.colorScheme = ColorSchemeType.BLUE;
    }
}
