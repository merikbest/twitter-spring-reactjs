package com.gmail.merikbest2015.repository.projection;

import org.springframework.beans.factory.annotation.Value;

public interface BlockedUserProjection {
    Long getId();
    String getFullName();
    String getUsername();
    String getAbout();
    String getAvatar();
    boolean getIsPrivateProfile();

    @Value("#{@userServiceImpl.isUserBlockedByMyProfile(target.id)}")
    boolean getIsUserBlocked();
}
