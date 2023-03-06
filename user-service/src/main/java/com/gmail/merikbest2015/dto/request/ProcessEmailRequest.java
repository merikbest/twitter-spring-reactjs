package com.gmail.merikbest2015.dto.request;

import lombok.Data;

import javax.validation.constraints.Email;

import static com.gmail.merikbest2015.constants.ErrorMessage.EMAIL_NOT_VALID;

@Data
public class ProcessEmailRequest {
    @Email(regexp = ".+@.+\\..+", message = EMAIL_NOT_VALID)
    private String email;
}
