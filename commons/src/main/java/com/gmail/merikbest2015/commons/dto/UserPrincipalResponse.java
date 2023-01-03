package com.gmail.merikbest2015.commons.dto;

import lombok.Data;

@Data
public class UserPrincipalResponse {
    private Long id;
    private String email;
    private String activationCode;
}
