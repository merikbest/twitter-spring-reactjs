package com.gmail.merikbest2015.twitterspringreactjs.dto.response.lists;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ImageProjectionResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ListMemberProjectionResponse {
    private Long id;
    private String fullName;
    private String username;
    private String about;
    private ImageProjectionResponse avatar;
}
