package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.commons.mapper.BasicMapper;
import com.gmail.merikbest2015.dto.response.LanguagesResponse;
import com.gmail.merikbest2015.model.Language;
import com.gmail.merikbest2015.service.LanguageService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(MockitoJUnitRunner.class)
public class LanguageMapperTest {

    @InjectMocks
    private LanguageMapper languageMapper;

    @Mock
    private LanguageService languageService;

    @Mock
    private BasicMapper basicMapper;

    @Test
    public void getLanguages() {
        List<Language> languages = List.of(new Language(), new Language());
        List<LanguagesResponse> languagesResponses = List.of(new LanguagesResponse(), new LanguagesResponse());
        when(languageService.getLanguages()).thenReturn(languages);
        when(basicMapper.convertToResponseList(languages, LanguagesResponse.class)).thenReturn(languagesResponses);
        assertEquals(languagesResponses, languageMapper.getLanguages());
        verify(languageService, times(1)).getLanguages();
        verify(basicMapper, times(1)).convertToResponseList(languages, LanguagesResponse.class);
    }
}
