package com.gmail.merikbest2015.twitterspringreactjs.repository.projection.user;

import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.ImageProjection;
import org.springframework.beans.factory.annotation.Value;

public interface BaseUserProjection {
    Long getId();
    String getFullName();
    String getUsername();
    String getAbout();
    ImageProjection getAvatar();
    boolean isPrivateProfile();

    @Value("#{@userServiceImpl.isUserBlockedByMyProfile(target.id)}")
    boolean isUserBlocked();

    @Value("#{@userServiceImpl.isMyProfileBlockedByUser(target.id)}")
    boolean isMyProfileBlocked();

    @Value("#{@userServiceImpl.isMyProfileWaitingForApprove(target.id)}")
    boolean isWaitingForApprove();

    @Value("#{@userServiceImpl.isUserFollowByOtherUser(target.id)}")
    boolean getIsFollower();
}
