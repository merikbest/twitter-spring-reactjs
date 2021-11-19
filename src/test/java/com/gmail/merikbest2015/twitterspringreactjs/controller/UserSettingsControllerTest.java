package com.gmail.merikbest2015.twitterspringreactjs.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.SettingsRequest;
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
    public void updateUsername() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setUsername("test");

        mockMvc.perform(put(URL_USER_SETTINGS_UPDATE + "/username")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(USER_ID))
                .andExpect(jsonPath("$.email").value(USER_EMAIL))
                .andExpect(jsonPath("$.fullName").value(FULL_NAME))
                .andExpect(jsonPath("$.username").value("test"))
                .andExpect(jsonPath("$.location").value(LOCATION))
                .andExpect(jsonPath("$.about").value(ABOUT))
                .andExpect(jsonPath("$.website").value(WEBSITE))
                .andExpect(jsonPath("$.birthday").value(BIRTHDAY))
                .andExpect(jsonPath("$.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$.notificationsCount").value(3))
                .andExpect(jsonPath("$.pinnedTweet").isNotEmpty())
                .andExpect(jsonPath("$.bookmarks").isNotEmpty())
                .andExpect(jsonPath("$.avatar.id").value(AVATAR_ID))
                .andExpect(jsonPath("$.wallpaper.id").value(WALLPAPER_ID))
                .andExpect(jsonPath("$.profileCustomized").value(true))
                .andExpect(jsonPath("$.profileStarted").value(true))
                .andExpect(jsonPath("$.unreadMessages").isNotEmpty())
                .andExpect(jsonPath("$.followers").isNotEmpty())
                .andExpect(jsonPath("$.following").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
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
                .andExpect(jsonPath("$.user.birthday").value(BIRTHDAY))
                .andExpect(jsonPath("$.user.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.user.tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$.user.notificationsCount").value(3))
                .andExpect(jsonPath("$.user.pinnedTweet").isNotEmpty())
                .andExpect(jsonPath("$.user.bookmarks").isNotEmpty())
                .andExpect(jsonPath("$.user.avatar.id").value(AVATAR_ID))
                .andExpect(jsonPath("$.user.wallpaper.id").value(WALLPAPER_ID))
                .andExpect(jsonPath("$.user.profileCustomized").value(true))
                .andExpect(jsonPath("$.user.profileStarted").value(true))
                .andExpect(jsonPath("$.user.unreadMessages").isNotEmpty())
                .andExpect(jsonPath("$.user.followers").isNotEmpty())
                .andExpect(jsonPath("$.user.following").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
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
    public void updatePhone() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setCountryCode("UK");
        request.setPhone(1234567890L);

        mockMvc.perform(put(URL_USER_SETTINGS_UPDATE + "/phone")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(USER_ID))
                .andExpect(jsonPath("$.email").value(USER_EMAIL))
                .andExpect(jsonPath("$.fullName").value(FULL_NAME))
                .andExpect(jsonPath("$.username").value(USERNAME))
                .andExpect(jsonPath("$.location").value(LOCATION))
                .andExpect(jsonPath("$.about").value(ABOUT))
                .andExpect(jsonPath("$.website").value(WEBSITE))
                .andExpect(jsonPath("$.birthday").value(BIRTHDAY))
                .andExpect(jsonPath("$.countryCode").value("UK"))
                .andExpect(jsonPath("$.phone").value(1234567890L))
                .andExpect(jsonPath("$.country").value(COUNTRY))
                .andExpect(jsonPath("$.gender").value(GENDER))
                .andExpect(jsonPath("$.language").value(LANGUAGE))
                .andExpect(jsonPath("$.mutedDirectMessages").value(MUTED_DIRECT_MESSAGES))
                .andExpect(jsonPath("$.privateProfile").value(PRIVATE_PROFILE))
                .andExpect(jsonPath("$.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$.notificationsCount").value(3))
                .andExpect(jsonPath("$.pinnedTweet").isNotEmpty())
                .andExpect(jsonPath("$.bookmarks").isNotEmpty())
                .andExpect(jsonPath("$.avatar.id").value(AVATAR_ID))
                .andExpect(jsonPath("$.wallpaper.id").value(WALLPAPER_ID))
                .andExpect(jsonPath("$.profileCustomized").value(true))
                .andExpect(jsonPath("$.profileStarted").value(true))
                .andExpect(jsonPath("$.unreadMessages").isNotEmpty())
                .andExpect(jsonPath("$.followers").isNotEmpty())
                .andExpect(jsonPath("$.following").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void updateCountry() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setCountry("UK");

        mockMvc.perform(put(URL_USER_SETTINGS_UPDATE + "/country")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(USER_ID))
                .andExpect(jsonPath("$.email").value(USER_EMAIL))
                .andExpect(jsonPath("$.fullName").value(FULL_NAME))
                .andExpect(jsonPath("$.username").value(USERNAME))
                .andExpect(jsonPath("$.location").value(LOCATION))
                .andExpect(jsonPath("$.about").value(ABOUT))
                .andExpect(jsonPath("$.website").value(WEBSITE))
                .andExpect(jsonPath("$.birthday").value(BIRTHDAY))
                .andExpect(jsonPath("$.countryCode").value(COUNTRY_CODE))
                .andExpect(jsonPath("$.phone").value(PHONE))
                .andExpect(jsonPath("$.country").value("UK"))
                .andExpect(jsonPath("$.gender").value(GENDER))
                .andExpect(jsonPath("$.language").value(LANGUAGE))
                .andExpect(jsonPath("$.mutedDirectMessages").value(MUTED_DIRECT_MESSAGES))
                .andExpect(jsonPath("$.privateProfile").value(PRIVATE_PROFILE))
                .andExpect(jsonPath("$.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$.notificationsCount").value(3))
                .andExpect(jsonPath("$.pinnedTweet").isNotEmpty())
                .andExpect(jsonPath("$.bookmarks").isNotEmpty())
                .andExpect(jsonPath("$.avatar.id").value(AVATAR_ID))
                .andExpect(jsonPath("$.wallpaper.id").value(WALLPAPER_ID))
                .andExpect(jsonPath("$.profileCustomized").value(true))
                .andExpect(jsonPath("$.profileStarted").value(true))
                .andExpect(jsonPath("$.unreadMessages").isNotEmpty())
                .andExpect(jsonPath("$.followers").isNotEmpty())
                .andExpect(jsonPath("$.following").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void updateGender() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setGender("Male");

        mockMvc.perform(put(URL_USER_SETTINGS_UPDATE + "/gender")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(USER_ID))
                .andExpect(jsonPath("$.email").value(USER_EMAIL))
                .andExpect(jsonPath("$.fullName").value(FULL_NAME))
                .andExpect(jsonPath("$.username").value(USERNAME))
                .andExpect(jsonPath("$.location").value(LOCATION))
                .andExpect(jsonPath("$.about").value(ABOUT))
                .andExpect(jsonPath("$.website").value(WEBSITE))
                .andExpect(jsonPath("$.birthday").value(BIRTHDAY))
                .andExpect(jsonPath("$.countryCode").value(COUNTRY_CODE))
                .andExpect(jsonPath("$.phone").value(PHONE))
                .andExpect(jsonPath("$.country").value(COUNTRY))
                .andExpect(jsonPath("$.gender").value("Male"))
                .andExpect(jsonPath("$.language").value(LANGUAGE))
                .andExpect(jsonPath("$.mutedDirectMessages").value(MUTED_DIRECT_MESSAGES))
                .andExpect(jsonPath("$.privateProfile").value(PRIVATE_PROFILE))
                .andExpect(jsonPath("$.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$.notificationsCount").value(3))
                .andExpect(jsonPath("$.pinnedTweet").isNotEmpty())
                .andExpect(jsonPath("$.bookmarks").isNotEmpty())
                .andExpect(jsonPath("$.avatar.id").value(AVATAR_ID))
                .andExpect(jsonPath("$.wallpaper.id").value(WALLPAPER_ID))
                .andExpect(jsonPath("$.profileCustomized").value(true))
                .andExpect(jsonPath("$.profileStarted").value(true))
                .andExpect(jsonPath("$.unreadMessages").isNotEmpty())
                .andExpect(jsonPath("$.followers").isNotEmpty())
                .andExpect(jsonPath("$.following").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void updateLanguage() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setLanguage("English");

        mockMvc.perform(put(URL_USER_SETTINGS_UPDATE + "/language")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(USER_ID))
                .andExpect(jsonPath("$.email").value(USER_EMAIL))
                .andExpect(jsonPath("$.fullName").value(FULL_NAME))
                .andExpect(jsonPath("$.username").value(USERNAME))
                .andExpect(jsonPath("$.location").value(LOCATION))
                .andExpect(jsonPath("$.about").value(ABOUT))
                .andExpect(jsonPath("$.website").value(WEBSITE))
                .andExpect(jsonPath("$.birthday").value(BIRTHDAY))
                .andExpect(jsonPath("$.countryCode").value(COUNTRY_CODE))
                .andExpect(jsonPath("$.phone").value(PHONE))
                .andExpect(jsonPath("$.country").value(COUNTRY))
                .andExpect(jsonPath("$.gender").value(GENDER))
                .andExpect(jsonPath("$.language").value("English"))
                .andExpect(jsonPath("$.mutedDirectMessages").value(MUTED_DIRECT_MESSAGES))
                .andExpect(jsonPath("$.privateProfile").value(PRIVATE_PROFILE))
                .andExpect(jsonPath("$.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$.notificationsCount").value(3))
                .andExpect(jsonPath("$.pinnedTweet").isNotEmpty())
                .andExpect(jsonPath("$.bookmarks").isNotEmpty())
                .andExpect(jsonPath("$.avatar.id").value(AVATAR_ID))
                .andExpect(jsonPath("$.wallpaper.id").value(WALLPAPER_ID))
                .andExpect(jsonPath("$.profileCustomized").value(true))
                .andExpect(jsonPath("$.profileStarted").value(true))
                .andExpect(jsonPath("$.unreadMessages").isNotEmpty())
                .andExpect(jsonPath("$.followers").isNotEmpty())
                .andExpect(jsonPath("$.following").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void updateDirectMessageRequests() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setMutedDirectMessages(false);

        mockMvc.perform(put(URL_USER_SETTINGS_UPDATE + "/direct")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(USER_ID))
                .andExpect(jsonPath("$.email").value(USER_EMAIL))
                .andExpect(jsonPath("$.fullName").value(FULL_NAME))
                .andExpect(jsonPath("$.username").value(USERNAME))
                .andExpect(jsonPath("$.location").value(LOCATION))
                .andExpect(jsonPath("$.about").value(ABOUT))
                .andExpect(jsonPath("$.website").value(WEBSITE))
                .andExpect(jsonPath("$.birthday").value(BIRTHDAY))
                .andExpect(jsonPath("$.countryCode").value(COUNTRY_CODE))
                .andExpect(jsonPath("$.phone").value(PHONE))
                .andExpect(jsonPath("$.country").value(COUNTRY))
                .andExpect(jsonPath("$.gender").value(GENDER))
                .andExpect(jsonPath("$.language").value(LANGUAGE))
                .andExpect(jsonPath("$.mutedDirectMessages").value(false))
                .andExpect(jsonPath("$.privateProfile").value(PRIVATE_PROFILE))
                .andExpect(jsonPath("$.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$.notificationsCount").value(3))
                .andExpect(jsonPath("$.pinnedTweet").isNotEmpty())
                .andExpect(jsonPath("$.bookmarks").isNotEmpty())
                .andExpect(jsonPath("$.avatar.id").value(AVATAR_ID))
                .andExpect(jsonPath("$.wallpaper.id").value(WALLPAPER_ID))
                .andExpect(jsonPath("$.profileCustomized").value(true))
                .andExpect(jsonPath("$.profileStarted").value(true))
                .andExpect(jsonPath("$.unreadMessages").isNotEmpty())
                .andExpect(jsonPath("$.followers").isNotEmpty())
                .andExpect(jsonPath("$.following").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void updatePrivateProfile() throws Exception {
        SettingsRequest request = new SettingsRequest();
        request.setPrivateProfile(true);

        mockMvc.perform(put(URL_USER_SETTINGS_UPDATE + "/private")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(USER_ID))
                .andExpect(jsonPath("$.email").value(USER_EMAIL))
                .andExpect(jsonPath("$.fullName").value(FULL_NAME))
                .andExpect(jsonPath("$.username").value(USERNAME))
                .andExpect(jsonPath("$.location").value(LOCATION))
                .andExpect(jsonPath("$.about").value(ABOUT))
                .andExpect(jsonPath("$.website").value(WEBSITE))
                .andExpect(jsonPath("$.birthday").value(BIRTHDAY))
                .andExpect(jsonPath("$.countryCode").value(COUNTRY_CODE))
                .andExpect(jsonPath("$.phone").value(PHONE))
                .andExpect(jsonPath("$.country").value(COUNTRY))
                .andExpect(jsonPath("$.gender").value(GENDER))
                .andExpect(jsonPath("$.language").value(LANGUAGE))
                .andExpect(jsonPath("$.mutedDirectMessages").value(MUTED_DIRECT_MESSAGES))
                .andExpect(jsonPath("$.privateProfile").value(true))
                .andExpect(jsonPath("$.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$.notificationsCount").value(3))
                .andExpect(jsonPath("$.pinnedTweet").isNotEmpty())
                .andExpect(jsonPath("$.bookmarks").isNotEmpty())
                .andExpect(jsonPath("$.avatar.id").value(AVATAR_ID))
                .andExpect(jsonPath("$.wallpaper.id").value(WALLPAPER_ID))
                .andExpect(jsonPath("$.profileCustomized").value(true))
                .andExpect(jsonPath("$.profileStarted").value(true))
                .andExpect(jsonPath("$.unreadMessages").isNotEmpty())
                .andExpect(jsonPath("$.followers").isNotEmpty())
                .andExpect(jsonPath("$.following").isNotEmpty());
    }
}
