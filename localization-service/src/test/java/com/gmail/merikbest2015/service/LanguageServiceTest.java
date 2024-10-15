package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.model.Language;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class LanguageServiceTest extends AbstractServiceTest {

    @Autowired
    private LanguageService languageService;

    @Test
    public void getLanguages_ShouldReturnLanguages() {
        List<Language> languages = List.of(new Language(), new Language());
        when(languageRepository.findAll()).thenReturn(languages);
        assertEquals(languages, languageService.getLanguages());
        verify(languageRepository, times(1)).findAll();
    }
}
