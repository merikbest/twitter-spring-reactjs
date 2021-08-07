package com.gmail.merikbest2015.twitterspringreactjs.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "tags")
public class Tag {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tag_name")
    private String tagName;

    @Column(name = "tweets_quantity")
    private Long tweetsQuantity;

    @ManyToMany
    @JoinTable(name = "tweets_tags",
            joinColumns = @JoinColumn(name = "tags_id"),
            inverseJoinColumns = @JoinColumn(name = "tweets_id"))
    private List<Tweet> tweets;
}
