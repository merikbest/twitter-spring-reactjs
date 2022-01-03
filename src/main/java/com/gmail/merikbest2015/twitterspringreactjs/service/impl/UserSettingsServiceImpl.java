package com.gmail.merikbest2015.twitterspringreactjs.service.impl;

import com.gmail.merikbest2015.twitterspringreactjs.exception.ApiRequestException;
import com.gmail.merikbest2015.twitterspringreactjs.model.BackgroundColorType;
import com.gmail.merikbest2015.twitterspringreactjs.model.ColorSchemeType;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import com.gmail.merikbest2015.twitterspringreactjs.repository.UserRepository;
import com.gmail.merikbest2015.twitterspringreactjs.security.JwtProvider;
import com.gmail.merikbest2015.twitterspringreactjs.service.AuthenticationService;
import com.gmail.merikbest2015.twitterspringreactjs.service.UserSettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

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
    public User updateUsername(String username) {
        if (username.length() == 0 || username.length() > 50) {
            throw new ApiRequestException("Incorrect username length", HttpStatus.BAD_REQUEST);
        }
        User user = authenticationService.getAuthenticatedUser();
        user.setUsername(username);
        return userRepository.save(user);
    }

    @Override
    public Map<String, Object> updateEmail(String email) {
        User user = authenticationService.getAuthenticatedUser();
        Optional<User> userByEmail = userRepository.findByEmail(email);

        if (userByEmail.isEmpty()) {
            user.setEmail(email);
            userRepository.save(user);
            String token = jwtProvider.createToken(email, "USER");
            Map<String, Object> response = new HashMap<>();
            response.put("user", user);
            response.put("token", token);
            return response;
        }
        throw new ApiRequestException("Email has already been taken.", HttpStatus.FORBIDDEN);
    }

    @Override
    public User updatePhone(String countryCode, Long phone) {
        int phoneLength = String.valueOf(phone).length();

        if (phoneLength < 6 || phoneLength > 10) {
            throw new ApiRequestException("Not valid phone number", HttpStatus.BAD_REQUEST);
        }
        User user = authenticationService.getAuthenticatedUser();
        user.setCountryCode(countryCode);
        user.setPhone(phone);
        return userRepository.save(user);
    }

    @Override
    public User updateCountry(String country) {
        User user = authenticationService.getAuthenticatedUser();
        user.setCountry(country);
        return userRepository.save(user);
    }

    @Override
    public User updateGender(String gender) {
        if (gender.length() == 0 || gender.length() > 30) {
            throw new ApiRequestException("Incorrect gender length", HttpStatus.BAD_REQUEST);
        }
        User user = authenticationService.getAuthenticatedUser();
        user.setGender(gender);
        return userRepository.save(user);
    }

    @Override
    public User updateLanguage(String language) {
        User user = authenticationService.getAuthenticatedUser();
        user.setLanguage(language);
        return userRepository.save(user);
    }

    @Override
    public User updateDirectMessageRequests(boolean mutedDirectMessages) {
        User user = authenticationService.getAuthenticatedUser();
        user.setMutedDirectMessages(mutedDirectMessages);
        return userRepository.save(user);
    }

    @Override
    public User updatePrivateProfile(boolean privateProfile) {
        User user = authenticationService.getAuthenticatedUser();
        user.setPrivateProfile(privateProfile);
        return userRepository.save(user);
    }

    @Override
    public User updateColorScheme(ColorSchemeType colorSchemeType) {
        User user = authenticationService.getAuthenticatedUser();
        user.setColorScheme(colorSchemeType);
        return userRepository.save(user);
    }

    @Override
    public User updateBackgroundColor(BackgroundColorType backgroundColorType) {
        User user = authenticationService.getAuthenticatedUser();
        user.setBackgroundColor(backgroundColorType);
        return userRepository.save(user);
    }
}
