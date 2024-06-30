package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.dto.response.CountryCodeResponse;
import com.gmail.merikbest2015.model.CountryCode;
import com.gmail.merikbest2015.service.LocalizationService;
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
public class LocalizationMapperTest {

    @InjectMocks
    private LocalizationMapper countryCodeMapper;

    @Mock
    private LocalizationService localizationService;

    @Mock
    private BasicMapper basicMapper;

    @Test
    public void getCountryCodes() {
        List<CountryCode> countryCodes = List.of(new CountryCode(), new CountryCode());
        List<CountryCodeResponse> countryCodeResponses = List.of(new CountryCodeResponse(), new CountryCodeResponse());
        when(localizationService.getCountryCodes()).thenReturn(countryCodes);
        when(basicMapper.convertToResponseList(countryCodes, CountryCodeResponse.class)).thenReturn(countryCodeResponses);
        assertEquals(countryCodeResponses, countryCodeMapper.getCountryCodes());
        verify(localizationService, times(1)).getCountryCodes();
        verify(basicMapper, times(1)).convertToResponseList(countryCodes, CountryCodeResponse.class);
    }
}
