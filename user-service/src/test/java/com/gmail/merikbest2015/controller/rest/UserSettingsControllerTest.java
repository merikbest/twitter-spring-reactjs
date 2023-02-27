package com.gmail.merikbest2015.controller.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.dto.request.SettingsRequest;
import com.gmail.merikbest2015.enums.BackgroundColorType;
import com.gmail.merikbest2015.enums.ColorSchemeType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;

import static com.gmail.merikbest2015.constants.PathConstants.AUTH_USER_ID_HEADER;
import static com.gmail.merikbest2015.constants.PathConstants.UI_V1_USER_SETTINGS_UPDATE;
import static com.gmail.merikbest2015.util.TestConstants.*;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_METHOD;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Sql(value = {"/sql-test/populate-user-db.sql"}, executionPhase = BEFORE_TEST_METHOD)
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
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + "/username")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("test")));
    }

    @Test
    @DisplayName("[400] PUT /ui/v1/settings/update/username - Should username length is 0")
    public void updateUsername_ShouldUsernameLengthIs0() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setUsername("");
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + "/username")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Incorrect username length")));
    }

    @Test
    @DisplayName("[400] PUT /ui/v1/settings/update/username - Should username length more than 50")
    public void updateUsername_ShouldUsernameLengthMoreThan50() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setUsername(LINK_DESCRIPTION);
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + "/username")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Incorrect username length")));
    }

    @Test
    @DisplayName("[200] PUT /ui/v1/settings/update/email - Update email")
    public void updateEmail() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setEmail("test2013@test.test");
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + "/email")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.user.id").value(USER_ID))
                .andExpect(jsonPath("$.user.email").value("test2013@test.test"))
                .andExpect(jsonPath("$.user.fullName").value(FULL_NAME))
                .andExpect(jsonPath("$.user.username").value(USERNAME))
                .andExpect(jsonPath("$.user.location").value(LOCATION))
                .andExpect(jsonPath("$.user.about").value(ABOUT))
                .andExpect(jsonPath("$.user.website").value(WEBSITE))
                .andExpect(jsonPath("$.user.countryCode").value(COUNTRY))
                .andExpect(jsonPath("$.user.phone").value(PHONE))
                .andExpect(jsonPath("$.user.country").value(COUNTRY))
                .andExpect(jsonPath("$.user.gender").value(GENDER))
                .andExpect(jsonPath("$.user.birthday").value(BIRTHDAY))
                .andExpect(jsonPath("$.user.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.user.tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$.user.mediaTweetCount").value(MEDIA_TWEET_COUNT))
                .andExpect(jsonPath("$.user.likeCount").value(LIKE_TWEET_COUNT))
                .andExpect(jsonPath("$.user.notificationsCount").value(3))
                .andExpect(jsonPath("$.user.active").value(true))
                .andExpect(jsonPath("$.user.profileCustomized").value(true))
                .andExpect(jsonPath("$.user.profileStarted").value(true))
                .andExpect(jsonPath("$.user.backgroundColor").value(BACKGROUND_COLOR))
                .andExpect(jsonPath("$.user.colorScheme").value(COLOR_SCHEME))
                .andExpect(jsonPath("$.user.avatar").value(AVATAR_SRC_1))
                .andExpect(jsonPath("$.user.wallpaper").value(WALLPAPER_SRC))
                .andExpect(jsonPath("$.user.pinnedTweetId").value(PINNED_TWEET_ID))
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
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + "/email")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$", is("Email has already been taken.")));
    }

    @Test
    @DisplayName("[200] PUT /ui/v1/settings/update/phone - Update phone")
    public void updatePhone() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setCountryCode("UK");
        request.setPhone(123456789L);
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + "/phone")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, USER_ID))
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
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + "/phone")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Not valid phone number")));
    }

    @Test
    @DisplayName("[400] PUT /ui/v1/settings/update/phone - Should phone number length more than 10 digits")
    public void updatePhone_ShouldPhoneNumberLengthMoreThan10Digits() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setCountryCode("UK");
        request.setPhone(12345678900L);
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + "/phone")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Not valid phone number")));
    }

    @Test
    @DisplayName("[200] PUT /ui/v1/settings/update/country - Update country")
    public void updateCountry() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setCountry("UK");
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + "/country")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("UK")));
    }

    @Test
    @DisplayName("[200] PUT /ui/v1/settings/update/gender - Update gender")
    public void updateGender() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setGender("Male");
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + "/gender")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("Male")));
    }

    @Test
    @DisplayName("[400] PUT /ui/v1/settings/update/gender - Should gender length is 0 characters")
    public void updateGender_ShouldGenderLengthIs0() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setGender("");
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + "/gender")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Incorrect gender length")));
    }

    @Test
    @DisplayName("[400] PUT /ui/v1/settings/update/gender - Should gender length more than 30 characters")
    public void updateGender_ShouldGenderLengthMoreThan30() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setGender(LINK_DESCRIPTION);
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + "/gender")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Incorrect gender length")));
    }

    @Test
    @DisplayName("[200] PUT /ui/v1/settings/update/language - Update language")
    public void updateLanguage() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setLanguage("English");
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + "/language")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("English")));
    }

    @Test
    @DisplayName("[200] PUT /ui/v1/settings/update/direct - Update direct message requests")
    public void updateDirectMessageRequests() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setMutedDirectMessages(false);
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + "/direct")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(false)));
    }

    @Test
    @DisplayName("[200] PUT /ui/v1/settings/update/private - Update private profile")
    public void updatePrivateProfile() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setPrivateProfile(true);
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + "/private")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(true)));
    }

    @Test
    @DisplayName("[200] PUT /ui/v1/settings/update/color_scheme - Update color scheme")
    public void updateColorScheme() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setColorScheme(ColorSchemeType.GREEN);
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + "/color_scheme")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("GREEN")));
    }

    @Test
    @DisplayName("[200] PUT /ui/v1/settings/update/background_color - Update background color")
    public void updateBackgroundColor() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setBackgroundColor(BackgroundColorType.DIM);
        mockMvc.perform(put(UI_V1_USER_SETTINGS_UPDATE + "/background_color")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .header(AUTH_USER_ID_HEADER, USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("DIM")));
    }
}
