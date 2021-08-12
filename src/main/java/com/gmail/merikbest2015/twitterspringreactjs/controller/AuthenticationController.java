package com.gmail.merikbest2015.twitterspringreactjs.controller;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.AuthenticationRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.PasswordResetRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.RegistrationRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.AuthenticationResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.UserResponse;
import com.gmail.merikbest2015.twitterspringreactjs.exception.ApiRequestException;
import com.gmail.merikbest2015.twitterspringreactjs.mapper.AuthenticationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final AuthenticationMapper authenticationMapper;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            return ResponseEntity.ok(authenticationMapper.login(request.getEmail()));
        } catch (AuthenticationException e) {
            throw new ApiRequestException("Incorrect password or email", HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/registration/check")
    public ResponseEntity<String> checkEmail(@RequestBody RegistrationRequest request) {
        boolean isRegistered = authenticationMapper.registration(request.getEmail(), request.getUsername(), request.getBirthday());

        if (!isRegistered) {
            throw new ApiRequestException("Email has already been taken.", HttpStatus.FORBIDDEN);
        } else {
            return ResponseEntity.ok("User successfully registered.");
        }
    }

    @PostMapping("/registration/code")
    public ResponseEntity<String> sendRegistrationCode(@RequestBody RegistrationRequest request) {
        authenticationMapper.sendRegistrationCode(request.getEmail());
        return ResponseEntity.ok("Registration code sent successfully");
    }

    @GetMapping("/registration/activate/{code}")
    public ResponseEntity<String> checkRegistrationCode(@PathVariable String code) {
        if (!authenticationMapper.activateUser(code)) {
            throw new ApiRequestException("Activation code not found.", HttpStatus.NOT_FOUND);
        } else {
            return ResponseEntity.ok("User successfully activated.");
        }
    }

    @PostMapping("/registration/confirm")
    public ResponseEntity<AuthenticationResponse> endRegistration(@RequestBody RegistrationRequest request) {
        return ResponseEntity.ok(authenticationMapper.endRegistration(request.getEmail(), request.getPassword()));
    }

    @GetMapping("/user")
    public ResponseEntity<AuthenticationResponse> getUserByToken() {
        return ResponseEntity.ok(authenticationMapper.getUserByToken());
    }

    @PostMapping("/forgot/email")
    public ResponseEntity<String> findExistingEmail(@RequestBody PasswordResetRequest passwordReset) {
        boolean isEmailExist = authenticationMapper.findEmail(passwordReset.getEmail());
        if (!isEmailExist) {
            throw new ApiRequestException("Email not found", HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok("Reset password code is send to your E-mail");
    }

    @PostMapping("/forgot")
    public ResponseEntity<String> sendPasswordResetCode(@RequestBody PasswordResetRequest passwordReset) {
        authenticationMapper.sendPasswordResetCode(passwordReset.getEmail());
        return ResponseEntity.ok("Reset password code is send to your E-mail");
    }

    @GetMapping("/reset/{code}")
    public ResponseEntity<UserResponse> getUserByResetCode(@PathVariable String code) {
        UserResponse user = authenticationMapper.findByPasswordResetCode(code);
        if (user == null) {
            throw new ApiRequestException("Password reset code is invalid!", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(user);
    }

    @PostMapping("/reset")
    public ResponseEntity<String> passwordReset(@RequestBody PasswordResetRequest passwordReset) {
        if (ControllerUtils.isPasswordConfirmEmpty(passwordReset.getPassword2())) {
            throw new ApiRequestException("Password confirmation cannot be empty.", HttpStatus.BAD_REQUEST);
        }
        if (ControllerUtils.isPasswordDifferent(passwordReset.getPassword(), passwordReset.getPassword2())) {
            throw new ApiRequestException("Passwords do not match.", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(authenticationMapper.passwordReset(passwordReset.getEmail(), passwordReset.getPassword()));
    }
}
