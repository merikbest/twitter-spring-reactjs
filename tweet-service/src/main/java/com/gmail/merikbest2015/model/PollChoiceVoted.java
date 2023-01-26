package com.gmail.merikbest2015.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@RequiredArgsConstructor
@Table(name = "poll_choice_voted")
public class PollChoiceVoted {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "poll_choice_voted_seq")
    @SequenceGenerator(name = "poll_choice_voted_seq", sequenceName = "poll_choice_voted_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @NonNull
    @Column(name = "voted_user_id", nullable = false)
    private Long votedUserId;

    @NonNull
    @Column(name = "poll_choice_id", nullable = false)
    private Long pollChoiceId;
}
