package com.gmail.merikbest2015.twitterspringreactjs.dto.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
public class UserToListsRequest {
    private Long userId;
    private List<ListsRequest> lists;

    @Getter
    @Setter
    public static class ListsRequest {
        private Long listId;
        private Boolean isMemberInList;
    }
}
