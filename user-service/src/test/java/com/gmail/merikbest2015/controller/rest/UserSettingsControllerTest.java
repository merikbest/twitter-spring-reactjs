package com.gmail.merikbest2015.controller.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.dto.request.SettingsRequest;
import com.gmail.merikbest2015.enums.BackgroundColorType;
import com.gmail.merikbest2015.enums.ColorSchemeType;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;

import static com.gmail.merikbest2015.constants.ErrorMessage.*;
import static com.gmail.merikbest2015.constants.PathConstants.*;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_METHOD;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Sql(value = {"/sql-test/clear-user-db.sql", "/sql-test/populate-user-db.sql"}, executionPhase = BEFORE_TEST_METHOD)
@Sql(value = {"/sql-test/clear-user-db.sql"}, executionPhase = AFTER_TEST_METHOD)
public class UserSettingsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @Test
    @DisplayName("[200] PUT /ui/v1/settings/update/username - Update username")
    public void updateUsername() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setUsername("test");
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + USERNAME)
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("test")));
    }

    @Test
    @DisplayName("[400] PUT /ui/v1/settings/update/username - Should username length is 0")
    public void updateUsername_ShouldUsernameLengthIs0() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setUsername("");
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + USERNAME)
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(INCORRECT_USERNAME_LENGTH)));
    }

    @Test
    @DisplayName("[400] PUT /ui/v1/settings/update/username - Should username length more than 50")
    public void updateUsername_ShouldUsernameLengthMoreThan50() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setUsername(TestConstants.LINK_DESCRIPTION);
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + USERNAME)
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(INCORRECT_USERNAME_LENGTH)));
    }

    @Test
    @DisplayName("[200] PUT /ui/v1/settings/update/email - Update email")
    public void updateEmail() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setEmail("test2013@test.test");
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + EMAIL)
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.user.id").value(TestConstants.USER_ID))
                .andExpect(jsonPath("$.user.email").value("test2013@test.test"))
                .andExpect(jsonPath("$.user.fullName").value(TestConstants.FULL_NAME))
                .andExpect(jsonPath("$.user.username").value(TestConstants.USERNAME))
                .andExpect(jsonPath("$.user.location").value(TestConstants.LOCATION))
                .andExpect(jsonPath("$.user.about").value(TestConstants.ABOUT))
                .andExpect(jsonPath("$.user.website").value(TestConstants.WEBSITE))
                .andExpect(jsonPath("$.user.countryCode").value(TestConstants.COUNTRY))
                .andExpect(jsonPath("$.user.phone").value(TestConstants.PHONE))
                .andExpect(jsonPath("$.user.country").value(TestConstants.COUNTRY))
                .andExpect(jsonPath("$.user.gender").value(TestConstants.GENDER))
                .andExpect(jsonPath("$.user.birthday").value(TestConstants.BIRTHDAY))
                .andExpect(jsonPath("$.user.registrationDate").value(TestConstants.REGISTRATION_DATE))
                .andExpect(jsonPath("$.user.tweetCount").value(TestConstants.TWEET_COUNT))
                .andExpect(jsonPath("$.user.mediaTweetCount").value(TestConstants.MEDIA_TWEET_COUNT))
                .andExpect(jsonPath("$.user.likeCount").value(TestConstants.LIKE_TWEET_COUNT))
                .andExpect(jsonPath("$.user.notificationsCount").value(3))
                .andExpect(jsonPath("$.user.active").value(true))
                .andExpect(jsonPath("$.user.profileCustomized").value(true))
                .andExpect(jsonPath("$.user.profileStarted").value(true))
                .andExpect(jsonPath("$.user.backgroundColor").value(TestConstants.BACKGROUND_COLOR))
                .andExpect(jsonPath("$.user.colorScheme").value(TestConstants.COLOR_SCHEME))
                .andExpect(jsonPath("$.user.avatar").value(TestConstants.AVATAR_SRC_1))
                .andExpect(jsonPath("$.user.wallpaper").value(TestConstants.WALLPAPER_SRC))
                .andExpect(jsonPath("$.user.pinnedTweetId").value(TestConstants.PINNED_TWEET_ID))
                .andExpect(jsonPath("$.user.followersSize").value(2L))
                .andExpect(jsonPath("$.user.followingSize").value(1L))
                .andExpect(jsonPath("$.user.followerRequestsSize").value(1L))
                .andExpect(jsonPath("$.user.unreadMessagesCount").value(1L))
                .andExpect(jsonPath("$.user.isMutedDirectMessages").value(true))
                .andExpect(jsonPath("$.user.isPrivateProfile").value(false));
    }

    @Test
    @DisplayName("[403] PUT /ui/v1/settings/update/email -Should user email is exist")
    public void updateEmail_ShouldUserEmailIsExist() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setEmail("test2015@test.test");
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + EMAIL)
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$", is(EMAIL_HAS_ALREADY_BEEN_TAKEN)));
    }

    @Test
    @DisplayName("[200] PUT /ui/v1/settings/update/phone - Update phone")
    public void updatePhone() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setCountryCode("UK");
        request.setPhone(123456789L);
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + PHONE)
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.countryCode").value("UK"))
                .andExpect(jsonPath("$.phone").value(123456789L));
    }

    @Test
    @DisplayName("[400] PUT /ui/v1/settings/update/phone - Should phone number length lower than 6 digits")
    public void updatePhone_ShouldPhoneNumberLengthLowerThan6Digits() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setCountryCode("UK");
        request.setPhone(123L);
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + PHONE)
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(INVALID_PHONE_NUMBER)));
    }

    @Test
    @DisplayName("[400] PUT /ui/v1/settings/update/phone - Should phone number length more than 10 digits")
    public void updatePhone_ShouldPhoneNumberLengthMoreThan10Digits() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setCountryCode("UK");
        request.setPhone(12345678900L);
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + PHONE)
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(INVALID_PHONE_NUMBER)));
    }

    @Test
    @DisplayName("[200] PUT /ui/v1/settings/update/country - Update country")
    public void updateCountry() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setCountry("UK");
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + COUNTRY)
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("UK")));
    }

    @Test
    @DisplayName("[200] PUT /ui/v1/settings/update/gender - Update gender")
    public void updateGender() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setGender("Male");
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + GENDER)
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("Male")));
    }

    @Test
    @DisplayName("[400] PUT /ui/v1/settings/update/gender - Should gender length is 0 characters")
    public void updateGender_ShouldGenderLengthIs0() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setGender("");
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + GENDER)
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(INVALID_GENDER_LENGTH)));
    }

    @Test
    @DisplayName("[400] PUT /ui/v1/settings/update/gender - Should gender length more than 30 characters")
    public void updateGender_ShouldGenderLengthMoreThan30() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setGender(TestConstants.LINK_DESCRIPTION);
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + GENDER)
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is(INVALID_GENDER_LENGTH)));
    }

    @Test
    @DisplayName("[200] PUT /ui/v1/settings/update/language - Update language")
    public void updateLanguage() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setLanguage("English");
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + LANGUAGE)
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("English")));
    }

    @Test
    @DisplayName("[200] PUT /ui/v1/settings/update/direct - Update direct message requests")
    public void updateDirectMessageRequests() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setMutedDirectMessages(false);
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + DIRECT)
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(false)));
    }

    @Test
    @DisplayName("[200] PUT /ui/v1/settings/update/private - Update private profile")
    public void updatePrivateProfile() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setPrivateProfile(true);
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + PRIVATE)
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(true)));
    }

    @Test
    @DisplayName("[200] PUT /ui/v1/settings/update/color_scheme - Update color scheme")
    public void updateColorScheme() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setColorScheme(ColorSchemeType.GREEN);
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + COLOR_SCHEME)
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("GREEN")));
    }

    @Test
    @DisplayName("[200] PUT /ui/v1/settings/update/background_color - Update background color")
    public void updateBackgroundColor() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setBackgroundColor(BackgroundColorType.DIM);
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + BACKGROUND_COLOR)
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("DIM")));
    }
}
