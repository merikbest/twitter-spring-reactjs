package com.gmail.merikbest2015.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(
        name = "poll_choice_voted",
        indexes = {
                @Index(name = "poll_choice_voted_voted_user_id_idx", columnList = "voted_user_id"),
                @Index(name = "poll_choice_voted_poll_choice_id_idx", columnList = "poll_choice_id"),
        })
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
