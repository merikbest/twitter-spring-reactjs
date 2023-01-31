package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.dto.EmailRequest;
import com.gmail.merikbest2015.dto.request.AuthenticationRequest;
import com.gmail.merikbest2015.dto.request.RegistrationRequest;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.exception.InputFieldException;
import com.gmail.merikbest2015.feign.EmailClient;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.UserRepository;
import com.gmail.merikbest2015.repository.projection.AuthUserProjection;
import com.gmail.merikbest2015.repository.projection.UserCommonProjection;
import com.gmail.merikbest2015.repository.projection.UserPrincipalProjection;
import com.gmail.merikbest2015.security.JwtProvider;
import com.gmail.merikbest2015.service.AuthenticationService;
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
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final EmailClient emailClient;

    @Override
    public Long getAuthenticatedUserId() {
        return getUserId();
    }

    @Override
    public AuthUserProjection getAuthenticatedUserProjection() {
        return userRepository.getUserById(getUserId(), AuthUserProjection.class)
                .orElseThrow(() -> new ApiRequestException("User not found", HttpStatus.NOT_FOUND));
    }

    @Override
    public User getAuthenticatedUser() {
        return userRepository.findById(getUserId())
                .orElseThrow(() -> new ApiRequestException("User not found", HttpStatus.NOT_FOUND));
    }

    @Override
    public UserPrincipalProjection getUserPrincipalByEmail(String email) {
        return userRepository.getUserByEmail(email, UserPrincipalProjection.class)
                .orElseThrow(() -> new ApiRequestException("User not found", HttpStatus.NOT_FOUND));
    }

    @Override
    public Map<String, Object> login(AuthenticationRequest request, BindingResult bindingResult) {
        processInputErrors(bindingResult);
        AuthUserProjection user = userRepository.getUserByEmail(request.getEmail(), AuthUserProjection.class)
                .orElseThrow(() -> new ApiRequestException("User not found", HttpStatus.NOT_FOUND));
        String token = jwtProvider.createToken(request.getEmail(), "USER");
        Map<String, Object> response = new HashMap<>();
        response.put("user", user);
        response.put("token", token);
        return response;
    }

    @Override
    @Transactional
    public String registration(RegistrationRequest request, BindingResult bindingResult) {
        Optional<User> existingUser = userRepository.getUserByEmail(request.getEmail(), User.class);

        if (existingUser.isEmpty()) {
            User user = new User();
            user.setEmail(request.getEmail());
            user.setUsername(request.getUsername());
            user.setFullName(request.getUsername());
            user.setBirthday(request.getBirthday());
            user.setRole("USER");
            userRepository.save(user);
            return "User data checked.";
        }

        if (!existingUser.get().isActive()) {
            existingUser.get().setUsername(request.getUsername());
            existingUser.get().setFullName(request.getUsername());
            existingUser.get().setBirthday(request.getBirthday());
            existingUser.get().setRegistrationDate(LocalDateTime.now().withNano(0));
            existingUser.get().setRole("USER");
            userRepository.save(existingUser.get());
            return "User data checked.";
        }
        throw new ApiRequestException("Email has already been taken.", HttpStatus.FORBIDDEN);
    }

    @Override
    @Transactional
    public String sendRegistrationCode(String email) {
        UserCommonProjection user = userRepository.getUserByEmail(email, UserCommonProjection.class)
                .orElseThrow(() -> new ApiRequestException("User not found", HttpStatus.NOT_FOUND));
        userRepository.updateActivationCode(UUID.randomUUID().toString().substring(0, 7), user.getId());
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("fullName", user.getFullName());
        attributes.put("registrationCode", user.getActivationCode());
        emailClient.sendEmail(new EmailRequest(user.getEmail(), "Registration code", "registration-template", attributes));
        return "Registration code sent successfully";
    }

    @Override
    @Transactional
    public String activateUser(String code) {
        UserCommonProjection user = userRepository.getCommonUserByActivationCode(code)
                .orElseThrow(() -> new ApiRequestException("Activation code not found.", HttpStatus.NOT_FOUND));
        userRepository.updateActivationCode(null, user.getId());
        return "User successfully activated.";
    }

    @Override
    @Transactional
    public Map<String, Object> endRegistration(String email, String password) {
        if (password.length() < 8) {
            throw new ApiRequestException("Your password needs to be at least 8 characters", HttpStatus.BAD_REQUEST);
        }
        AuthUserProjection user = userRepository.getUserByEmail(email, AuthUserProjection.class)
                .orElseThrow(() -> new ApiRequestException("User not found", HttpStatus.NOT_FOUND));
        userRepository.updatePassword(passwordEncoder.encode(password), user.getId());
        userRepository.updateActiveUserProfile(user.getId());
        String token = jwtProvider.createToken(email, "USER");
        Map<String, Object> response = new HashMap<>();
        response.put("user", user);
        response.put("token", token);
        return response;
    }

    @Override
    public Map<String, Object> getUserByToken() {
        AuthUserProjection user = userRepository.getUserById(getUserId(), AuthUserProjection.class)
                .orElseThrow(() -> new ApiRequestException("User not found", HttpStatus.NOT_FOUND));
        String token = jwtProvider.createToken(user.getEmail(), "USER");
        Map<String, Object> response = new HashMap<>();
        response.put("user", user);
        response.put("token", token);
        return response;
    }

    @Override
    public String getEmail(String email) {
        userRepository.getUserByEmail(email, UserCommonProjection.class)
                .orElseThrow(() -> new ApiRequestException("Email not found", HttpStatus.NOT_FOUND));
        return "Reset password code is send to your E-mail";
    }

    @Override
    public AuthUserProjection getByPasswordResetCode(String code) {
        return userRepository.getByPasswordResetCode(code)
                .orElseThrow(() -> new ApiRequestException("Password reset code is invalid!", HttpStatus.BAD_REQUEST));
    }

    @Override
    @Transactional
    public String sendPasswordResetCode(String email) {
        UserCommonProjection user = userRepository.getUserByEmail(email, UserCommonProjection.class)
                .orElseThrow(() -> new ApiRequestException("Email not found", HttpStatus.NOT_FOUND));
        userRepository.updatePasswordResetCode(UUID.randomUUID().toString().substring(0, 7), user.getId());
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("fullName", user.getFullName());
        attributes.put("passwordResetCode", user.getPasswordResetCode());
        emailClient.sendEmail(new EmailRequest(user.getEmail(), "Password reset", "password-reset-template", attributes));
        return "Reset password code is send to your E-mail";
    }

    @Override
    @Transactional
    public String passwordReset(String email, String password, String password2) {
        checkMatchPasswords(password, password2);
        UserCommonProjection user = userRepository.getUserByEmail(email, UserCommonProjection.class)
                .orElseThrow(() -> new InputFieldException(HttpStatus.NOT_FOUND, Map.of("email", "Email not found")));
        userRepository.updatePassword(passwordEncoder.encode(password), user.getId());
        userRepository.updatePasswordResetCode(null, user.getId());
        return "Password successfully changed!";
    }

    @Override
    @Transactional
    public String currentPasswordReset(String currentPassword, String password, String password2) {
        Long userId = getAuthenticatedUserId();
        String userPassword = userRepository.getUserPasswordById(userId);

        if (!passwordEncoder.matches(currentPassword, userPassword)) {
            processPasswordException("currentPassword", "The password you entered was incorrect.", HttpStatus.NOT_FOUND);
        }
        checkMatchPasswords(password, password2);
        userRepository.updatePassword(passwordEncoder.encode(password), userId);
        return "Your password has been successfully updated.";
    }

    private Long getUserId() {
        RequestAttributes attribs = RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = ((ServletRequestAttributes) attribs).getRequest();
        return Long.parseLong(request.getHeader("X-auth-user-id"));
    }

    private void processInputErrors(BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
    }

    private void checkMatchPasswords(String password, String password2) {
        if (password != null && !password.equals(password2)) {
            processPasswordException("password", "Passwords do not match.", HttpStatus.BAD_REQUEST);
        }
    }

    private void processPasswordException(String paramName, String exceptionMessage, HttpStatus status) {
        throw new InputFieldException(status, Map.of(paramName, exceptionMessage));
    }
}
