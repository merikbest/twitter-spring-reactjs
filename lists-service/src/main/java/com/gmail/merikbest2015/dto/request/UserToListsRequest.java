package com.gmail.merikbest2015.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
public class UserToListsRequest {
    private Long userId;
    private List<ListsRequest> lists;

    @Data
    @AllArgsConstructor
    public static class ListsRequest {
        private Long listId;
        private Boolean isMemberInList;
    }
}
