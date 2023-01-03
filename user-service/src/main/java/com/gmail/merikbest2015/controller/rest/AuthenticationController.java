package com.gmail.merikbest2015.controller.rest;

import com.gmail.merikbest2015.commons.dto.AuthUserResponse;
import com.gmail.merikbest2015.commons.dto.AuthenticationResponse;
import com.gmail.merikbest2015.dto.request.*;
import com.gmail.merikbest2015.mapper.AuthenticationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ui/v1/auth")
public class AuthenticationController {

    private final AuthenticationMapper authenticationMapper;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@Valid @RequestBody AuthenticationRequest request, BindingResult bindingResult) {
        return ResponseEntity.ok(authenticationMapper.login(request, bindingResult));
    }

    @PostMapping("/registration/check")
    public ResponseEntity<String> checkEmail(@Valid @RequestBody RegistrationRequest request, BindingResult bindingResult) {
        return ResponseEntity.ok(authenticationMapper.registration(request, bindingResult));
    }

    @PostMapping("/registration/code")
    public ResponseEntity<String> sendRegistrationCode(@Valid @RequestBody ProcessEmailRequest request, BindingResult bindingResult) {
        return ResponseEntity.ok(authenticationMapper.sendRegistrationCode(request.getEmail(), bindingResult));
    }

    @GetMapping("/registration/activate/{code}")
    public ResponseEntity<String> checkRegistrationCode(@PathVariable String code) {
        return ResponseEntity.ok(authenticationMapper.activateUser(code));
    }

    @PostMapping("/registration/confirm")
    public ResponseEntity<AuthenticationResponse> endRegistration(@Valid @RequestBody EndRegistrationRequest request, BindingResult bindingResult) {
        return ResponseEntity.ok(authenticationMapper.endRegistration(request, bindingResult));
    }

    @GetMapping("/user")
    public ResponseEntity<AuthenticationResponse> getUserByToken() {
        return ResponseEntity.ok(authenticationMapper.getUserByToken());
    }

    @PostMapping("/forgot/email")
    public ResponseEntity<String> findExistingEmail(@Valid @RequestBody ProcessEmailRequest request, BindingResult bindingResult) {
        return ResponseEntity.ok(authenticationMapper.findEmail(request.getEmail(), bindingResult));
    }

    @PostMapping("/forgot")
    public ResponseEntity<String> sendPasswordResetCode(@Valid @RequestBody ProcessEmailRequest request, BindingResult bindingResult) {
        return ResponseEntity.ok(authenticationMapper.sendPasswordResetCode(request.getEmail(), bindingResult));
    }

    @GetMapping("/reset/{code}")
    public ResponseEntity<AuthUserResponse> getUserByResetCode(@PathVariable String code) {
        return ResponseEntity.ok(authenticationMapper.findByPasswordResetCode(code));
    }

    @PostMapping("/reset")
    public ResponseEntity<String> passwordReset(@Valid @RequestBody PasswordResetRequest request, BindingResult bindingResult) {
        return ResponseEntity.ok(authenticationMapper.passwordReset(request, bindingResult));
    }

    @PostMapping("/reset/current")
    public ResponseEntity<String> currentPasswordReset(@Valid @RequestBody CurrentPasswordResetRequest request, BindingResult bindingResult) {
        return ResponseEntity.ok(authenticationMapper.currentPasswordReset(request, bindingResult));
    }
}
