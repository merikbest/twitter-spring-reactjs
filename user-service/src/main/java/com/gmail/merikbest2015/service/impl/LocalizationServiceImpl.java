package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.model.CountryCode;
import com.gmail.merikbest2015.model.Language;
import com.gmail.merikbest2015.repository.CountryCodeRepository;
import com.gmail.merikbest2015.repository.LanguageRepository;
import com.gmail.merikbest2015.service.LocalizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LocalizationServiceImpl implements LocalizationService {

    private final CountryCodeRepository countryCodeRepository;
    private final LanguageRepository languageRepository;

    @Override
    public List<CountryCode> getCountryCodes() {
        return countryCodeRepository.findAll();
    }

    @Override
    public List<Language> getLanguages() {
        return languageRepository.findAll();
    }
}
