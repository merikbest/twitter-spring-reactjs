package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.AuthenticationRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.PasswordResetRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.RegistrationRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.AuthUserProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.AuthenticationProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.user.AuthUserProjection;
import com.gmail.merikbest2015.twitterspringreactjs.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class AuthenticationMapper {

    private final ModelMapper modelMapper;
    private final AuthenticationService authenticationService;

    AuthenticationProjectionResponse getAuthenticationProjectionResponse(Map<String, Object> credentials) {
        AuthenticationProjectionResponse response = new AuthenticationProjectionResponse();
        response.setUser(modelMapper.map(credentials.get("user"), AuthUserProjectionResponse.class));
        response.setToken((String) credentials.get("token"));
        return response;
    }

    public AuthenticationProjectionResponse login(AuthenticationRequest request) {
        return getAuthenticationProjectionResponse(authenticationService.login(request.getEmail(), request.getPassword()));
    }

    public String registration(RegistrationRequest request) {
        return authenticationService.registration(request.getEmail(), request.getUsername(), request.getBirthday());
    }

    public AuthenticationProjectionResponse getUserByToken() {
        return getAuthenticationProjectionResponse(authenticationService.getUserByToken());
    }

    public String activateUser(String code) {
        return authenticationService.activateUser(code);
    }

    public String sendPasswordResetCode(String email) {
        return authenticationService.sendPasswordResetCode(email);
    }

    public AuthUserProjectionResponse findByPasswordResetCode(String code) {
        AuthUserProjection user = authenticationService.findByPasswordResetCode(code);
        return modelMapper.map(user, AuthUserProjectionResponse.class);
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

    public AuthenticationProjectionResponse endRegistration(RegistrationRequest request) {
        return getAuthenticationProjectionResponse(authenticationService.endRegistration(request.getEmail(), request.getPassword()));
    }
}
