package com.gmail.merikbest2015.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "polls")
public class Poll {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "polls_seq")
    @SequenceGenerator(name = "polls_seq", sequenceName = "polls_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @NonNull
    @Column(name = "date_time", nullable = false)
    private LocalDateTime dateTime;

    @NonNull
    @OneToOne(mappedBy = "poll")
    private Tweet tweet;

    @NonNull
    @OneToMany
    private List<PollChoice> pollChoices;
}
