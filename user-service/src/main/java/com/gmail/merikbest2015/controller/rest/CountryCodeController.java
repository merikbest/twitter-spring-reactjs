package com.gmail.merikbest2015.controller.rest;

import com.gmail.merikbest2015.dto.response.CountryCodeResponse;
import com.gmail.merikbest2015.mapper.CountryCodeMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.gmail.merikbest2015.constants.PathConstants.COUNTRY_CODES;
import static com.gmail.merikbest2015.constants.PathConstants.UI_V1_USER;

@RestController
@RequiredArgsConstructor
@RequestMapping(UI_V1_USER)
public class CountryCodeController {

    private final CountryCodeMapper countryCodeMapper;

    @GetMapping(COUNTRY_CODES)
    public ResponseEntity<List<CountryCodeResponse>> getCountryCodes() {
        return ResponseEntity.ok(countryCodeMapper.getCountryCodes());
    }
}
