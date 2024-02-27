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
@Table(name = "lists")
public class Lists {
    private static final String LISTS_SEQ = "lists_seq";

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = LISTS_SEQ)
    @SequenceGenerator(name = LISTS_SEQ, sequenceName = LISTS_SEQ, initialValue = 100, allocationSize = 1)
    private Long id;

    @Column(name = "list_name", nullable = false)
    private String listName;

    @Column(name = "description")
    private String description;

    @Column(name = "private", columnDefinition = "boolean default false")
    private boolean isPrivate = false;

    @Column(name = "alt_wallpaper")
    private String altWallpaper;

    @Column(name = "wallpaper")
    private String wallpaper;

    @OneToOne
    @JoinColumn(name = "list_owner_id", nullable = false)
    private User listOwner;

    @ManyToMany
    @JoinTable(name = "lists_followers",
            joinColumns = @JoinColumn(name = "list_id"),
            inverseJoinColumns = @JoinColumn(name = "follower_id"))
    private Set<User> listsFollowers = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "lists_members",
            joinColumns = @JoinColumn(name = "list_id"),
            inverseJoinColumns = @JoinColumn(name = "member_id"))
    private Set<User> listsMembers = new HashSet<>();

    @OneToMany(mappedBy = "lists", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PinnedList> pinnedLists = new HashSet<>();
}
