package com.gmail.merikbest2015.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@Table(name = "pinned_lists")
public class PinnedLists {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pinned_lists_seq")
    @SequenceGenerator(name = "pinned_lists_seq", sequenceName = "pinned_lists_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @Column(name = "pinned_date")
    private LocalDateTime pinnedDate;

    @ManyToOne
    @JoinColumn(name = "list_id")
    private Lists list;

    @Column(name = "pinned_user_id")
    private Long pinnedUserId;
}
