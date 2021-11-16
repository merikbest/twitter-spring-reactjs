package com.gmail.merikbest2015.twitterspringreactjs.service;

import com.gmail.merikbest2015.twitterspringreactjs.model.User;

public interface UserSettingsService {

    User updateUsername(String username);

    User updateEmail(String email);

    User updatePhone(String countryCode, Long phone);

    User updateCountry(String country);

    User updateGender(String gender);

    User updateLanguage(String language);

    User updateDirectMessageRequests(boolean mutedDirectMessages);

    User updatePrivateProfile(boolean privateProfile);
}
