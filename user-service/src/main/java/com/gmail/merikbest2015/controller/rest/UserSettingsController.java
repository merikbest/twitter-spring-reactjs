package com.gmail.merikbest2015.controller.rest;

import com.gmail.merikbest2015.dto.AuthenticationResponse;
import com.gmail.merikbest2015.dto.request.SettingsRequest;
import com.gmail.merikbest2015.dto.response.UserPhoneResponse;
import com.gmail.merikbest2015.enums.BackgroundColorType;
import com.gmail.merikbest2015.enums.ColorSchemeType;
import com.gmail.merikbest2015.mapper.UserSettingsMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ui/v1/settings")
public class UserSettingsController {

    private final UserSettingsMapper userSettingsMapper;

    @PutMapping("/update/username")
    public ResponseEntity<String> updateUsername(@RequestBody SettingsRequest request) {
        return ResponseEntity.ok(userSettingsMapper.updateUsername(request));
    }

    @PutMapping("/update/email")
    public ResponseEntity<AuthenticationResponse> updateEmail(@RequestBody SettingsRequest request) {
        return ResponseEntity.ok(userSettingsMapper.updateEmail(request));
    }

    @PutMapping("/update/phone")
    public ResponseEntity<UserPhoneResponse> updatePhone(@RequestBody SettingsRequest request) {
        return ResponseEntity.ok(userSettingsMapper.updatePhone(request));
    }

    @PutMapping("/update/country")
    public ResponseEntity<String> updateCountry(@RequestBody SettingsRequest request) {
        return ResponseEntity.ok(userSettingsMapper.updateCountry(request));
    }

    @PutMapping("/update/gender")
    public ResponseEntity<String> updateGender(@RequestBody SettingsRequest request) {
        return ResponseEntity.ok(userSettingsMapper.updateGender(request));
    }

    @PutMapping("/update/language")
    public ResponseEntity<String> updateLanguage(@RequestBody SettingsRequest request) {
        return ResponseEntity.ok(userSettingsMapper.updateLanguage(request));
    }

    @PutMapping("/update/direct")
    public ResponseEntity<Boolean> updateDirectMessageRequests(@RequestBody SettingsRequest request) {
        return ResponseEntity.ok(userSettingsMapper.updateDirectMessageRequests(request));
    }

    @PutMapping("/update/private")
    public ResponseEntity<Boolean> updatePrivateProfile(@RequestBody SettingsRequest request) {
        return ResponseEntity.ok(userSettingsMapper.updatePrivateProfile(request));
    }

    @PutMapping("/update/color_scheme")
    public ResponseEntity<ColorSchemeType> updateColorScheme(@RequestBody SettingsRequest request) {
        return ResponseEntity.ok(userSettingsMapper.updateColorScheme(request));
    }

    @PutMapping("/update/background_color")
    public ResponseEntity<BackgroundColorType> updateBackgroundColor(@RequestBody SettingsRequest request) {
        return ResponseEntity.ok(userSettingsMapper.updateBackgroundColor(request));
    }
}
