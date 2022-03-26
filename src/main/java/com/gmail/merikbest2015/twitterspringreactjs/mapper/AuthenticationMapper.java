package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.*;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.AuthUserResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.AuthenticationResponse;
import com.gmail.merikbest2015.twitterspringreactjs.exception.InputFieldException;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.user.AuthUserProjection;
import com.gmail.merikbest2015.twitterspringreactjs.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class AuthenticationMapper {

    private final ModelMapper modelMapper;
    private final AuthenticationService authenticationService;

    AuthenticationResponse getAuthenticationResponse(Map<String, Object> credentials) {
        AuthenticationResponse response = new AuthenticationResponse();
        response.setUser(modelMapper.map(credentials.get("user"), AuthUserResponse.class));
        response.setToken((String) credentials.get("token"));
        return response;
    }

    private void processInputErrors(BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
    }

    public AuthenticationResponse login(AuthenticationRequest request, BindingResult bindingResult) {
        processInputErrors(bindingResult);
        return getAuthenticationResponse(authenticationService.login(request.getEmail(), request.getPassword()));
    }

    public String registration(RegistrationRequest request, BindingResult bindingResult) {
        processInputErrors(bindingResult);
        return authenticationService.registration(request.getEmail(), request.getUsername(), request.getBirthday());
    }

    public AuthenticationResponse getUserByToken() {
        return getAuthenticationResponse(authenticationService.getUserByToken());
    }

    public String activateUser(String code) {
        return authenticationService.activateUser(code);
    }

    public String sendPasswordResetCode(String email, BindingResult bindingResult) {
        processInputErrors(bindingResult);
        return authenticationService.sendPasswordResetCode(email);
    }

    public AuthUserResponse findByPasswordResetCode(String code) {
        AuthUserProjection user = authenticationService.findByPasswordResetCode(code);
        return modelMapper.map(user, AuthUserResponse.class);
    }

    public String passwordReset(PasswordResetRequest request, BindingResult bindingResult) {
        processInputErrors(bindingResult);
        return authenticationService.passwordReset(request.getEmail(), request.getPassword(), request.getPassword2());
    }

    public String findEmail(String email, BindingResult bindingResult) {
        processInputErrors(bindingResult);
        return authenticationService.findEmail(email);
    }

    public String sendRegistrationCode(String email, BindingResult bindingResult) {
        processInputErrors(bindingResult);
        return authenticationService.sendRegistrationCode(email);
    }

    public AuthenticationResponse endRegistration(EndRegistrationRequest request, BindingResult bindingResult) {
        processInputErrors(bindingResult);
        return getAuthenticationResponse(authenticationService.endRegistration(request.getEmail(), request.getPassword()));
    }

    public String currentPasswordReset(CurrentPasswordResetRequest request, BindingResult bindingResult) {
        processInputErrors(bindingResult);
        return authenticationService.currentPasswordReset(request.getCurrentPassword(), request.getPassword(), request.getPassword2());
    }
}
