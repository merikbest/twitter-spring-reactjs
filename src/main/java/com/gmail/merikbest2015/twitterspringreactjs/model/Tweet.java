package com.gmail.merikbest2015.twitterspringreactjs.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "tweets")
public class Tweet {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String text;
    private LocalDateTime dateTime;

    @ManyToOne
    private User user;

    public Tweet() {
        this.dateTime = LocalDateTime.now().withNano(0);
    }
}
