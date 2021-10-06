package com.gmail.merikbest2015.twitterspringreactjs.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.AuthenticationRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.PasswordResetRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.RegistrationRequest;
import com.gmail.merikbest2015.twitterspringreactjs.security.JwtAuthenticationException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource("/application-test.properties")
@Sql(value = {"/sql/populate-table-before.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {"/sql/populate-table-after.sql"}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class AuthenticationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    private AuthenticationRequest authenticationRequest;
    private RegistrationRequest registrationRequest;

    @BeforeEach
    public void init() {
        authenticationRequest = new AuthenticationRequest();
        authenticationRequest.setEmail(USER_EMAIL);

        registrationRequest = new RegistrationRequest();
        registrationRequest.setEmail("testtest@test.com");
        registrationRequest.setUsername("testtest");
        registrationRequest.setBirthday(BIRTHDAY);
    }

    @Test
    public void login() throws Exception {
        authenticationRequest.setPassword(PASSWORD);

        mockMvc.perform(post(URL_AUTH_BASIC + "/login")
                .content(mapper.writeValueAsString(authenticationRequest))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk());
    }

    @Test
    public void login_ShouldEmailOrPasswordBeNotValid() throws Exception {
        authenticationRequest.setPassword("test123");

        mockMvc.perform(post(URL_AUTH_BASIC + "/login")
                .content(mapper.writeValueAsString(authenticationRequest))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$", is("Incorrect password or email")));
    }

    @Test
    public void checkEmail() throws Exception {
        mockMvc.perform(post(URL_AUTH_REGISTRATION + "/check")
                .content(mapper.writeValueAsString(registrationRequest))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("User data checked.")));
    }

    @Test
    public void checkEmail_ShouldUserEmailIsExist() throws Exception {
        registrationRequest.setEmail(USER_EMAIL);

        mockMvc.perform(post(URL_AUTH_REGISTRATION + "/check")
                .content(mapper.writeValueAsString(registrationRequest))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$", is("Email has already been taken.")));
    }

    @Test
    public void sendRegistrationCode() throws Exception {
        registrationRequest.setEmail(USER_EMAIL);

        mockMvc.perform(post(URL_AUTH_REGISTRATION + "/code")
                .content(mapper.writeValueAsString(registrationRequest))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("Registration code sent successfully")));
    }

    @Test
    public void checkRegistrationCode() throws Exception {
        mockMvc.perform(get(URL_AUTH_REGISTRATION + "/activate/1234567890"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("User successfully activated.")));
    }

    @Test
    public void checkRegistrationCode_NotFound() throws Exception {
        mockMvc.perform(get(URL_AUTH_REGISTRATION + "/activate/test"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Activation code not found.")));
    }

    @Test
    public void endRegistration() throws Exception {
        authenticationRequest.setPassword(PASSWORD);

        mockMvc.perform(post(URL_AUTH_REGISTRATION + "/confirm")
                .content(mapper.writeValueAsString(authenticationRequest))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.user.id").value(USER_ID))
                .andExpect(jsonPath("$.user.email").value(USER_EMAIL))
                .andExpect(jsonPath("$.user.fullName").value(FULL_NAME))
                .andExpect(jsonPath("$.user.username").value(USERNAME))
                .andExpect(jsonPath("$.user.location").value(LOCATION))
                .andExpect(jsonPath("$.user.about").value(ABOUT))
                .andExpect(jsonPath("$.user.website").value(WEBSITE))
                .andExpect(jsonPath("$.user.birthday").value(BIRTHDAY))
                .andExpect(jsonPath("$.user.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.user.tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$.user.avatar.id").value(AVATAR_ID))
                .andExpect(jsonPath("$.user.wallpaper.id").value(WALLPAPER_ID))
                .andExpect(jsonPath("$.user.profileCustomized").value(true))
                .andExpect(jsonPath("$.user.profileStarted").value(true));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void getUserByToken() throws Exception {
        mockMvc.perform(get(URL_AUTH_BASIC + "/user"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.user.id").value(USER_ID))
                .andExpect(jsonPath("$.user.email").value(USER_EMAIL))
                .andExpect(jsonPath("$.user.fullName").value(FULL_NAME))
                .andExpect(jsonPath("$.user.username").value(USERNAME))
                .andExpect(jsonPath("$.user.location").value(LOCATION))
                .andExpect(jsonPath("$.user.about").value(ABOUT))
                .andExpect(jsonPath("$.user.website").value(WEBSITE))
                .andExpect(jsonPath("$.user.birthday").value(BIRTHDAY))
                .andExpect(jsonPath("$.user.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.user.tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$.user.avatar.id").value(AVATAR_ID))
                .andExpect(jsonPath("$.user.wallpaper.id").value(WALLPAPER_ID))
                .andExpect(jsonPath("$.user.profileCustomized").value(true))
                .andExpect(jsonPath("$.user.profileStarted").value(true));
    }

    @Test
    public void getUserByToken_JwtExpired() throws Exception {
        Assertions.assertThrows(JwtAuthenticationException.class, () -> {
            mockMvc.perform(get(URL_AUTH_FORGOT + "/user")
                    .header("Authorization", "jwt"))
                    .andExpect(status().isUnauthorized());
        });
    }

    @Test
    public void findExistingEmail() throws Exception {
        PasswordResetRequest passwordResetRequest = new PasswordResetRequest();
        passwordResetRequest.setEmail(USER_EMAIL);

        mockMvc.perform(post(URL_AUTH_FORGOT + "/email")
                .content(mapper.writeValueAsString(passwordResetRequest))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("Reset password code is send to your E-mail")));
    }

    @Test
    public void findExistingEmail_EmailNotFound() throws Exception {
        PasswordResetRequest passwordResetRequest = new PasswordResetRequest();
        passwordResetRequest.setEmail("test");

        mockMvc.perform(post(URL_AUTH_FORGOT + "/email")
                .content(mapper.writeValueAsString(passwordResetRequest))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Email not found")));
    }

    @Test
    public void sendPasswordResetCode() throws Exception {
        PasswordResetRequest passwordResetRequest = new PasswordResetRequest();
        passwordResetRequest.setEmail(USER_EMAIL);

        mockMvc.perform(post(URL_AUTH_FORGOT)
                .content(mapper.writeValueAsString(passwordResetRequest))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("Reset password code is send to your E-mail")));
    }

    @Test
    public void getUserByResetCode() throws Exception {
        mockMvc.perform(get(URL_AUTH_RESET + "/1234567890"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(3))
                .andExpect(jsonPath("$.email").value("test2016@test.test"))
                .andExpect(jsonPath("$.fullName").value(FULL_NAME))
                .andExpect(jsonPath("$.username").value(USERNAME))
                .andExpect(jsonPath("$.location").value(LOCATION))
                .andExpect(jsonPath("$.about").value(ABOUT))
                .andExpect(jsonPath("$.website").value(WEBSITE))
                .andExpect(jsonPath("$.birthday").value(BIRTHDAY))
                .andExpect(jsonPath("$.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$.avatar.id").value(AVATAR_ID))
                .andExpect(jsonPath("$.wallpaper.id").value(WALLPAPER_ID))
                .andExpect(jsonPath("$.profileCustomized").value(true))
                .andExpect(jsonPath("$.profileStarted").value(true));
    }

    @Test
    public void getUserByResetCode_BadRequest() throws Exception {
        mockMvc.perform(get(URL_AUTH_RESET + "/test123"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Password reset code is invalid!")));
    }

    @Test
    public void passwordReset() throws Exception {
        PasswordResetRequest passwordResetRequest = new PasswordResetRequest();
        passwordResetRequest.setEmail(USER_EMAIL);
        passwordResetRequest.setPassword(PASSWORD);
        passwordResetRequest.setPassword2(PASSWORD);

        mockMvc.perform(post(URL_AUTH_RESET)
                .content(mapper.writeValueAsString(passwordResetRequest))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("Password successfully changed!")));
    }

    @Test
    public void passwordReset_ShouldPassword2BeEmpty() throws Exception {
        PasswordResetRequest passwordResetRequest = new PasswordResetRequest();
        passwordResetRequest.setEmail(USER_EMAIL);
        passwordResetRequest.setPassword(PASSWORD);

        mockMvc.perform(post(URL_AUTH_RESET)
                .content(mapper.writeValueAsString(passwordResetRequest))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Password confirmation cannot be empty.")));
    }

    @Test
    public void passwordReset_ShouldPasswordsNotMatch() throws Exception {
        PasswordResetRequest passwordResetRequest = new PasswordResetRequest();
        passwordResetRequest.setEmail(USER_EMAIL);
        passwordResetRequest.setPassword(PASSWORD);
        passwordResetRequest.setPassword2("test123");

        mockMvc.perform(post(URL_AUTH_RESET)
                .content(mapper.writeValueAsString(passwordResetRequest))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Passwords do not match.")));
    }
}
