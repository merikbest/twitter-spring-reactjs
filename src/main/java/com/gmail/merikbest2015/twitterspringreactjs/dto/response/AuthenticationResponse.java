package com.gmail.merikbest2015.twitterspringreactjs.dto.response;

import lombok.Data;

@Data
public class AuthenticationResponse {
    private UserResponse user;
    private String token;
}
