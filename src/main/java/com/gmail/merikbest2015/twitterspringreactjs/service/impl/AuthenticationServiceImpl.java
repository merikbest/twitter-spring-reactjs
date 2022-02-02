package com.gmail.merikbest2015.twitterspringreactjs.service.impl;

import com.gmail.merikbest2015.twitterspringreactjs.exception.ApiRequestException;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import com.gmail.merikbest2015.twitterspringreactjs.repository.UserRepository;
import com.gmail.merikbest2015.twitterspringreactjs.security.JwtProvider;
import com.gmail.merikbest2015.twitterspringreactjs.security.UserPrincipal;
import com.gmail.merikbest2015.twitterspringreactjs.service.AuthenticationService;
import com.gmail.merikbest2015.twitterspringreactjs.service.email.MailSender;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final MailSender mailSender;

    @Override
    public Long getAuthenticatedUserId() {
        return ((UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
    }

    @Override
    public User getAuthenticatedUser() {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new ApiRequestException("User not found", HttpStatus.NOT_FOUND));
    }

    @Override
    public Map<String, Object> login(String email, String password) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new ApiRequestException("User not found", HttpStatus.NOT_FOUND));
            String token = jwtProvider.createToken(email, "USER");
            Map<String, Object> response = new HashMap<>();
            response.put("user", user);
            response.put("token", token);
            return response;
        } catch (AuthenticationException e) {
            throw new ApiRequestException("Incorrect password or email", HttpStatus.FORBIDDEN);
        }
    }

    @Override
    public String registration(String email, String username, String birthday) {
        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isEmpty()) {
            User user = new User();
            user.setEmail(email);
            user.setUsername(username);
            user.setFullName(username);
            user.setBirthday(birthday);
            user.setRole("USER");
            userRepository.save(user);
            return "User data checked.";
        }

        if (!existingUser.get().isActive()) {
            existingUser.get().setUsername(username);
            existingUser.get().setFullName(username);
            existingUser.get().setBirthday(birthday);
            existingUser.get().setRegistrationDate(LocalDateTime.now().withNano(0));
            existingUser.get().setRole("USER");
            userRepository.save(existingUser.get());
            return "User data checked.";
        }
        throw new ApiRequestException("Email has already been taken.", HttpStatus.FORBIDDEN);
    }

    @Override
    public String sendRegistrationCode(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiRequestException("User not found", HttpStatus.NOT_FOUND));
        user.setActivationCode(UUID.randomUUID().toString().substring(0, 7));
        userRepository.save(user);

        String subject = "Registration code";
        String template = "registration-template";
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("fullName", user.getFullName());
        attributes.put("registrationCode", user.getActivationCode());
        mailSender.sendMessageHtml(user.getEmail(), subject, template, attributes);
        return "Registration code sent successfully";
    }

    @Override
    public String activateUser(String code) {
        User user = userRepository.findByActivationCode(code)
                .orElseThrow(() -> new ApiRequestException("Activation code not found.", HttpStatus.NOT_FOUND));
        user.setActivationCode(null);
        userRepository.save(user);
        return "User successfully activated.";
    }

    @Override
    public Map<String, Object> endRegistration(String email, String password) {
        if (password.length() < 8) {
            throw  new ApiRequestException("Your password needs to be at least 8 characters", HttpStatus.BAD_REQUEST);
        }
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiRequestException("User not found", HttpStatus.NOT_FOUND));
        user.setPassword(passwordEncoder.encode(password));
        user.setActive(true);
        userRepository.save(user);

        String token = jwtProvider.createToken(email, "USER");
        Map<String, Object> response = new HashMap<>();
        response.put("user", user);
        response.put("token", token);
        return response;
    }

    @Override
    public Map<String, Object> getUserByToken() {
        User user = getAuthenticatedUser();
        String token = jwtProvider.createToken(user.getEmail(), "USER");
        Map<String, Object> response = new HashMap<>();
        response.put("user", user);
        response.put("token", token);
        return response;
    }

    @Override
    public String findEmail(String email) {
        userRepository.findUserPrincipalByEmail(email)
                .orElseThrow(() -> new ApiRequestException("Email not found", HttpStatus.NOT_FOUND));
        return "Reset password code is send to your E-mail";
    }

    @Override
    public User findByPasswordResetCode(String code) {
        return userRepository.findByPasswordResetCode(code)
                .orElseThrow(() -> new ApiRequestException("Password reset code is invalid!", HttpStatus.BAD_REQUEST));
    }

    @Override
    public String sendPasswordResetCode(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiRequestException("Email not found", HttpStatus.NOT_FOUND));
        user.setPasswordResetCode(UUID.randomUUID().toString().substring(0, 7));
        userRepository.save(user);

        String subject = "Password reset";
        String template = "password-reset-template";
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("fullName", user.getFullName());
        attributes.put("passwordResetCode", user.getPasswordResetCode());
        mailSender.sendMessageHtml(user.getEmail(), subject, template, attributes);
        return "Reset password code is send to your E-mail";
    }

    @Override
    public String passwordReset(String email, String password, String password2) {
        if (StringUtils.isEmpty(password2)) {
            throw new ApiRequestException("Password confirmation cannot be empty.", HttpStatus.BAD_REQUEST);
        }
        if (password != null && !password.equals(password2)) {
            throw new ApiRequestException("Passwords do not match.", HttpStatus.BAD_REQUEST);
        }
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiRequestException("Email not found", HttpStatus.NOT_FOUND));
        user.setPassword(passwordEncoder.encode(password));
        user.setPasswordResetCode(null);
        userRepository.save(user);
        return "Password successfully changed!";
    }
}
