package com.gmail.merikbest2015.commons.projection;

public interface UserChatProjection {
    Long getId();
    String getFullName();
    String getUsername();
    String getAbout();
    ImageProjection getAvatar();
    boolean getPrivateProfile();
    boolean getMutedDirectMessages();
    boolean getIsUserBlocked();
    boolean getIsMyProfileBlocked();
    boolean getIsWaitingForApprove();
    boolean getIsFollower();
    boolean getIsUserChatParticipant();
}
