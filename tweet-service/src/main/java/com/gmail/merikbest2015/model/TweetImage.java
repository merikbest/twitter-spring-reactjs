package com.gmail.merikbest2015.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "tweet_images")
public class TweetImage {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tweet_image_seq")
    @SequenceGenerator(name = "tweet_image_seq", sequenceName = "tweet_image_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @NonNull
    @Column(name = "src", nullable = false)
    private String src;
}
