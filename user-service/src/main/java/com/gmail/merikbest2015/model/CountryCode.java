package com.gmail.merikbest2015.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "country_codes")
public class CountryCode {
    private static final String COUNTRY_CODES_SEQ = "country_codes_seq";

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = COUNTRY_CODES_SEQ)
    @SequenceGenerator(name = COUNTRY_CODES_SEQ, sequenceName = COUNTRY_CODES_SEQ, initialValue = 1000, allocationSize = 1)
    private Long id;

    @Column(name = "country_code", nullable = false)
    private String countryCode;

    @Column(name = "phone_code", nullable = false)
    private String phoneCode;

    @Column(name = "country", nullable = false)
    private String country;
}
