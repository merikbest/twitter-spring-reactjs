package com.gmail.merikbest2015.controller.rest;

import com.gmail.merikbest2015.dto.response.CountryCodeResponse;
import com.gmail.merikbest2015.dto.response.LanguagesResponse;
import com.gmail.merikbest2015.mapper.LocalizationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.gmail.merikbest2015.constants.PathConstants.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(UI_V1_USER)
public class LocalizationController {

    private final LocalizationMapper localizationMapper;

    @GetMapping(COUNTRY_CODES)
    public ResponseEntity<List<CountryCodeResponse>> getCountryCodes() {
        return ResponseEntity.ok(localizationMapper.getCountryCodes());
    }

    @GetMapping(LANGUAGES)
    public ResponseEntity<List<LanguagesResponse>> getLanguages() {
        return ResponseEntity.ok(localizationMapper.getLanguages());
    }
}
