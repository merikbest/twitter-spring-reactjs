package com.gmail.merikbest2015.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "pinned_lists")
public class PinnedList {

    @EmbeddedId
    private ListUserId listUserId;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("listId")
    @JoinColumn(name = "list_id", nullable = false)
    private Lists lists;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("pinnedUserId")
    @JoinColumn(name = "pinned_user_id", nullable = false)
    private User pinnedUser;

    @Column(name = "pinned_date", columnDefinition = "timestamp default current_timestamp")
    private LocalDateTime pinnedDate = LocalDateTime.now();

    public PinnedList(Lists lists, User pinnedUser) {
        this.listUserId = new ListUserId(lists.getId(), pinnedUser.getId());
        this.lists = lists;
        this.pinnedUser = pinnedUser;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Embeddable
    public static class ListUserId implements Serializable {

        @Column(name = "list_id", nullable = false)
        private Long listId;

        @Column(name = "pinned_user_id", nullable = false)
        private Long pinnedUserId;
    }
}
