package com.gmail.merikbest2015.dto.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import static com.gmail.merikbest2015.constants.ErrorMessage.*;

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
