package com.gmail.merikbest2015.twitterspringreactjs.service;

import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.user.AuthUserProjection;

import java.util.Map;

public interface AuthenticationService {

    Long getAuthenticatedUserId();

    User getAuthenticatedUser();

    Map<String, Object> login(String email, String password);

    String registration(String email, String username, String birthday);

    String sendRegistrationCode(String email);

    String activateUser(String code);

    Map<String, Object> endRegistration(String email, String password);

    Map<String, Object> getUserByToken();

    String findEmail(String email);

    AuthUserProjection findByPasswordResetCode(String code);

    String sendPasswordResetCode(String email);

    String passwordReset(String email, String password, String password2);
}
