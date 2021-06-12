package com.gmail.merikbest2015.twitterspringreactjs.conroller;

import com.fasterxml.jackson.annotation.JsonView;
import com.gmail.merikbest2015.twitterspringreactjs.dto.Views;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.AuthenticationRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.PasswordResetRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.RegistrationRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.AuthenticationResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.UserResponse;
import com.gmail.merikbest2015.twitterspringreactjs.exception.ApiRequestException;
import com.gmail.merikbest2015.twitterspringreactjs.exception.InputFieldException;
import com.gmail.merikbest2015.twitterspringreactjs.mapper.AuthenticationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final AuthenticationMapper authenticationMapper;

    @PostMapping("/login")
    @JsonView(Views.User.class)
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            return ResponseEntity.ok(authenticationMapper.login(request.getEmail()));
        } catch (AuthenticationException e) {
            throw new ApiRequestException("Incorrect password or email", HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/registration")
    public ResponseEntity<String> registration(@Valid @RequestBody RegistrationRequest user, BindingResult bindingResult) {
        if (ControllerUtils.isPasswordDifferent(user.getPassword(), user.getPassword2())) {
            throw new ApiRequestException("Passwords do not match.", HttpStatus.BAD_REQUEST);
        }
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        if (!authenticationMapper.registration(user)) {
            throw new ApiRequestException("Email is already used.", HttpStatus.FORBIDDEN);
        }
        return ResponseEntity.ok("User successfully registered.");
    }

    @GetMapping("/user")
    @JsonView(Views.User.class)
    public ResponseEntity<AuthenticationResponse> getUserByToken() {
        return ResponseEntity.ok(authenticationMapper.getUserByToken());
    }

    @GetMapping("/activate/{code}")
    public ResponseEntity<String> activateEmailCode(@PathVariable String code) {
        if (!authenticationMapper.activateUser(code)) {
            throw new ApiRequestException("Activation code not found.", HttpStatus.NOT_FOUND);
        } else {
            return ResponseEntity.ok("User successfully activated.");
        }
    }

    @PostMapping("/forgot")
    public ResponseEntity<String> forgotPassword(@RequestBody PasswordResetRequest passwordReset) {
        boolean forgotPassword = authenticationMapper.sendPasswordResetCode(passwordReset.getEmail());
        if (!forgotPassword) {
            throw new ApiRequestException("Email not found", HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok("Reset password code is send to your E-mail");
    }

    @GetMapping("/reset/{code}")
    public ResponseEntity<UserResponse> getPasswordResetCode(@PathVariable String code) {
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
