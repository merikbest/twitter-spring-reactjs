package com.gmail.merikbest2015.twitterspringreactjs.dto.response;

import com.fasterxml.jackson.annotation.JsonView;
import com.gmail.merikbest2015.twitterspringreactjs.dto.Views;
import lombok.Data;

@Data
public class AuthenticationResponse {

    @JsonView(Views.User.class)
    private UserResponse user;

    @JsonView(Views.User.class)
    private String token;
}
