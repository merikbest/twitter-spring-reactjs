package com.gmail.merikbest2015.twitterspringreactjs.dto.request;

import lombok.Data;

@Data
public class AuthenticationRequest {
    private String email;
    private String password;
}
