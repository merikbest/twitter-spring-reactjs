package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.AuthenticationRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.PasswordResetRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.RegistrationRequest;
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

    public AuthenticationResponse login(AuthenticationRequest request) {
        Map<String, Object> credentials = authenticationService.login(request.getEmail(), request.getPassword());
        AuthenticationResponse response = new AuthenticationResponse();
        response.setUser(userMapper.convertToUserResponse((User) credentials.get("user")));
        response.setToken((String) credentials.get("token"));
        return response;
    }

    public String registration(RegistrationRequest request) {
        return authenticationService.registration(request.getEmail(), request.getUsername(), request.getBirthday());
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

    public String passwordReset(PasswordResetRequest request) {
        return authenticationService.passwordReset(request.getEmail(), request.getPassword(), request.getPassword2());
    }

    public String findEmail(String email) {
        return authenticationService.findEmail(email);
    }

    public String sendRegistrationCode(String email) {
        return authenticationService.sendRegistrationCode(email);
    }

    public AuthenticationResponse endRegistration(RegistrationRequest request) {
        Map<String, Object> credentials = authenticationService.endRegistration(request.getEmail(), request.getPassword());
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        authenticationResponse.setUser(userMapper.convertToUserResponse((User) credentials.get("user")));
        authenticationResponse.setToken((String) credentials.get("token"));
        return authenticationResponse;
    }
}
