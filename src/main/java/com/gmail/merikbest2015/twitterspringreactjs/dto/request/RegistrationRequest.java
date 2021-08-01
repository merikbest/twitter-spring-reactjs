package com.gmail.merikbest2015.twitterspringreactjs.dto.request;

import lombok.Data;

@Data
public class RegistrationRequest {
    private String email;
    private String username;
    private String birthday;
    private String password;
}
