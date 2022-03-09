package com.gmail.merikbest2015.twitterspringreactjs.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.SettingsRequest;
import com.gmail.merikbest2015.twitterspringreactjs.model.BackgroundColorType;
import com.gmail.merikbest2015.twitterspringreactjs.model.ColorSchemeType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;

import static com.gmail.merikbest2015.twitterspringreactjs.util.TestConstants.*;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource("/application-test.properties")
@Sql(value = {"/sql/populate-table-before.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {"/sql/populate-table-after.sql"}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class UserSettingsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] PUT /api/v1/settings/update/username - Update username")
    public void updateUsername() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setUsername("test");

        mockMvc.perform(put(URL_USER_SETTINGS_UPDATE + "/username")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("test")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[400] PUT /api/v1/settings/update/username - Should username length is 0")
    public void updateUsername_ShouldUsernameLengthIs0() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setUsername("");

        mockMvc.perform(put(URL_USER_SETTINGS_UPDATE + "/username")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Incorrect username length")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[400] PUT /api/v1/settings/update/username - Should username length more than 50")
    public void updateUsername_ShouldUsernameLengthMoreThan50() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setUsername(LINK_DESCRIPTION);

        mockMvc.perform(put(URL_USER_SETTINGS_UPDATE + "/username")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Incorrect username length")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] PUT /api/v1/settings/update/email - Update email")
    public void updateEmail() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setEmail("test2013@test.test");

        mockMvc.perform(put(URL_USER_SETTINGS_UPDATE + "/email")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
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
                .andExpect(jsonPath("$.user.avatar.id").value(AVATAR_ID))
                .andExpect(jsonPath("$.user.wallpaper.id").value(WALLPAPER_ID))
                .andExpect(jsonPath("$.user.pinnedTweetId").value(PINNED_TWEET_ID))
                .andExpect(jsonPath("$.user.followersSize").value(2L))
                .andExpect(jsonPath("$.user.followingSize").value(1L))
                .andExpect(jsonPath("$.user.followerRequestsSize").isEmpty())
                .andExpect(jsonPath("$.user.unreadMessagesSize").value(1L))
                .andExpect(jsonPath("$.user.isMutedDirectMessages").value(true))
                .andExpect(jsonPath("$.user.isPrivateProfile").value(false));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[403] PUT /api/v1/settings/update/email -Should user email is exist")
    public void updateEmail_ShouldUserEmailIsExist() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setEmail("test2015@test.test");

        mockMvc.perform(put(URL_USER_SETTINGS_UPDATE + "/email")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$", is("Email has already been taken.")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] PUT /api/v1/settings/update/phone - Update phone")
    public void updatePhone() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setCountryCode("UK");
        request.setPhone(123456789L);

        mockMvc.perform(put(URL_USER_SETTINGS_UPDATE + "/phone")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.countryCode").value("UK"))
                .andExpect(jsonPath("$.phone").value(123456789L));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[400] PUT /api/v1/settings/update/phone - Should phone number length lower than 6 digits")
    public void updatePhone_ShouldPhoneNumberLengthLowerThan6Digits() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setCountryCode("UK");
        request.setPhone(123L);

        mockMvc.perform(put(URL_USER_SETTINGS_UPDATE + "/phone")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Not valid phone number")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[400] PUT /api/v1/settings/update/phone - Should phone number length more than 10 digits")
    public void updatePhone_ShouldPhoneNumberLengthMoreThan10Digits() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setCountryCode("UK");
        request.setPhone(12345678900L);

        mockMvc.perform(put(URL_USER_SETTINGS_UPDATE + "/phone")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Not valid phone number")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] PUT /api/v1/settings/update/country - Update country")
    public void updateCountry() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setCountry("UK");

        mockMvc.perform(put(URL_USER_SETTINGS_UPDATE + "/country")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("UK")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] PUT /api/v1/settings/update/gender - Update gender")
    public void updateGender() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setGender("Male");

        mockMvc.perform(put(URL_USER_SETTINGS_UPDATE + "/gender")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("Male")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[400] PUT /api/v1/settings/update/gender - Should gender length is 0 characters")
    public void updateGender_ShouldGenderLengthIs0() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setGender("");

        mockMvc.perform(put(URL_USER_SETTINGS_UPDATE + "/gender")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Incorrect gender length")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[400] PUT /api/v1/settings/update/gender - Should gender length more than 30 characters")
    public void updateGender_ShouldGenderLengthMoreThan30() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setGender(LINK_DESCRIPTION);

        mockMvc.perform(put(URL_USER_SETTINGS_UPDATE + "/gender")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Incorrect gender length")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] PUT /api/v1/settings/update/language - Update language")
    public void updateLanguage() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setLanguage("English");

        mockMvc.perform(put(URL_USER_SETTINGS_UPDATE + "/language")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("English")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] PUT /api/v1/settings/update/direct - Update direct message requests")
    public void updateDirectMessageRequests() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setMutedDirectMessages(false);

        mockMvc.perform(put(URL_USER_SETTINGS_UPDATE + "/direct")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(false)));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] PUT /api/v1/settings/update/private - Update private profile")
    public void updatePrivateProfile() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setPrivateProfile(true);

        mockMvc.perform(put(URL_USER_SETTINGS_UPDATE + "/private")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(true)));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] PUT /api/v1/settings/update/color_scheme - Update color scheme")
    public void updateColorScheme() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setColorScheme(ColorSchemeType.GREEN);

        mockMvc.perform(put(URL_USER_SETTINGS_UPDATE + "/color_scheme")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("GREEN")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] PUT /api/v1/settings/update/background_color - Update background color")
    public void updateBackgroundColor() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setBackgroundColor(BackgroundColorType.DIM);

        mockMvc.perform(put(URL_USER_SETTINGS_UPDATE + "/background_color")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("DIM")));
    }
}
