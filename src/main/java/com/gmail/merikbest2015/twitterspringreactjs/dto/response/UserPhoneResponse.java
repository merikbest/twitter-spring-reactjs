package com.gmail.merikbest2015.twitterspringreactjs.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserPhoneResponse {
    private String countryCode;
    private Long phone;
}
