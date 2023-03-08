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
        name = "lists_followers",
        indexes = {
                @Index(name = "lists_followers_list_id_idx", columnList = "list_id"),
                @Index(name = "lists_followers_follower_id_idx", columnList = "follower_id")
        })
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
