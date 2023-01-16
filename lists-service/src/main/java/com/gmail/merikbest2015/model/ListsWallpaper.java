package com.gmail.merikbest2015.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@Table(name = "lists_wallpaper")
public class ListsWallpaper {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "lists_wallpaper_seq")
    @SequenceGenerator(name = "lists_wallpaper_seq", sequenceName = "lists_wallpaper_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @Column(name = "src")
    private String src;
}
