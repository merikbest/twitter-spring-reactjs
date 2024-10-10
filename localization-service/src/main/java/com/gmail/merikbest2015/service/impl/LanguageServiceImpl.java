package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.model.Language;
import com.gmail.merikbest2015.repository.LanguageRepository;
import com.gmail.merikbest2015.service.LanguageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LanguageServiceImpl implements LanguageService {

    private final LanguageRepository languageRepository;

    @Override
    public List<Language> getLanguages() {
        return languageRepository.findAll();
    }
}
