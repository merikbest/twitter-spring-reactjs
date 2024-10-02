package com.gmail.merikbest2015.controller.rest;

import com.gmail.merikbest2015.commons.constants.PathConstants;
import com.gmail.merikbest2015.dto.response.CountryCodeResponse;
import com.gmail.merikbest2015.dto.response.LanguagesResponse;
import com.gmail.merikbest2015.mapper.LocalizationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(PathConstants.UI_V1_USER)
public class LocalizationController {

    private final LocalizationMapper localizationMapper;

    @GetMapping(PathConstants.COUNTRY_CODES)
    public ResponseEntity<List<CountryCodeResponse>> getCountryCodes() {
        return ResponseEntity.ok(localizationMapper.getCountryCodes());
    }

    @GetMapping(PathConstants.LANGUAGES)
    public ResponseEntity<List<LanguagesResponse>> getLanguages() {
        return ResponseEntity.ok(localizationMapper.getLanguages());
    }
}
