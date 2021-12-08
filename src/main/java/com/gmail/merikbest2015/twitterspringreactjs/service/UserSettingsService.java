package com.gmail.merikbest2015.twitterspringreactjs.service;

import com.gmail.merikbest2015.twitterspringreactjs.model.BackgroundColorType;
import com.gmail.merikbest2015.twitterspringreactjs.model.ColorSchemeType;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;

import java.util.Map;

public interface UserSettingsService {

    User updateUsername(String username);

    Map<String, Object> updateEmail(String email);

    User updatePhone(String countryCode, Long phone);

    User updateCountry(String country);

    User updateGender(String gender);

    User updateLanguage(String language);

    User updateDirectMessageRequests(boolean mutedDirectMessages);

    User updatePrivateProfile(boolean privateProfile);

    User updateColorScheme(ColorSchemeType colorSchemeType);

    User updateBackgroundColor(BackgroundColorType backgroundColorType);
}
