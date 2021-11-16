package com.gmail.merikbest2015.twitterspringreactjs.service.impl;

import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import com.gmail.merikbest2015.twitterspringreactjs.repository.UserRepository;
import com.gmail.merikbest2015.twitterspringreactjs.service.UserSettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class UserSettingsServiceImpl implements UserSettingsService {

    private final UserRepository userRepository;

    @Override
    public User updateUsername(String username) {
        User user = getAuthenticatedUser();
        user.setUsername(username);
        return userRepository.save(user);
    }

    @Override
    public User updateEmail(String email) {
        User user = getAuthenticatedUser();
        user.setEmail(email);
        return userRepository.save(user);
    }

    @Override
    public User updatePhone(String countryCode, Long phone) {
        User user = getAuthenticatedUser();
        user.setCountryCode(countryCode);
        user.setPhone(phone);
        return userRepository.save(user);
    }

    @Override
    public User updateCountry(String country) {
        User user = getAuthenticatedUser();
        user.setCountry(country);
        return userRepository.save(user);
    }

    @Override
    public User updateGender(String gender) {
        User user = getAuthenticatedUser();
        user.setGender(gender);
        return userRepository.save(user);
    }

    @Override
    public User updateLanguage(String language) {
        User user = getAuthenticatedUser();
        user.setLanguage(language);
        return userRepository.save(user);
    }

    @Override
    public User updateDirectMessageRequests(boolean mutedDirectMessages) {
        User user = getAuthenticatedUser();
        user.setMutedDirectMessages(mutedDirectMessages);
        return userRepository.save(user);
    }

    @Override
    public User updatePrivateProfile(boolean privateProfile) {
        User user = getAuthenticatedUser();
        user.setPrivateProfile(privateProfile);
        return userRepository.save(user);
    }

    private User getAuthenticatedUser() {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByEmail(principal.getName());
    }
}
