package com.gmail.merikbest2015.commons.dto.response.user;

import lombok.Data;

@Data
public class UserPrincipalResponse {
    private Long id;
    private String email;
    private String activationCode;
}
