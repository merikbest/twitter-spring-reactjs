package com.gmail.merikbest2015.twitterspringreactjs.service.impl;

import com.gmail.merikbest2015.twitterspringreactjs.exception.ApiRequestException;
import com.gmail.merikbest2015.twitterspringreactjs.model.BackgroundColorType;
import com.gmail.merikbest2015.twitterspringreactjs.model.ColorSchemeType;
import com.gmail.merikbest2015.twitterspringreactjs.repository.UserRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.user.AuthUserProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.user.UserCommonProjection;
import com.gmail.merikbest2015.twitterspringreactjs.security.JwtProvider;
import com.gmail.merikbest2015.twitterspringreactjs.service.AuthenticationService;
import com.gmail.merikbest2015.twitterspringreactjs.service.UserSettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserSettingsServiceImpl implements UserSettingsService {

    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    @Override
    @Transactional
    public String updateUsername(String username) {
        if (username.length() == 0 || username.length() > 50) {
            throw new ApiRequestException("Incorrect username length", HttpStatus.BAD_REQUEST);
        }
        Long userId = authenticationService.getAuthenticatedUserId();
        userRepository.updateUsername(username, userId);
        return username;
    }

    @Override
    @Transactional
    public Map<String, Object> updateEmail(String email) {
        Optional<UserCommonProjection> userByEmail = userRepository.findCommonUserByEmail(email);

        if (userByEmail.isEmpty()) {
            Principal principal = SecurityContextHolder.getContext().getAuthentication();
            Optional<AuthUserProjection> user = userRepository.findAuthUserByEmail(principal.getName());
            userRepository.updateEmail(email, user.get().getId());
            String token = jwtProvider.createToken(email, "USER");
            Map<String, Object> response = new HashMap<>();
            response.put("user", user.get());
            response.put("token", token);
            return response;
        }
        throw new ApiRequestException("Email has already been taken.", HttpStatus.FORBIDDEN);
    }

    @Override
    @Transactional
    public Map<String, Object> updatePhone(String countryCode, Long phone) {
        int phoneLength = String.valueOf(phone).length();

        if (phoneLength < 6 || phoneLength > 10) {
            throw new ApiRequestException("Not valid phone number", HttpStatus.BAD_REQUEST);
        }
        Long userId = authenticationService.getAuthenticatedUserId();
        userRepository.updatePhone(countryCode, phone, userId);
        return Map.of("countryCode", countryCode, "phone", phone);
    }

    @Override
    @Transactional
    public String updateCountry(String country) {
        Long userId = authenticationService.getAuthenticatedUserId();
        userRepository.updateCountry(country, userId);
        return country;
    }

    @Override
    @Transactional
    public String updateGender(String gender) {
        if (gender.length() == 0 || gender.length() > 30) {
            throw new ApiRequestException("Incorrect gender length", HttpStatus.BAD_REQUEST);
        }
        Long userId = authenticationService.getAuthenticatedUserId();
        userRepository.updateGender(gender, userId);
        return gender;
    }

    @Override
    @Transactional
    public String updateLanguage(String language) {
        Long userId = authenticationService.getAuthenticatedUserId();
        userRepository.updateLanguage(language, userId);
        return language;
    }

    @Override
    @Transactional
    public boolean updateDirectMessageRequests(boolean mutedDirectMessages) {
        Long userId = authenticationService.getAuthenticatedUserId();
        userRepository.updateDirectMessageRequests(mutedDirectMessages, userId);
        return mutedDirectMessages;
    }

    @Override
    @Transactional
    public boolean updatePrivateProfile(boolean privateProfile) {
        Long userId = authenticationService.getAuthenticatedUserId();
        userRepository.updatePrivateProfile(privateProfile, userId);
        return privateProfile;
    }

    @Override
    @Transactional
    public ColorSchemeType updateColorScheme(ColorSchemeType colorSchemeType) {
        Long userId = authenticationService.getAuthenticatedUserId();
        userRepository.updateColorScheme(colorSchemeType, userId);
        return colorSchemeType;
    }

    @Override
    @Transactional
    public BackgroundColorType updateBackgroundColor(BackgroundColorType backgroundColorType) {
        Long userId = authenticationService.getAuthenticatedUserId();
        userRepository.updateBackgroundColor(backgroundColorType, userId);
        return backgroundColorType;
    }
}
