package com.gmail.merikbest2015.repository.projection;

import com.gmail.merikbest2015.commons.enums.BackgroundColorType;
import com.gmail.merikbest2015.commons.enums.ColorSchemeType;

import java.time.LocalDateTime;

public interface UserSubscriberProjection {
    Long getId();
    String getEmail();
    String getFullName();
    String getUsername();
    String getLocation();
    String getAbout();
    String getWebsite();
    String getCountryCode();
    Long getPhone();
    String getCountry();
    String getGender();
    String getLanguage();
    String getBirthday();
    LocalDateTime getRegistrationDate();
    Long getTweetCount();
    Long getMediaTweetCount();
    Long getLikeCount();
    Long getNotificationsCount();
    boolean isActive();
    boolean isProfileCustomized();
    boolean isProfileStarted();
    boolean isMutedDirectMessages();
    boolean isPrivateProfile();
    BackgroundColorType getBackgroundColor();
    ColorSchemeType getColorScheme();
}
