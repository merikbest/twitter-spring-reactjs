package com.gmail.merikbest2015.twitterspringreactjs.controller;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.SettingsRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.UserResponse;
import com.gmail.merikbest2015.twitterspringreactjs.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/settings")
public class UserSettingsController {

    private final UserMapper userMapper;

    @PutMapping("/update/username")
    public ResponseEntity<UserResponse> updateUsername(@RequestBody SettingsRequest request) {
        return ResponseEntity.ok(userMapper.updateUsername(request));
    }

    @PutMapping("/update/email")
    public ResponseEntity<UserResponse> updateEmail(@RequestBody SettingsRequest request) {
        return ResponseEntity.ok(userMapper.updateEmail(request));
    }

    @PutMapping("/update/phone")
    public ResponseEntity<UserResponse> updatePhone(@RequestBody SettingsRequest request) {
        return ResponseEntity.ok(userMapper.updatePhone(request));
    }

    @PutMapping("/update/country")
    public ResponseEntity<UserResponse> updateCountry(@RequestBody SettingsRequest request) {
        return ResponseEntity.ok(userMapper.updateCountry(request));
    }

    @PutMapping("/update/gender")
    public ResponseEntity<UserResponse> updateGender(@RequestBody SettingsRequest request) {
        return ResponseEntity.ok(userMapper.updateGender(request));
    }

    @PutMapping("/update/language")
    public ResponseEntity<UserResponse> updateLanguage(@RequestBody SettingsRequest request) {
        return ResponseEntity.ok(userMapper.updateLanguage(request));
    }

    @PutMapping("/update/direct")
    public ResponseEntity<UserResponse> updateDirectMessageRequests(@RequestBody SettingsRequest request) {
        return ResponseEntity.ok(userMapper.updateDirectMessageRequests(request));
    }

    @PutMapping("/update/private")
    public ResponseEntity<UserResponse> updatePrivateProfile(@RequestBody SettingsRequest request) {
        return ResponseEntity.ok(userMapper.updatePrivateProfile(request));
    }
}
