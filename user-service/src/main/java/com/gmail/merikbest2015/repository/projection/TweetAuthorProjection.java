package com.gmail.merikbest2015.repository.projection;

import org.springframework.beans.factory.annotation.Value;

public interface TweetAuthorProjection {
    Long getId();
    String getEmail();
    String getFullName();
    String getUsername();
    String getAvatar();
    boolean getPrivateProfile();

    @Value("#{@userServiceHelper.isUserMutedByMyProfile(target.id)}")
    boolean getIsUserMuted();

    @Value("#{@userServiceHelper.isUserBlockedByMyProfile(target.id)}")
    boolean getIsUserBlocked();

    @Value("#{@userServiceHelper.isMyProfileBlockedByUser(target.id)}")
    boolean getIsMyProfileBlocked();

    @Value("#{@userServiceHelper.isMyProfileWaitingForApprove(target.id)}")
    boolean getIsWaitingForApprove();

    @Value("#{@userServiceHelper.isUserFollowByOtherUser(target.id)}")
    boolean getIsFollower();
}
