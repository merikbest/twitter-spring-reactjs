package com.gmail.merikbest2015.repository.projection;

import org.springframework.beans.factory.annotation.Value;

import java.util.List;

public interface UserDetailProjection {
    Long getId();
    String getFullName();
    String getUsername();
    String getAbout();
    String getAvatar();
    boolean getPrivateProfile();

    @Value("#{target.followers.size()}")
    Long getFollowersSize();

    @Value("#{target.following.size()}")
    Long getFollowingSize();

    @Value("#{@userServiceHelper.isUserBlockedByMyProfile(target.id)}")
    boolean getIsUserBlocked();

    @Value("#{@userServiceHelper.isMyProfileBlockedByUser(target.id)}")
    boolean getIsMyProfileBlocked();

    @Value("#{@userServiceHelper.isMyProfileWaitingForApprove(target.id)}")
    boolean getIsWaitingForApprove();

    @Value("#{@userServiceHelper.isUserFollowByOtherUser(target.id)}")
    boolean getIsFollower();

    @Value("#{@userServiceHelper.getSameFollowers(target.id)}")
    List<SameFollower> getSameFollowers();
}
