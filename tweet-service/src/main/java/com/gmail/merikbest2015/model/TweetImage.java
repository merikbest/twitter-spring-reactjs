package com.gmail.merikbest2015.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@Table(name = "tweet_images")
public class TweetImage {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tweet_image_seq")
    @SequenceGenerator(name = "tweet_image_seq", sequenceName = "tweet_image_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @Column(name = "src")
    private String src;
}
