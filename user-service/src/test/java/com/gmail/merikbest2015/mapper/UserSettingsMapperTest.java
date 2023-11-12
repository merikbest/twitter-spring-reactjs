package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.dto.request.SettingsRequest;
import com.gmail.merikbest2015.dto.response.UserPhoneResponse;
import com.gmail.merikbest2015.service.UserSettingsService;
import com.gmail.merikbest2015.util.AbstractAuthTest;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class UserSettingsMapperTest extends AbstractAuthTest {

    @Autowired
    private UserSettingsMapper userSettingsMapper;

    @MockBean
    private AuthenticationMapper authenticationMapper;

    @MockBean
    private UserSettingsService userSettingsService;

    @Test
    public void updateUsername() {
        SettingsRequest request = new SettingsRequest();
        request.setUsername(TestConstants.USERNAME);
        when(userSettingsService.updateUsername(TestConstants.USERNAME)).thenReturn(TestConstants.USERNAME);
        assertEquals(TestConstants.USERNAME, userSettingsMapper.updateUsername(request));
        verify(userSettingsService, times(1)).updateUsername(TestConstants.USERNAME);
    }

    @Test
    public void updatePhone() {
        SettingsRequest request = new SettingsRequest();
        request.setCountryCode(TestConstants.COUNTRY_CODE);
        request.setPhone(TestConstants.PHONE);
        Map<String, Object> phoneParams = new HashMap<>();
        phoneParams.put("countryCode", TestConstants.COUNTRY_CODE);
        phoneParams.put("phone", TestConstants.PHONE);
        UserPhoneResponse userPhoneResponse = new UserPhoneResponse(TestConstants.COUNTRY_CODE, TestConstants.PHONE);
        when(userSettingsService.updatePhone(TestConstants.COUNTRY_CODE, TestConstants.PHONE)).thenReturn(phoneParams);
        assertEquals(userPhoneResponse, userSettingsMapper.updatePhone(request));
        verify(userSettingsService, times(1)).updatePhone(TestConstants.COUNTRY_CODE, TestConstants.PHONE);
    }

    @Test
    public void updateCountry() {
        SettingsRequest request = new SettingsRequest();
        request.setCountryCode(TestConstants.COUNTRY);
        when(userSettingsService.updateCountry(TestConstants.COUNTRY)).thenReturn(TestConstants.COUNTRY);
        assertEquals(TestConstants.COUNTRY, userSettingsMapper.updateCountry(request));
        verify(userSettingsService, times(1)).updateCountry(TestConstants.COUNTRY);

    }
}
