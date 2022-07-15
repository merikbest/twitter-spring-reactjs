package com.gmail.merikbest2015.twitterspringreactjs.repository.projection.user;

import org.springframework.beans.factory.annotation.Value;

import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.ImageProjection;

public interface UserChatProjection {
    Long getId();
    String getFullName();
    String getUsername();
    String getAbout();
    ImageProjection getAvatar();
    boolean getPrivateProfile();
    boolean getMutedDirectMessages();

    @Value("#{@userServiceImpl.isUserBlockedByMyProfile(target.id)}")
    boolean getIsUserBlocked();

    @Value("#{@userServiceImpl.isMyProfileBlockedByUser(target.id)}")
    boolean getIsMyProfileBlocked();

    @Value("#{@userServiceImpl.isMyProfileWaitingForApprove(target.id)}")
    boolean getIsWaitingForApprove();

    @Value("#{@userServiceImpl.isUserFollowByOtherUser(target.id)}")
    boolean getIsFollower();

    @Value("#{@userServiceImpl.isUserChatParticipant(target.id)}")
    boolean getIsUserChatParticipant();
}
