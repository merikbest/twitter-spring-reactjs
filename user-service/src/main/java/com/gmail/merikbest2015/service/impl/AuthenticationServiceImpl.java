package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.amqp.AmqpProducer;
import com.gmail.merikbest2015.dto.request.AuthenticationRequest;
import com.gmail.merikbest2015.dto.request.EmailRequest;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.exception.InputFieldException;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.UserRepository;
import com.gmail.merikbest2015.repository.projection.AuthUserProjection;
import com.gmail.merikbest2015.repository.projection.UserCommonProjection;
import com.gmail.merikbest2015.repository.projection.UserPrincipalProjection;
import com.gmail.merikbest2015.security.JwtProvider;
import com.gmail.merikbest2015.service.AuthenticationService;
import com.gmail.merikbest2015.service.util.UserServiceHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.UUID;

import static com.gmail.merikbest2015.constants.ErrorMessage.*;
import static com.gmail.merikbest2015.constants.PathConstants.AUTH_USER_ID_HEADER;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final UserServiceHelper userServiceHelper;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final AmqpProducer amqpProducer;

    @Override
    public Long getAuthenticatedUserId() {
        return getUserId();
    }

    @Override
    public User getAuthenticatedUser() {
        return userRepository.findById(getUserId())
                .orElseThrow(() -> new ApiRequestException(USER_NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    @Override
    public UserPrincipalProjection getUserPrincipalByEmail(String email) {
        return userRepository.getUserByEmail(email, UserPrincipalProjection.class)
                .orElseThrow(() -> new ApiRequestException(USER_NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    @Override
    public Map<String, Object> login(AuthenticationRequest request, BindingResult bindingResult) {
        userServiceHelper.processInputErrors(bindingResult);
        AuthUserProjection user = userRepository.getUserByEmail(request.getEmail(), AuthUserProjection.class)
                .orElseThrow(() -> new ApiRequestException(USER_NOT_FOUND, HttpStatus.NOT_FOUND));
        String token = jwtProvider.createToken(request.getEmail(), "USER");
        return Map.of("user", user, "token", token);
    }

    @Override
    public Map<String, Object> getUserByToken() {
        AuthUserProjection user = userRepository.getUserById(getUserId(), AuthUserProjection.class)
                .orElseThrow(() -> new ApiRequestException(USER_NOT_FOUND, HttpStatus.NOT_FOUND));
        String token = jwtProvider.createToken(user.getEmail(), "USER");
        return Map.of("user", user, "token", token);
    }

    @Override
    public String getExistingEmail(String email, BindingResult bindingResult) {
        userServiceHelper.processInputErrors(bindingResult);
        userRepository.getUserByEmail(email, UserCommonProjection.class)
                .orElseThrow(() -> new ApiRequestException(EMAIL_NOT_FOUND, HttpStatus.NOT_FOUND));
        return "Reset password code is send to your E-mail";
    }

    @Override
    @Transactional
    public String sendPasswordResetCode(String email, BindingResult bindingResult) {
        userServiceHelper.processInputErrors(bindingResult);
        UserCommonProjection user = userRepository.getUserByEmail(email, UserCommonProjection.class)
                .orElseThrow(() -> new ApiRequestException(EMAIL_NOT_FOUND, HttpStatus.NOT_FOUND));
        userRepository.updatePasswordResetCode(UUID.randomUUID().toString().substring(0, 7), user.getId());
        String passwordResetCode = userRepository.getPasswordResetCode(user.getId());
        EmailRequest request = EmailRequest.builder()
                .to(user.getEmail())
                .subject("Password reset")
                .template("password-reset-template")
                .attributes(Map.of(
                        "fullName", user.getFullName(),
                        "passwordResetCode", passwordResetCode))
                .build();
        amqpProducer.sendEmail(request);
        return "Reset password code is send to your E-mail";
    }

    @Override
    public AuthUserProjection getUserByPasswordResetCode(String code) {
        return userRepository.getByPasswordResetCode(code)
                .orElseThrow(() -> new ApiRequestException(INVALID_PASSWORD_RESET_CODE, HttpStatus.BAD_REQUEST));
    }

    @Override
    @Transactional
    public String passwordReset(String email, String password, String password2, BindingResult bindingResult) {
        userServiceHelper.processInputErrors(bindingResult);
        checkMatchPasswords(password, password2);
        UserCommonProjection user = userRepository.getUserByEmail(email, UserCommonProjection.class)
                .orElseThrow(() -> new InputFieldException(HttpStatus.NOT_FOUND, Map.of("email", EMAIL_NOT_FOUND)));
        userRepository.updatePassword(passwordEncoder.encode(password), user.getId());
        userRepository.updatePasswordResetCode(null, user.getId());
        return "Password successfully changed!";
    }

    @Override
    @Transactional
    public String currentPasswordReset(String currentPassword, String password, String password2, BindingResult bindingResult) {
        userServiceHelper.processInputErrors(bindingResult);
        Long authUserId = getAuthenticatedUserId();
        String userPassword = userRepository.getUserPasswordById(authUserId);

        if (!passwordEncoder.matches(currentPassword, userPassword)) {
            processPasswordException("currentPassword", INCORRECT_PASSWORD, HttpStatus.NOT_FOUND);
        }
        checkMatchPasswords(password, password2);
        userRepository.updatePassword(passwordEncoder.encode(password), authUserId);
        return "Your password has been successfully updated.";
    }

    private Long getUserId() {
        RequestAttributes attribs = RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = ((ServletRequestAttributes) attribs).getRequest();
        return Long.parseLong(request.getHeader(AUTH_USER_ID_HEADER));
    }

    private void checkMatchPasswords(String password, String password2) {
        if (password != null && !password.equals(password2)) {
            processPasswordException("password", PASSWORDS_NOT_MATCH, HttpStatus.BAD_REQUEST);
        }
    }

    private void processPasswordException(String paramName, String exceptionMessage, HttpStatus status) {
        throw new InputFieldException(status, Map.of(paramName, exceptionMessage));
    }
}
