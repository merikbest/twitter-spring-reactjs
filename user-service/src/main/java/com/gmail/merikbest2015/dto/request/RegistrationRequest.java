package com.gmail.merikbest2015.dto.request;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class RegistrationRequest {

    @Email(regexp = ".+@.+\\..+", message = "Please enter a valid email address.")
    private String email;

    @NotBlank(message = "What’s your name?")
    @Size(min = 1, max = 50, message = "Please enter a valid name.")
    private String username;

    private String birthday;
}
