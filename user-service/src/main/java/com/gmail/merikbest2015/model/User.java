package com.gmail.merikbest2015.model;

import com.gmail.merikbest2015.enums.BackgroundColorType;
import com.gmail.merikbest2015.enums.ColorSchemeType;
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
@EqualsAndHashCode(of = {"id", "email"})
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "users_seq")
    @SequenceGenerator(name = "users_seq", sequenceName = "users_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "location")
    private String location;

    @Column(name = "about")
    private String about;

    @Column(name = "website")
    private String website;

    @Column(name = "country_code")
    private String countryCode;

    @Column(name = "country")
    private String country;

    @Column(name = "phone_code")
    private String phoneCode;

    @Column(name = "phone")
    private Long phone;

    @Column(name = "gender")
    private String gender;

    @Column(name = "language")
    private String language;

    @Column(name = "birthday")
    private String birthday;

    @CreationTimestamp
    @Column(name = "registration_date", nullable = false)
    private LocalDateTime registrationDate;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "activation_code")
    private String activationCode;

    @Column(name = "password_reset_code")
    private String passwordResetCode;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private UserRole role;

    @Column(name = "tweet_count", nullable = false, columnDefinition = "int8 default 0")
    private Long tweetCount = 0L;

    @Column(name = "media_tweet_count", nullable = false, columnDefinition = "int8 default 0")
    private Long mediaTweetCount = 0L;

    @Column(name = "like_count", nullable = false, columnDefinition = "int8 default 0")
    private Long likeCount = 0L;

    @Column(name = "notifications_count", nullable = false, columnDefinition = "int8 default 0")
    private Long notificationsCount = 0L;

    @Column(name = "mentions_count", nullable = false, columnDefinition = "int8 default 0")
    private Long mentionsCount = 0L;

    @Column(name = "followers_count", nullable = false, columnDefinition = "int8 default 0")
    private Long followersCount = 0L;

    @Column(name = "following_count", nullable = false, columnDefinition = "int8 default 0")
    private Long followingCount = 0L;

    @Column(name = "followers_requests_count", nullable = false, columnDefinition = "int8 default 0")
    private Long followerRequestsCount = 0L;

    @Column(name = "active", nullable = false, columnDefinition = "boolean default false")
    private boolean active = false;

    @Column(name = "profile_customized", nullable = false, columnDefinition = "boolean default false")
    private boolean profileCustomized = false;

    @Column(name = "profile_started", nullable = false, columnDefinition = "boolean default false")
    private boolean profileStarted = false;

    @Column(name = "muted_direct_messages", nullable = false, columnDefinition = "boolean default false")
    private boolean mutedDirectMessages = false;

    @Column(name = "private_profile", nullable = false, columnDefinition = "boolean default false")
    private boolean privateProfile = false;

    @Enumerated(EnumType.STRING)
    @Column(name = "background_color", nullable = false, columnDefinition = "varchar(255) default 'DEFAULT'")
    private BackgroundColorType backgroundColor= BackgroundColorType.DEFAULT;

    @Enumerated(EnumType.STRING)
    @Column(name = "color_scheme", nullable = false, columnDefinition = "varchar(255) default 'BLUE'")
    private ColorSchemeType colorScheme = ColorSchemeType.BLUE;

    @Column(name = "pinned_tweet_id")
    private Long pinnedTweetId;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "wallpaper")
    private String wallpaper;

    @Column(name = "unread_messages_count", nullable = false, columnDefinition = "int8 default 0")
    private Long unreadMessagesCount = 0L;

    @ManyToMany
    @JoinTable(name = "user_muted",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "muted_user_id"))
    private Set<User> userMutedList = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "user_blocked",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "blocked_user_id"))
    private Set<User> userBlockedList = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "user_subscriptions",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "subscriber_id"))
    private Set<User> followers = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "user_subscriptions",
            joinColumns = @JoinColumn(name = "subscriber_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> following = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "user_follower_requests",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "follower_id"))
    private Set<User> followerRequests = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "subscribers",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "subscriber_id"))
    private Set<User> subscribers = new HashSet<>();
}
