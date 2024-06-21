package com.gmail.merikbest2015.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "country_codes")
public class CountryCode {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "country_codes_seq")
    @SequenceGenerator(name = "country_codes_seq", sequenceName = "country_codes_seq", initialValue = 1000, allocationSize = 1)
    private Long id;

    @Column(name = "country_code", nullable = false)
    private String countryCode;

    @Column(name = "phone_code", nullable = false)
    private String phoneCode;

    @Column(name = "country", nullable = false)
    private String country;
}
