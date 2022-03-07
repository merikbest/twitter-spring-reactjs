package com.gmail.merikbest2015.twitterspringreactjs.repository.projection.user;

import org.springframework.beans.factory.annotation.Value;

import java.util.Map;

public interface BaseUserProjection {
    Long getId();
    String getFullName();
    String getUsername();
    String getAbout();
    boolean getIsPrivateProfile();

    @Value("#{T(com.gmail.merikbest2015.twitterspringreactjs.repository.projection.user.BaseUserProjection).convertToAvatar(target.img_id, target.img_src)}")
    Map<String, Object> getAvatar();

    @Value("#{@userServiceImpl.isUserBlockedByMyProfile(target.id)}")
    boolean getIsUserBlocked();

    @Value("#{@userServiceImpl.isMyProfileBlockedByUser(target.id)}")
    boolean getIsMyProfileBlocked();

    @Value("#{@userServiceImpl.isMyProfileWaitingForApprove(target.id)}")
    boolean getIsWaitingForApprove();

    @Value("#{@userServiceImpl.isUserFollowByOtherUser(target.id)}")
    boolean getIsFollower();

    static Map<String, Object> convertToAvatar(Long id, String src) {
        return Map.of("id", id,"src", src);
    }
}
