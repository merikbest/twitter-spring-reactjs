package com.gmail.merikbest2015.dto.request;

import com.gmail.merikbest2015.constants.Regexp;
import com.gmail.merikbest2015.constants.UserErrorMessage;
import lombok.Data;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Data
public class RegistrationRequest {

    @Email(regexp = Regexp.USER_EMAIL_REGEXP, message = UserErrorMessage.EMAIL_NOT_VALID)
    private String email;

    @NotBlank(message = UserErrorMessage.BLANK_NAME)
    @Size(min = 1, max = 50, message = UserErrorMessage.NAME_NOT_VALID)
    private String username;

    private String birthday;
}
