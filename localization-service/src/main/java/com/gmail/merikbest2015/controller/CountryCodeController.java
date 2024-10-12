package com.gmail.merikbest2015.controller;

import com.gmail.merikbest2015.commons.constants.PathConstants;
import com.gmail.merikbest2015.dto.response.CountryCodeResponse;
import com.gmail.merikbest2015.mapper.CountryCodeMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(PathConstants.UI_V1_LOCALIZATION)
public class CountryCodeController {

    private final CountryCodeMapper countryCodeMapper;

    @GetMapping(PathConstants.COUNTRY_CODES)
    public ResponseEntity<List<CountryCodeResponse>> getCountryCodes() {
        return ResponseEntity.ok(countryCodeMapper.getCountryCodes());
    }
}
