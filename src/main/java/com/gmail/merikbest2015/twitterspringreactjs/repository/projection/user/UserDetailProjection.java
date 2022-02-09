package com.gmail.merikbest2015.twitterspringreactjs.repository.projection.user;

import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.ImageProjection;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;
import java.util.Map;

public interface UserDetailProjection {
    Long getId();
    String getFullName();
    String getUsername();
    String getAbout();
    ImageProjection getAvatar();
    boolean getPrivateProfile();

    @Value("#{target.followers.size()}")
    Integer getFollowersSize();

    @Value("#{target.following.size()}")
    Integer getFollowingSize();

    @Value("#{@userServiceImpl.isUserBlockedByMyProfile(target.id)}")
    boolean getIsUserBlocked();

    @Value("#{@userServiceImpl.isMyProfileBlockedByUser(target.id)}")
    boolean getIsMyProfileBlocked();

    @Value("#{@userServiceImpl.isMyProfileWaitingForApprove(target.id)}")
    boolean getIsWaitingForApprove();

    @Value("#{@userServiceImpl.isUserFollowByOtherUser(target.id)}")
    boolean getIsFollower();

    @Value("#{@userServiceImpl.getSameFollowers(target.id)}")
    List<SameFollower> getSameFollowers();

    interface SameFollower {
        Long getId();
        String getFullName();

        @Value("#{T(com.gmail.merikbest2015.twitterspringreactjs.repository.projection.user.UserDetailProjection).convertToAvatar(target.img_id, target.img_src)}")
        Map<String, Object> getAvatar();
    }

    static Map<String, Object> convertToAvatar(Long id, String src) {
        return Map.of("id", id,"src", src);
    }
}
