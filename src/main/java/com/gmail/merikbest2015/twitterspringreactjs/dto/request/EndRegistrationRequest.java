package com.gmail.merikbest2015.twitterspringreactjs.dto.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class EndRegistrationRequest {
    
    @Email(regexp = ".+@.+\\..+", message = "Please enter a valid email address.")
    private String email;

    @NotBlank(message = "Password confirmation cannot be empty.")
    @Size(min = 8, message = "Your password needs to be at least 8 characters. Please enter a longer one.")
    private String password;
}
