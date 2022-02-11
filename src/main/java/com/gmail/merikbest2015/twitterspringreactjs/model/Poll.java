package com.gmail.merikbest2015.twitterspringreactjs.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@EqualsAndHashCode(exclude = "tweet")
@Table(name = "pools")
public class Poll {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pools_seq")
    @SequenceGenerator(name = "pools_seq", sequenceName = "pools_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @Column(name = "date_time")
    private LocalDateTime dateTime;

    @OneToOne(mappedBy = "poll")
    private Tweet tweet;

    @OneToMany
    private List<PollChoice> pollChoices;
}
