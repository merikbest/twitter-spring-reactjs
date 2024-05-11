package com.gmail.merikbest2015.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "tweets")
public class Tweet {

    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "tweet_text", length = 1337, nullable = false)
    private String text;

    @OneToOne
    @JoinColumn(name = "author_id", nullable = false)
    private User author;
}
