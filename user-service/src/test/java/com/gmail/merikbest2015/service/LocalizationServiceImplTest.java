package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.model.CountryCode;
import com.gmail.merikbest2015.model.Language;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class LocalizationServiceImplTest extends AbstractServiceTest {

    @Autowired
    private LocalizationService localizationService;

    @Test
    public void getCountryCodes_ShouldReturnCountryCodes() {
        List<CountryCode> countryCodes = List.of(new CountryCode(), new CountryCode());
        when(countryCodeRepository.findAll()).thenReturn(countryCodes);
        assertEquals(countryCodes, localizationService.getCountryCodes());
        verify(countryCodeRepository, times(1)).findAll();
    }

    @Test
    public void getLanguages_ShouldReturnLanguages() {
        List<Language> languages = List.of(new Language(), new Language());
        when(languageRepository.findAll()).thenReturn(languages);
        assertEquals(languages, localizationService.getLanguages());
        verify(languageRepository, times(1)).findAll();
    }
}
