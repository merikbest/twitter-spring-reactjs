package com.gmail.merikbest2015.twitterspringreactjs.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@Table(name = "pool_choices")
public class PollChoice {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pool_choices_seq")
    @SequenceGenerator(name = "pool_choices_seq", sequenceName = "pool_choices_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @Column(name = "choice")
    private String choice;

    @ManyToMany
    private List<User> votedUser;

    public PollChoice() {
        this.votedUser = new ArrayList<>();
    }
}
