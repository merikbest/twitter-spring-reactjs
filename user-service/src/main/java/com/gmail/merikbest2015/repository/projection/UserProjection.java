package com.gmail.merikbest2015.repository.projection;

import org.springframework.beans.factory.annotation.Value;

public interface UserProjection {
    Long getId();
    String getFullName();
    String getUsername();
    String getAbout();
    String getAvatar();
    boolean getPrivateProfile();
    boolean getMutedDirectMessages();

    @Value("#{@userServiceHelper.isUserBlockedByMyProfile(target.id)}")
    boolean getIsUserBlocked();

    @Value("#{@userServiceHelper.isMyProfileBlockedByUser(target.id)}")
    boolean getIsMyProfileBlocked();

    @Value("#{@userServiceHelper.isMyProfileWaitingForApprove(target.id)}")
    boolean getIsWaitingForApprove();

    @Value("#{@userServiceHelper.isUserFollowByOtherUser(target.id)}")
    boolean getIsFollower();
}
