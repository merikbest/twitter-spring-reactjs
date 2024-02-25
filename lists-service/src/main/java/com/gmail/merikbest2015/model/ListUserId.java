package com.gmail.merikbest2015.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class ListUserId implements Serializable {

    @Column(name = "list_id", nullable = false)
    private Long listId;

    @Column(name = "pinned_user_id", nullable = false)
    private Long pinnedUserId;
}
