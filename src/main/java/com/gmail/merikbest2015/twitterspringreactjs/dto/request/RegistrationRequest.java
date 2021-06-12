package com.gmail.merikbest2015.twitterspringreactjs.dto.request;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class RegistrationRequest {

    @Email(message = "Incorrect email")
    @NotBlank(message = "Email cannot be empty")
    private String email;

    @NotBlank(message = "Username cannot be empty")
    private String username;

    @NotBlank(message = "Full name cannot be empty")
    private String fullName;

    @Size(min = 6, max = 16, message = "The password must be between 6 and 16 characters long")
    private String password;

    @Size(min = 6, max = 16, message = "The password confirmation must be between 6 and 16 characters long")
    private String password2;
}
