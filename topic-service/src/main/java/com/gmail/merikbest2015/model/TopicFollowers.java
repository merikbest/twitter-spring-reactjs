package com.gmail.merikbest2015.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "topic_followers")
public class TopicFollowers {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "topic_followers_seq")
    @SequenceGenerator(name = "topic_followers_seq", sequenceName = "topic_followers_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @NonNull
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @NonNull
    @Column(name = "topic_id", nullable = false)
    private Long topicId;
}
