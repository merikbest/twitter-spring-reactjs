package com.gmail.merikbest2015.dto.request;

import com.gmail.merikbest2015.constants.UserErrorMessage;
import lombok.Data;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Data
public class CurrentPasswordResetRequest {
    
    @NotBlank(message = UserErrorMessage.EMPTY_CURRENT_PASSWORD)
    private String currentPassword;
    
    @NotBlank(message = UserErrorMessage.EMPTY_PASSWORD)
    @Size(min = 8, message = UserErrorMessage.SHORT_PASSWORD)
    private String password;
    
    @NotBlank(message = UserErrorMessage.EMPTY_PASSWORD_CONFIRMATION)
    @Size(min = 8, message = UserErrorMessage.SHORT_PASSWORD)
    private String password2;
}
