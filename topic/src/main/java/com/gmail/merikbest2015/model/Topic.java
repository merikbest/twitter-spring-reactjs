package com.gmail.merikbest2015.model;

import com.gmail.merikbest2015.enums.TopicCategory;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@Table(name = "topics")
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "topics_seq")
    @SequenceGenerator(name = "topics_seq", sequenceName = "topics_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @Column(name = "topic_name")
    private String topicName;

    @Column(name = "topic_category")
    @Enumerated(EnumType.STRING)
    private TopicCategory topicCategory;

//    @ManyToMany
//    @JoinTable(name = "topic_followers",
//            joinColumns = @JoinColumn(name = "topic_id"),
//            inverseJoinColumns = @JoinColumn(name = "user_id"))
//    private List<User> topicFollowers;
//
//    @ManyToMany
//    @JoinTable(name = "topic_not_interested",
//            joinColumns = @JoinColumn(name = "topic_id"),
//            inverseJoinColumns = @JoinColumn(name = "user_id"))
//    private List<User> topicNotInterested;
}
