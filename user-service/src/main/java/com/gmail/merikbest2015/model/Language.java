package com.gmail.merikbest2015.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "languages")
public class Language {
    private static final String LANGUAGES_SEQ = "languages_seq";

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = LANGUAGES_SEQ)
    @SequenceGenerator(name = LANGUAGES_SEQ, sequenceName = LANGUAGES_SEQ, initialValue = 1000, allocationSize = 1)
    private Long id;

    @Column(name = "language", nullable = false)
    private String language;
}
