package com.gmail.merikbest2015.twitterspringreactjs.dto.response.poll;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.UserResponse;
import lombok.Data;

import java.util.List;

@Data
public class PollChoiceResponse {
    private Long id;
    private String choice;
    private List<UserResponse> votedUser;
}
