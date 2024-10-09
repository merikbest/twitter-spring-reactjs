package com.gmail.merikbest2015.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "gif_images")
public class GifImage {
    private static final String COUNTRY_CODES_SEQ = "gif_images_seq";

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = COUNTRY_CODES_SEQ)
    @SequenceGenerator(name = COUNTRY_CODES_SEQ, sequenceName = COUNTRY_CODES_SEQ, initialValue = 1000, allocationSize = 1)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "src", nullable = false)
    private String src;
}
