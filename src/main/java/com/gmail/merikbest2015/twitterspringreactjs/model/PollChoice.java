package com.gmail.merikbest2015.twitterspringreactjs.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "pool_choices")
public class PollChoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "choice")
    private String choice;

    @ManyToMany
    private List<User> votedUser;

    public PollChoice() {
        this.votedUser = new ArrayList<>();
    }
}
