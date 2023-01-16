package com.gmail.merikbest2015.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@RequiredArgsConstructor
@Table(name = "lists_followers")
public class ListsFollowers {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "lists_followers_seq")
    @SequenceGenerator(name = "lists_followers_seq", sequenceName = "lists_followers_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @NonNull
    @Column(name = "list_id", nullable = false)
    private Long listId;

    @NonNull
    @Column(name = "follower_id", nullable = false)
    private Long followerId;
}
