package com.gmail.merikbest2015.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
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

    @Column(name = "alt_wallpaper")
    private String altWallpaper;

    @OneToMany(mappedBy = "list")
    private List<PinnedLists> pinnedLists;

    @OneToOne
    @JoinColumn(name = "wallpaper_id")
    private ListsWallpaper wallpaper;

    @Column(name = "list_owner_id")
    private Long listOwnerId;
}
