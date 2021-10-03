package com.gmail.merikbest2015.twitterspringreactjs.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "pools")
public class Poll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_time")
    private LocalDateTime dateTime;

    @OneToOne(mappedBy = "poll")
    private Tweet tweet;

    @OneToMany
    private List<PollChoice> pollChoices;
}
