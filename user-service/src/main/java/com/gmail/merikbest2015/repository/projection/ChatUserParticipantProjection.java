package com.gmail.merikbest2015.repository.projection;

import org.springframework.beans.factory.annotation.Value;

public interface ChatUserParticipantProjection {
    Long getId();
    String getFullName();
    String getUsername();
    String getAvatar();
    boolean isMutedDirectMessages();

    @Value("#{@userServiceImpl.isUserBlockedByMyProfile(target.id)}")
    boolean getIsUserBlocked();

    @Value("#{@userServiceImpl.isMyProfileBlockedByUser(target.id)}")
    boolean getIsMyProfileBlocked();
}
