package com.gmail.merikbest2015.commons.models;

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
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name = "pinned_date")
    private LocalDateTime pinnedDate;

    @ManyToOne
    @JoinColumn(name = "list_id")
    private Lists list;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User pinnedUser;
}
