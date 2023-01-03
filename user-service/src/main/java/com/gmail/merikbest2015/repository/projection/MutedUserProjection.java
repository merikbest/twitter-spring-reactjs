package com.gmail.merikbest2015.repository.projection;

import com.gmail.merikbest2015.commons.projection.ImageProjection;
import org.springframework.beans.factory.annotation.Value;

public interface MutedUserProjection {
    Long getId();
    String getFullName();
    String getUsername();
    String getAbout();
    ImageProjection getAvatar();
    boolean getIsPrivateProfile();

    @Value("#{@userServiceImpl.isUserMutedByMyProfile(target.id)}")
    boolean getIsUserMuted();
}
