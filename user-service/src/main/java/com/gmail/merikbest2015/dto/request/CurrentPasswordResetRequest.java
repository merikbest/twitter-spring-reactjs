package com.gmail.merikbest2015.dto.request;

import lombok.Data;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import static com.gmail.merikbest2015.commons.constants.ErrorMessage.*;

@Data
public class CurrentPasswordResetRequest {
    
    @NotBlank(message = EMPTY_CURRENT_PASSWORD)
    private String currentPassword;
    
    @NotBlank(message = EMPTY_PASSWORD)
    @Size(min = 8, message = SHORT_PASSWORD)
    private String password;
    
    @NotBlank(message = EMPTY_PASSWORD_CONFIRMATION)
    @Size(min = 8, message = SHORT_PASSWORD)
    private String password2;
}
