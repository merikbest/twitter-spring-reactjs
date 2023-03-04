package com.gmail.merikbest2015.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@RequiredArgsConstructor
@Table(name = "poll_choices")
public class PollChoice {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "poll_choices_seq")
    @SequenceGenerator(name = "poll_choices_seq", sequenceName = "poll_choices_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @NonNull
    @Column(name = "choice", nullable = false)
    private String choice;
}
