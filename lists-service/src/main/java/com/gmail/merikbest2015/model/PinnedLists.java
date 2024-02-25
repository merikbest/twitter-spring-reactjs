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
@Table(name = "pinned_lists_demo")
public class PinnedLists {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
