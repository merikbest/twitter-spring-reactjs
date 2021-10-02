package com.gmail.merikbest2015.twitterspringreactjs.controller;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.AuthenticationRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.PasswordResetRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.RegistrationRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.AuthenticationResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.UserResponse;
import com.gmail.merikbest2015.twitterspringreactjs.mapper.AuthenticationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    private final AuthenticationMapper authenticationMapper;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationMapper.login(request.getEmail(), request.getPassword()));
    }

    @PostMapping("/registration/check")
    public ResponseEntity<String> checkEmail(@RequestBody RegistrationRequest request) {
        return ResponseEntity.ok(authenticationMapper.registration(request.getEmail(), request.getUsername(), request.getBirthday()));
    }

    @PostMapping("/registration/code")
    public ResponseEntity<String> sendRegistrationCode(@RequestBody RegistrationRequest request) {
        return ResponseEntity.ok(authenticationMapper.sendRegistrationCode(request.getEmail()));
    }

    @GetMapping("/registration/activate/{code}")
    public ResponseEntity<String> checkRegistrationCode(@PathVariable String code) {
        return ResponseEntity.ok(authenticationMapper.activateUser(code));
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
        return ResponseEntity.ok(authenticationMapper.findEmail(passwordReset.getEmail()));
    }

    @PostMapping("/forgot")
    public ResponseEntity<String> sendPasswordResetCode(@RequestBody PasswordResetRequest passwordReset) {
        return ResponseEntity.ok(authenticationMapper.sendPasswordResetCode(passwordReset.getEmail()));
    }

    @GetMapping("/reset/{code}")
    public ResponseEntity<UserResponse> getUserByResetCode(@PathVariable String code) {
        return ResponseEntity.ok(authenticationMapper.findByPasswordResetCode(code));
    }

    @PostMapping("/reset")
    public ResponseEntity<String> passwordReset(@RequestBody PasswordResetRequest passwordReset) {
        return ResponseEntity.ok(authenticationMapper.passwordReset(passwordReset.getEmail(), passwordReset.getPassword(), passwordReset.getPassword2()));
    }
}
