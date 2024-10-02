package com.gmail.merikbest2015.dto.request;

import com.gmail.merikbest2015.constants.Regexp;
import com.gmail.merikbest2015.constants.UserErrorMessage;
import lombok.Data;

import jakarta.validation.constraints.Email;

@Data
public class ProcessEmailRequest {
    @Email(regexp = Regexp.USER_EMAIL_REGEXP, message = UserErrorMessage.EMAIL_NOT_VALID)
    private String email;
}
