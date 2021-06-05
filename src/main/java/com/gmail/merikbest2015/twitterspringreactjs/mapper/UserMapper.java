package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.RegistrationRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.UserResponse;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import com.gmail.merikbest2015.twitterspringreactjs.service.AuthenticationService;
import com.gmail.merikbest2015.twitterspringreactjs.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final ModelMapper modelMapper;
    private final UserService userService;
    private final AuthenticationService authenticationService;

    private UserResponse convertToResponseDto(User user) {
        return modelMapper.map(user, UserResponse.class);
    }

    private User convertToEntity(RegistrationRequest registrationRequest) {
        return modelMapper.map(registrationRequest, User.class);
    }

    public UserResponse getUserById(Long userId) {
        return convertToResponseDto(userService.getUserById(userId));
    }

    public Map<String, Object> login(String email) {
        return authenticationService.login(email);
    }

    public boolean registration(RegistrationRequest registrationRequest) {
        return authenticationService.registration(convertToEntity(registrationRequest));
    }

    public boolean activateUser(String code) {
        return authenticationService.activateUser(code);
    }

    public boolean sendPasswordResetCode(String email) {
        return authenticationService.sendPasswordResetCode(email);
    }

    public UserResponse findByPasswordResetCode(String code) {
        return convertToResponseDto(authenticationService.findByPasswordResetCode(code));
    }

    public String passwordReset(String email, String password) {
        return authenticationService.passwordReset(email, password);
    }
}
