package com.gmail.merikbest2015.twitterspringreactjs.dto.response.lists;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ImageProjectionResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ListOwnerProjectionResponse {
    private Long id;
    private String fullName;
    private String username;
    private ImageProjectionResponse avatar;
}
