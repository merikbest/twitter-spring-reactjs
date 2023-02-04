package com.gmail.merikbest2015.repository.projection;

import org.springframework.beans.factory.annotation.Value;

public interface TweetAdditionalInfoUserProjection {
    Long getId();
    String getFullName();
    String getUsername();

    @Value("#{@userServiceHelper.isUserMutedByMyProfile(target.id)}")
    boolean getIsUserMuted();

    @Value("#{@userServiceHelper.isUserBlockedByMyProfile(target.id)}")
    boolean getIsUserBlocked();

    @Value("#{@userServiceHelper.isMyProfileBlockedByUser(target.id)}")
    boolean getIsMyProfileBlocked();

    @Value("#{@userServiceHelper.isUserFollowByOtherUser(target.id)}")
    boolean getIsFollower();
}
