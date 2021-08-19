package com.gmail.merikbest2015.twitterspringreactjs.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "bookmarks")
public class Bookmark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "bookmark_date")
    private LocalDateTime bookmarkDate;

    @OneToOne
    private Tweet tweet;

    public Bookmark() {
        this.bookmarkDate = LocalDateTime.now().withNano(0);
    }
}
