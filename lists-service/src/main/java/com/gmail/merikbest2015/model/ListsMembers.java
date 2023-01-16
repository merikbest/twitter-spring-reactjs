package com.gmail.merikbest2015.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@RequiredArgsConstructor
@Table(name = "lists_members")
public class ListsMembers {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "lists_members_seq")
    @SequenceGenerator(name = "lists_members_seq", sequenceName = "lists_members_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @NonNull
    @Column(name = "list_id", nullable = false)
    private Long listId;

    @NonNull
    @Column(name = "member_id", nullable = false)
    private Long memberId;
}
