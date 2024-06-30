package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.dto.response.CountryCodeResponse;
import com.gmail.merikbest2015.dto.response.LanguagesResponse;
import com.gmail.merikbest2015.model.CountryCode;
import com.gmail.merikbest2015.model.Language;
import com.gmail.merikbest2015.service.LocalizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class LocalizationMapper {

    private final BasicMapper basicMapper;
    private final LocalizationService countryCodeService;

    public List<CountryCodeResponse> getCountryCodes() {
        List<CountryCode> countryCodes = countryCodeService.getCountryCodes();
        return basicMapper.convertToResponseList(countryCodes, CountryCodeResponse.class);
    }

    public List<LanguagesResponse> getLanguages() {
        List<Language> languages = countryCodeService.getLanguages();
        return basicMapper.convertToResponseList(languages, LanguagesResponse.class);
    }
}
