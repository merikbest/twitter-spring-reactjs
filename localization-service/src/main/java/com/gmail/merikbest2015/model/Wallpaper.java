package com.gmail.merikbest2015.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "wallpapers")
public class Wallpaper {
    private static final String LANGUAGES_SEQ = "wallpapers_seq";

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = LANGUAGES_SEQ)
    @SequenceGenerator(name = LANGUAGES_SEQ, sequenceName = LANGUAGES_SEQ, initialValue = 1000, allocationSize = 1)
    private Long id;

    @Column(name = "src", nullable = false)
    private String src;
}
