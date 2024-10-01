package com.gmail.merikbest2015.dto.request;

import com.gmail.merikbest2015.constants.UserErrorMessage;
import lombok.Data;

import jakarta.validation.constraints.Email;

@Data
public class ProcessEmailRequest {
    @Email(regexp = ".+@.+\\..+", message = UserErrorMessage.EMAIL_NOT_VALID)
    private String email;
}
