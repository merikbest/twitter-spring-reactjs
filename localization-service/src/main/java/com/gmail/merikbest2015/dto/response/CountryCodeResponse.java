package com.gmail.merikbest2015.dto.response;

import lombok.Data;

@Data
public class CountryCodeResponse {
    private Long id;
    private String countryCode;
    private String phoneCode;
    private String country;
}
