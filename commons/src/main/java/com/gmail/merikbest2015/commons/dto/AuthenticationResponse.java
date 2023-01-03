package com.gmail.merikbest2015.commons.dto;

import lombok.Data;

@Data
public class AuthenticationResponse {
    private AuthUserResponse user;
    private String token;
}
