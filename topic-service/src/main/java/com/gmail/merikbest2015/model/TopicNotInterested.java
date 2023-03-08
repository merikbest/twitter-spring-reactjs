package com.gmail.merikbest2015.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "topic_not_interested")
public class TopicNotInterested {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "topic_not_interested_seq")
    @SequenceGenerator(name = "topic_not_interested_seq", sequenceName = "topic_not_interested_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @NonNull
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @NonNull
    @Column(name = "topic_id", nullable = false)
    private Long topicId;
}
