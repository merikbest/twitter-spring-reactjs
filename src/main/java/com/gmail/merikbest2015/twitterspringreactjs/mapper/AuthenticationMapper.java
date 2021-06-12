package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.RegistrationRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.AuthenticationResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.UserResponse;
import com.gmail.merikbest2015.twitterspringreactjs.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthenticationMapper {

    private final UserMapper userMapper;
    private final AuthenticationService authenticationService;

    public AuthenticationResponse login(String email) {
        return authenticationService.login(email);
    }

    public boolean registration(RegistrationRequest registrationRequest) {
        return authenticationService.registration(userMapper.convertToEntity(registrationRequest));
    }

    public AuthenticationResponse getUserByToken() {
        return authenticationService.getUserByToken();
    }

    public boolean activateUser(String code) {
        return authenticationService.activateUser(code);
    }

    public boolean sendPasswordResetCode(String email) {
        return authenticationService.sendPasswordResetCode(email);
    }

    public UserResponse findByPasswordResetCode(String code) {
        return userMapper.convertToUserResponse(authenticationService.findByPasswordResetCode(code));
    }

    public String passwordReset(String email, String password) {
        return authenticationService.passwordReset(email, password);
    }
}
