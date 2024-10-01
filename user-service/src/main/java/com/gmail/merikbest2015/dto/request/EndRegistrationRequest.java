package com.gmail.merikbest2015.dto.request;

import com.gmail.merikbest2015.constants.UserErrorMessage;
import lombok.Data;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Data
public class EndRegistrationRequest {
    
    @Email(regexp = ".+@.+\\..+", message = UserErrorMessage.EMAIL_NOT_VALID)
    private String email;

    @NotBlank(message = UserErrorMessage.EMPTY_PASSWORD_CONFIRMATION)
    @Size(min = 8, message = UserErrorMessage.SHORT_PASSWORD)
    private String password;
}
