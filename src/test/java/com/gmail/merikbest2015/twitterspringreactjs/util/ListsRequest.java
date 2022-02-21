package com.gmail.merikbest2015.twitterspringreactjs.util;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.UserResponse;
import lombok.Data;

import java.util.List;

@Data
public class ListsRequest {
    private Long id;
    private List<UserResponse> members;
}
