package com.gmail.merikbest2015.twitterspringreactjs.dto.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class RegistrationRequest {

    @Email(regexp = ".+@.+\\..+", message = "Please enter a valid email address.")
    private String email;

    @NotBlank(message = "What’s your name?")
    @Size(min = 1, max = 50, message = "Please enter a valid name.")
    private String username;

//    @NotBlank(message = "Password confirmation cannot be empty.")
//    @Size(min = 8, message = "Your password needs to be at least 8 characters. Please enter a longer one.")
//    private String password;

    private String birthday;
}
