package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.commons.mapper.BasicMapper;
import com.gmail.merikbest2015.dto.response.LanguagesResponse;
import com.gmail.merikbest2015.model.Language;
import com.gmail.merikbest2015.service.LanguageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class LanguageMapper {

    private final BasicMapper basicMapper;
    private final LanguageService languageService;

    public List<LanguagesResponse> getLanguages() {
        List<Language> languages = languageService.getLanguages();
        return basicMapper.convertToResponseList(languages, LanguagesResponse.class);
    }
}
