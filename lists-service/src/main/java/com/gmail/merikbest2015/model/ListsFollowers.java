package com.gmail.merikbest2015.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "lists_followers_demo")
public class ListsFollowers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Column(name = "list_id", nullable = false)
    private Long listId;

    @NonNull
    @Column(name = "follower_id", nullable = false)
    private Long followerId;
}
