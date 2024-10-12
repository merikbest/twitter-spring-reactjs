package com.gmail.merikbest2015.controller;

import com.gmail.merikbest2015.commons.constants.PathConstants;
import com.gmail.merikbest2015.dto.response.LanguagesResponse;
import com.gmail.merikbest2015.mapper.LanguageMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(PathConstants.UI_V1_LOCALIZATION)
public class LanguageController {

    private final LanguageMapper getGifImages;

    @GetMapping(PathConstants.LANGUAGES)
    public ResponseEntity<List<LanguagesResponse>> getLanguages() {
        return ResponseEntity.ok(getGifImages.getLanguages());
    }
}
