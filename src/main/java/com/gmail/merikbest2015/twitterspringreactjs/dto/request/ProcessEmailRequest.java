package com.gmail.merikbest2015.twitterspringreactjs.dto.request;

import javax.validation.constraints.Email;

import lombok.Data;

@Data
public class ProcessEmailRequest {
    @Email(regexp = ".+@.+\\..+", message = "Please enter a valid email address.")
    private String email;
}
