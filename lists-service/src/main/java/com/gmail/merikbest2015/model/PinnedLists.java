package com.gmail.merikbest2015.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(
        name = "pinned_lists",
        indexes = {
                @Index(name = "pinned_lists_list_id_idx", columnList = "list_id"),
                @Index(name = "pinned_lists_pinned_user_id_idx", columnList = "pinned_user_id")
        })
public class PinnedLists {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pinned_lists_seq")
    @SequenceGenerator(name = "pinned_lists_seq", sequenceName = "pinned_lists_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @Column(name = "pinned_date", columnDefinition = "timestamp default current_timestamp")
    private LocalDateTime pinnedDate = LocalDateTime.now();

    @NonNull
    @ManyToOne
    @JoinColumn(name = "list_id", nullable = false)
    private Lists list;

    @NonNull
    @Column(name = "pinned_user_id", nullable = false)
    private Long pinnedUserId;
}
