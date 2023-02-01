package com.gmail.merikbest2015.dto;

import lombok.Data;

@Data
public class UserPrincipalResponse {
    private Long id;
    private String email;
    private String activationCode;
}
