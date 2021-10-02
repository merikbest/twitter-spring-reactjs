package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.AuthenticationResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.UserResponse;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import com.gmail.merikbest2015.twitterspringreactjs.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class AuthenticationMapper {

    private final UserMapper userMapper;
    private final AuthenticationService authenticationService;

    public AuthenticationResponse login(String email, String password) {
        Map<String, Object> credentials = authenticationService.login(email, password);
        AuthenticationResponse response = new AuthenticationResponse();
        response.setUser(userMapper.convertToUserResponse((User) credentials.get("user")));
        response.setToken((String) credentials.get("token"));
        return response;
    }

    public String registration(String email, String username, String birthday) {
        return authenticationService.registration(email, username, birthday);
    }

    public AuthenticationResponse getUserByToken() {
        Map<String, Object> credentials = authenticationService.getUserByToken();
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        authenticationResponse.setUser(userMapper.convertToUserResponse((User) credentials.get("user")));
        authenticationResponse.setToken((String) credentials.get("token"));
        return authenticationResponse;
    }

    public String activateUser(String code) {
        return authenticationService.activateUser(code);
    }

    public String sendPasswordResetCode(String email) {
        return authenticationService.sendPasswordResetCode(email);
    }

    public UserResponse findByPasswordResetCode(String code) {
        return userMapper.convertToUserResponse(authenticationService.findByPasswordResetCode(code));
    }

    public String passwordReset(String email, String password, String password2) {
        return authenticationService.passwordReset(email, password, password2);
    }

    public String findEmail(String email) {
        return authenticationService.findEmail(email);
    }

    public String sendRegistrationCode(String email) {
        return authenticationService.sendRegistrationCode(email);
    }

    public AuthenticationResponse endRegistration(String email, String password) {
        Map<String, Object> credentials = authenticationService.endRegistration(email, password);
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        authenticationResponse.setUser(userMapper.convertToUserResponse((User) credentials.get("user")));
        authenticationResponse.setToken((String) credentials.get("token"));
        return authenticationResponse;
    }
}
