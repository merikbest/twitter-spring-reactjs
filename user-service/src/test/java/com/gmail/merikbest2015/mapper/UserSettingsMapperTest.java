package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.dto.request.SettingsRequest;
import com.gmail.merikbest2015.dto.response.UserPhoneResponse;
import com.gmail.merikbest2015.enums.BackgroundColorType;
import com.gmail.merikbest2015.enums.ColorSchemeType;
import com.gmail.merikbest2015.service.UserSettingsService;
import com.gmail.merikbest2015.util.AbstractAuthTest;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

public class UserSettingsMapperTest extends AbstractAuthTest {

    @Autowired
    private UserSettingsMapper userSettingsMapper;

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

    @Test
    public void updateGender() {
        SettingsRequest request = new SettingsRequest();
        request.setGender(TestConstants.GENDER);
        when(userSettingsService.updateGender(TestConstants.GENDER)).thenReturn(TestConstants.GENDER);
        assertEquals(TestConstants.GENDER, userSettingsMapper.updateGender(request));
        verify(userSettingsService, times(1)).updateGender(TestConstants.GENDER);
    }

    @Test
    public void updateLanguage() {
        SettingsRequest request = new SettingsRequest();
        request.setLanguage(TestConstants.LANGUAGE);
        when(userSettingsService.updateLanguage(TestConstants.LANGUAGE)).thenReturn(TestConstants.LANGUAGE);
        assertEquals(TestConstants.LANGUAGE, userSettingsMapper.updateLanguage(request));
        verify(userSettingsService, times(1)).updateLanguage(TestConstants.LANGUAGE);
    }

    @Test
    public void updateDirectMessageRequests() {
        SettingsRequest request = new SettingsRequest();
        request.setMutedDirectMessages(true);
        when(userSettingsService.updateDirectMessageRequests(true)).thenReturn(true);
        assertTrue(userSettingsMapper.updateDirectMessageRequests(request));
        verify(userSettingsService, times(1)).updateDirectMessageRequests(true);
    }

    @Test
    public void updatePrivateProfile() {
        SettingsRequest request = new SettingsRequest();
        request.setPrivateProfile(true);
        when(userSettingsService.updatePrivateProfile(true)).thenReturn(true);
        assertTrue(userSettingsMapper.updatePrivateProfile(request));
        verify(userSettingsService, times(1)).updatePrivateProfile(true);
    }

    @Test
    public void updateColorScheme() {
        SettingsRequest request = new SettingsRequest();
        request.setColorScheme(ColorSchemeType.BLUE);
        when(userSettingsService.updateColorScheme(ColorSchemeType.BLUE)).thenReturn(ColorSchemeType.BLUE);
        assertEquals(ColorSchemeType.BLUE, userSettingsMapper.updateColorScheme(request));
        verify(userSettingsService, times(1)).updateColorScheme(ColorSchemeType.BLUE);
    }

    @Test
    public void updateBackgroundColor() {
        SettingsRequest request = new SettingsRequest();
        request.setBackgroundColor(BackgroundColorType.DIM);
        when(userSettingsService.updateBackgroundColor(BackgroundColorType.DIM)).thenReturn(BackgroundColorType.DIM);
        assertEquals(BackgroundColorType.DIM, userSettingsMapper.updateBackgroundColor(request));
        verify(userSettingsService, times(1)).updateBackgroundColor(BackgroundColorType.DIM);
    }
}
