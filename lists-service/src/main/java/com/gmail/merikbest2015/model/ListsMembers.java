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
        name = "lists_members",
        indexes = {
                @Index(name = "lists_members_list_id_idx", columnList = "list_id"),
                @Index(name = "lists_members_member_id_idx", columnList = "member_id")
        })
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
