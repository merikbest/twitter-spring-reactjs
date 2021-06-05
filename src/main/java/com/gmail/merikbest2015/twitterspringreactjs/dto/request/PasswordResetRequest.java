package com.gmail.merikbest2015.twitterspringreactjs.dto.request;

import lombok.Data;

import javax.validation.constraints.Size;

@Data
public class PasswordResetRequest {
    private String email;

    @Size(min = 6, max = 16, message = "The password must be between 6 and 16 characters long")
    private String password;

    @Size(min = 6, max = 16, message = "The password confirmation must be between 6 and 16 characters long")
    private String password2;
}
