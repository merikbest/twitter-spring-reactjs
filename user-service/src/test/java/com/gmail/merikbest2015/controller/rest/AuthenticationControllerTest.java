package com.gmail.merikbest2015.controller.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.dto.request.*;
import org.junit.jupiter.api.BeforeEach;
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
import static com.gmail.merikbest2015.constants.PathConstants.UI_V1_AUTH;
import static com.gmail.merikbest2015.util.TestConstants.*;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_METHOD;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Sql(value = {"/sql-test/populate-user-db.sql"}, executionPhase = BEFORE_TEST_METHOD)
@Sql(value = {"/sql-test/clear-user-db.sql"}, executionPhase = AFTER_TEST_METHOD)
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
    @DisplayName("[200] POST /ui/v1/auth/login - Login")
    public void login() throws Exception {
        authenticationRequest.setPassword(PASSWORD);
        mockMvc.perform(post(UI_V1_AUTH + "/login")
                        .content(mapper.writeValueAsString(authenticationRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("[400] POST /ui/v1/auth/login - Should Email not valid")
    public void login_ShouldEmailNotValid() throws Exception {
        authenticationRequest.setEmail("notvalidemail@test");
        authenticationRequest.setPassword(PASSWORD);
        mockMvc.perform(post(UI_V1_AUTH + "/login")
                        .content(mapper.writeValueAsString(authenticationRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.email", is("Please enter a valid email address.")));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/auth/login - Should password is empty")
    public void login_ShouldPasswordIsEmpty() throws Exception {
        authenticationRequest.setPassword(null);
        mockMvc.perform(post(UI_V1_AUTH + "/login")
                        .content(mapper.writeValueAsString(authenticationRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.password", is("Password cannot be empty.")));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/auth/login - Should password less then 8 characters")
    public void login_ShouldPasswordLessThen8Characters() throws Exception {
        authenticationRequest.setPassword("test123");
        mockMvc.perform(post(UI_V1_AUTH + "/login")
                        .content(mapper.writeValueAsString(authenticationRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.password", is("Your password needs to be at least 8 characters. " +
                        "Please enter a longer one.")));
    }

    @Test
    @DisplayName("[200] POST /ui/v1/auth/registration/check - Check Email")
    public void checkEmail() throws Exception {
        mockMvc.perform(post(UI_V1_AUTH + "/registration/check")
                        .content(mapper.writeValueAsString(registrationRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("User data checked.")));
    }

    @Test
    @DisplayName("[403] POST /ui/v1/auth/registration/check - Should user email is exist")
    public void checkEmail_ShouldUserEmailIsExist() throws Exception {
        registrationRequest.setEmail(USER_EMAIL);
        mockMvc.perform(post(UI_V1_AUTH + "/registration/check")
                        .content(mapper.writeValueAsString(registrationRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$", is("Email has already been taken.")));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/auth/registration/check - Should email not valid")
    public void checkEmail_ShouldEmailNotValid() throws Exception {
        registrationRequest.setEmail("test2015@test");
        mockMvc.perform(post(UI_V1_AUTH + "/registration/check")
                        .content(mapper.writeValueAsString(registrationRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.email", is("Please enter a valid email address.")));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/auth/registration/check - Should username is empty")
    public void checkEmail_ShouldUsernameIsEmpty() throws Exception {
        registrationRequest.setUsername(null);
        mockMvc.perform(post(UI_V1_AUTH + "/registration/check")
                        .content(mapper.writeValueAsString(registrationRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.username", is("What’s your name?")));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/auth/registration/check - Should username more then 50 characters")
    public void checkEmail_ShouldUsernameMoreThen50Characters() throws Exception {
        registrationRequest.setUsername("qwertqwertqwertqwertqwertqwertqwertqwertqwertqwert123");
        mockMvc.perform(post(UI_V1_AUTH + "/registration/check")
                        .content(mapper.writeValueAsString(registrationRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.username", is("Please enter a valid name.")));
    }

    @Test
    @DisplayName("[200] POST /ui/v1/auth/registration/code - Send registration code")
    public void sendRegistrationCode() throws Exception {
        ProcessEmailRequest request = new ProcessEmailRequest();
        request.setEmail(USER_EMAIL);
        mockMvc.perform(post(UI_V1_AUTH + "/registration/code")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("Registration code sent successfully")));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/auth/registration/code - Should email not valid")
    public void sendRegistrationCode_ShouldEmailNotValid() throws Exception {
        ProcessEmailRequest request = new ProcessEmailRequest();
        request.setEmail("test2015@test");
        mockMvc.perform(post(UI_V1_AUTH + "/registration/code")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.email", is("Please enter a valid email address.")));
    }

    @Test
    @DisplayName("[404] POST /ui/v1/auth/registration/code - User not found")
    public void sendRegistrationCode_ShouldUserNotFound() throws Exception {
        ProcessEmailRequest request = new ProcessEmailRequest();
        request.setEmail(NOT_VALID_EMAIL);
        mockMvc.perform(post(UI_V1_AUTH + "/registration/code")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("User not found")));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/auth/registration/activate/1234567890 - Check registration code")
    public void checkRegistrationCode() throws Exception {
        mockMvc.perform(get(UI_V1_AUTH + "/registration/activate/1234567890"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("User successfully activated.")));
    }

    @Test
    @DisplayName("[404] GET /ui/v1/auth/registration/activate/test - Registration code not found")
    public void checkRegistrationCode_NotFound() throws Exception {
        mockMvc.perform(get(UI_V1_AUTH + "/registration/activate/test"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Activation code not found.")));
    }

    @Test
    @DisplayName("[200] POST /ui/v1/auth/registration/confirm - End registration")
    public void endRegistration() throws Exception {
        authenticationRequest.setPassword(PASSWORD);
        mockMvc.perform(post(UI_V1_AUTH + "/registration/confirm")
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
                .andExpect(jsonPath("$.user.avatar").value(AVATAR_SRC_1))
                .andExpect(jsonPath("$.user.wallpaper").value(WALLPAPER_SRC))
                .andExpect(jsonPath("$.user.profileCustomized").value(true))
                .andExpect(jsonPath("$.user.profileStarted").value(true));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/auth/registration/confirm - Should email not valid")
    public void endRegistration_ShouldEmailNotValid() throws Exception {
        authenticationRequest.setEmail("test2015@test");
        mockMvc.perform(post(UI_V1_AUTH + "/registration/confirm")
                        .content(mapper.writeValueAsString(authenticationRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.email", is("Please enter a valid email address.")));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/auth/registration/confirm - Should short password")
    public void endRegistration_ShouldShortPassword() throws Exception {
        authenticationRequest.setPassword("123");
        mockMvc.perform(post(UI_V1_AUTH + "/registration/confirm")
                        .content(mapper.writeValueAsString(authenticationRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.password", is("Your password needs to be at least 8 characters. Please enter a longer one.")));
    }

    @Test
    @DisplayName("[404] POST /ui/v1/auth/registration/confirm - Should user Not Found by email")
    public void endRegistration_ShouldUserNotFound() throws Exception {
        authenticationRequest.setEmail(NOT_VALID_EMAIL);
        authenticationRequest.setPassword(PASSWORD);
        mockMvc.perform(post(UI_V1_AUTH + "/registration/confirm")
                        .content(mapper.writeValueAsString(authenticationRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("User not found")));
    }

    @Test
    @DisplayName("[200] POST /ui/v1/auth/forgot/email - Find existing email")
    public void findExistingEmail() throws Exception {
        ProcessEmailRequest request = new ProcessEmailRequest();
        request.setEmail(USER_EMAIL);
        mockMvc.perform(post(UI_V1_AUTH + "/forgot/email")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("Reset password code is send to your E-mail")));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/auth/forgot/email - Should email not valid")
    public void findExistingEmail_ShouldEmailNotValid() throws Exception {
        ProcessEmailRequest request = new ProcessEmailRequest();
        request.setEmail("test2015@test");
        mockMvc.perform(post(UI_V1_AUTH + "/forgot/email")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.email", is("Please enter a valid email address.")));
    }

    @Test
    @DisplayName("[404] POST /ui/v1/auth/forgot/email - Email not found")
    public void findExistingEmail_EmailNotFound() throws Exception {
        ProcessEmailRequest request = new ProcessEmailRequest();
        request.setEmail(NOT_VALID_EMAIL);
        mockMvc.perform(post(UI_V1_AUTH + "/forgot/email")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Email not found")));
    }

    @Test
    @DisplayName("[200] POST /ui/v1/auth/forgot - Send password reset code")
    public void sendPasswordResetCode() throws Exception {
        ProcessEmailRequest request = new ProcessEmailRequest();
        request.setEmail(USER_EMAIL);
        mockMvc.perform(post(UI_V1_AUTH + "/forgot")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("Reset password code is send to your E-mail")));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/auth/forgot - Should email not valid")
    public void sendPasswordResetCode_ShouldEmailNotValid() throws Exception {
        ProcessEmailRequest request = new ProcessEmailRequest();
        request.setEmail("test2015@test");
        mockMvc.perform(post(UI_V1_AUTH + "/forgot")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.email", is("Please enter a valid email address.")));
    }

    @Test
    @DisplayName("[404] POST /ui/v1/auth/forgot - Should email Not Found")
    public void sendPasswordResetCode_ShouldEmailNotFound() throws Exception {
        ProcessEmailRequest request = new ProcessEmailRequest();
        request.setEmail(NOT_VALID_EMAIL);
        mockMvc.perform(post(UI_V1_AUTH + "/forgot")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Email not found")));
    }

    @Test
    @DisplayName("[200] GET /ui/v1/auth/reset/1234567890 - Get user by reset code")
    public void getUserByResetCode() throws Exception {
        mockMvc.perform(get(UI_V1_AUTH + "/reset/1234567890"))
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
                .andExpect(jsonPath("$.avatar").value(AVATAR_SRC_1))
                .andExpect(jsonPath("$.wallpaper").value(WALLPAPER_SRC))
                .andExpect(jsonPath("$.profileCustomized").value(true))
                .andExpect(jsonPath("$.profileStarted").value(true));
    }

    @Test
    @DisplayName("[400] GET /ui/v1/auth/reset/test123 - Get user by reset code bad request")
    public void getUserByResetCode_BadRequest() throws Exception {
        mockMvc.perform(get(UI_V1_AUTH + "/reset/test123"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Password reset code is invalid!")));
    }

    @Test
    @DisplayName("[200] POST /ui/v1/auth/reset - Reset password")
    public void passwordReset() throws Exception {
        PasswordResetRequest passwordResetRequest = new PasswordResetRequest();
        passwordResetRequest.setEmail(USER_EMAIL);
        passwordResetRequest.setPassword(PASSWORD);
        passwordResetRequest.setPassword2(PASSWORD);
        mockMvc.perform(post(UI_V1_AUTH + "/reset")
                        .content(mapper.writeValueAsString(passwordResetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("Password successfully changed!")));
    }

    @Test
    @DisplayName("[404] POST /ui/v1/auth/reset - Should user Not Found by email")
    public void passwordReset_ShouldUserNotFoundByEmail() throws Exception {
        PasswordResetRequest passwordResetRequest = new PasswordResetRequest();
        passwordResetRequest.setEmail(NOT_VALID_EMAIL);
        passwordResetRequest.setPassword(PASSWORD);
        passwordResetRequest.setPassword2(PASSWORD);
        mockMvc.perform(post(UI_V1_AUTH + "/reset")
                        .content(mapper.writeValueAsString(passwordResetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.email", is("Email not found")));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/auth/reset - Should Email not valid")
    public void passwordReset_ShouldEmailNotValid() throws Exception {
        PasswordResetRequest passwordResetRequest = new PasswordResetRequest();
        passwordResetRequest.setEmail("notvalidemail@test");
        passwordResetRequest.setPassword(PASSWORD);
        passwordResetRequest.setPassword2(PASSWORD);
        mockMvc.perform(post(UI_V1_AUTH + "/reset")
                        .content(mapper.writeValueAsString(passwordResetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.email", is("Please enter a valid email address.")));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/auth/reset - Should password be empty")
    public void passwordReset_ShouldPasswordBeEmpty() throws Exception {
        PasswordResetRequest passwordResetRequest = new PasswordResetRequest();
        passwordResetRequest.setEmail(USER_EMAIL);
        passwordResetRequest.setPassword2(PASSWORD);
        mockMvc.perform(post(UI_V1_AUTH + "/reset")
                        .content(mapper.writeValueAsString(passwordResetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.password", is("Password cannot be empty.")));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/auth/reset - Should password2 be empty")
    public void passwordReset_ShouldPassword2BeEmpty() throws Exception {
        PasswordResetRequest passwordResetRequest = new PasswordResetRequest();
        passwordResetRequest.setEmail(USER_EMAIL);
        passwordResetRequest.setPassword(PASSWORD);
        mockMvc.perform(post(UI_V1_AUTH + "/reset")
                        .content(mapper.writeValueAsString(passwordResetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.password2", is("Password cannot be empty.")));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/auth/reset - Should password less then 8 characters")
    public void passwordReset_ShouldPasswordLessThen8Characters() throws Exception {
        PasswordResetRequest passwordResetRequest = new PasswordResetRequest();
        passwordResetRequest.setEmail(USER_EMAIL);
        passwordResetRequest.setPassword("qwerty");
        passwordResetRequest.setPassword2(PASSWORD);
        mockMvc.perform(post(UI_V1_AUTH + "/reset")
                        .content(mapper.writeValueAsString(passwordResetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.password", is("Your password needs to be at least 8 characters. Please enter a longer one.")));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/auth/reset - Should password2 less then 8 characters")
    public void passwordReset_ShouldPassword2LessThen8Characters() throws Exception {
        PasswordResetRequest passwordResetRequest = new PasswordResetRequest();
        passwordResetRequest.setEmail(USER_EMAIL);
        passwordResetRequest.setPassword(PASSWORD);
        passwordResetRequest.setPassword2("qwerty");
        mockMvc.perform(post(UI_V1_AUTH + "/reset")
                        .content(mapper.writeValueAsString(passwordResetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.password2", is("Your password needs to be at least 8 characters. Please enter a longer one.")));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/auth/reset - Should passwords not match")
    public void passwordReset_ShouldPasswordsNotMatch() throws Exception {
        PasswordResetRequest passwordResetRequest = new PasswordResetRequest();
        passwordResetRequest.setEmail(USER_EMAIL);
        passwordResetRequest.setPassword(PASSWORD);
        passwordResetRequest.setPassword2("test1234");
        mockMvc.perform(post(UI_V1_AUTH + "/reset")
                        .content(mapper.writeValueAsString(passwordResetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.password", is("Passwords do not match.")));
    }

    @Test
    @DisplayName("[200] POST /ui/v1/auth/reset/current - Current Password Reset")
    public void currentPasswordReset() throws Exception {
        CurrentPasswordResetRequest passwordResetRequest = new CurrentPasswordResetRequest();
        passwordResetRequest.setCurrentPassword(PASSWORD);
        passwordResetRequest.setPassword(PASSWORD);
        passwordResetRequest.setPassword2(PASSWORD);

        mockMvc.perform(post(UI_V1_AUTH + "/reset/current")
                        .header(AUTH_USER_ID_HEADER, USER_ID)
                        .content(mapper.writeValueAsString(passwordResetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("Your password has been successfully updated.")));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/auth/reset/current - Should current password is empty")
    public void currentPasswordReset_ShouldCurrentPasswordIsEmpty() throws Exception {
        CurrentPasswordResetRequest passwordResetRequest = new CurrentPasswordResetRequest();
        passwordResetRequest.setCurrentPassword("");
        passwordResetRequest.setPassword(PASSWORD);
        passwordResetRequest.setPassword2(PASSWORD);
        mockMvc.perform(post(UI_V1_AUTH + "/reset/current")
                        .header(AUTH_USER_ID_HEADER, USER_ID)
                        .content(mapper.writeValueAsString(passwordResetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.currentPassword", is("Current password cannot be empty.")));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/auth/reset/current - Should password is empty")
    public void currentPasswordReset_ShouldPasswordIsEmpty() throws Exception {
        CurrentPasswordResetRequest passwordResetRequest = new CurrentPasswordResetRequest();
        passwordResetRequest.setCurrentPassword(PASSWORD);
        passwordResetRequest.setPassword(null);
        passwordResetRequest.setPassword2(PASSWORD);
        mockMvc.perform(post(UI_V1_AUTH + "/reset/current")
                        .header(AUTH_USER_ID_HEADER, USER_ID)
                        .content(mapper.writeValueAsString(passwordResetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.password", is("Password cannot be empty.")));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/auth/reset/current - Should password2 is empty")
    public void currentPasswordReset_ShouldPassword2IsEmpty() throws Exception {
        CurrentPasswordResetRequest passwordResetRequest = new CurrentPasswordResetRequest();
        passwordResetRequest.setCurrentPassword(PASSWORD);
        passwordResetRequest.setPassword(PASSWORD);
        passwordResetRequest.setPassword2(null);
        mockMvc.perform(post(UI_V1_AUTH + "/reset/current")
                        .header(AUTH_USER_ID_HEADER, USER_ID)
                        .content(mapper.writeValueAsString(passwordResetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.password2", is("Password confirmation cannot be empty.")));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/auth/reset/current - Should password less then 8 characters")
    public void currentPasswordReset_ShouldPasswordLessThen8Characters() throws Exception {
        CurrentPasswordResetRequest passwordResetRequest = new CurrentPasswordResetRequest();
        passwordResetRequest.setCurrentPassword(PASSWORD);
        passwordResetRequest.setPassword("test");
        passwordResetRequest.setPassword2(PASSWORD);
        mockMvc.perform(post(UI_V1_AUTH + "/reset/current")
                        .header(AUTH_USER_ID_HEADER, USER_ID)
                        .content(mapper.writeValueAsString(passwordResetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.password", is("Your password needs to be at least 8 characters." +
                        " Please enter a longer one.")));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/auth/reset/current - Should password2 less then 8 characters")
    public void currentPasswordReset_ShouldPassword2LessThen8Characters() throws Exception {
        CurrentPasswordResetRequest passwordResetRequest = new CurrentPasswordResetRequest();
        passwordResetRequest.setCurrentPassword(PASSWORD);
        passwordResetRequest.setPassword(PASSWORD);
        passwordResetRequest.setPassword2("test");
        mockMvc.perform(post(UI_V1_AUTH + "/reset/current")
                        .header(AUTH_USER_ID_HEADER, USER_ID)
                        .content(mapper.writeValueAsString(passwordResetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.password2", is("Your password needs to be at least 8 characters." +
                        " Please enter a longer one.")));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/auth/reset/current - Should current password reset not found")
    public void currentPasswordReset_ShouldCurrentPasswordResetNotFound() throws Exception {
        CurrentPasswordResetRequest passwordResetRequest = new CurrentPasswordResetRequest();
        passwordResetRequest.setCurrentPassword("qwerty123456");
        passwordResetRequest.setPassword(PASSWORD);
        passwordResetRequest.setPassword2(PASSWORD);
        mockMvc.perform(post(UI_V1_AUTH + "/reset/current")
                        .header(AUTH_USER_ID_HEADER, USER_ID)
                        .content(mapper.writeValueAsString(passwordResetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.currentPassword", is("The password you entered was incorrect.")));
    }

    @Test
    @DisplayName("[400] POST /ui/v1/auth/reset/current - Should passwords not match")
    public void currentPasswordReset_ShouldPasswordsNotMatch() throws Exception {
        CurrentPasswordResetRequest passwordResetRequest = new CurrentPasswordResetRequest();
        passwordResetRequest.setCurrentPassword(PASSWORD);
        passwordResetRequest.setPassword("qwerty123456");
        passwordResetRequest.setPassword2(PASSWORD);
        mockMvc.perform(post(UI_V1_AUTH + "/reset/current")
                        .header(AUTH_USER_ID_HEADER, USER_ID)
                        .content(mapper.writeValueAsString(passwordResetRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.password", is("Passwords do not match.")));
    }
}
