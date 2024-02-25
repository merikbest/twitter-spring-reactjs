package com.gmail.merikbest2015.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "users")
public class User {

    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "about")
    private String about;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "private_profile", columnDefinition = "boolean default false")
    private boolean privateProfile;

    @Column(name = "active", columnDefinition = "boolean default false")
    private boolean active;

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

    @OneToMany(mappedBy = "pinnedUser")
    private Set<PinnedList> pinnedLists = new HashSet<>();
}
