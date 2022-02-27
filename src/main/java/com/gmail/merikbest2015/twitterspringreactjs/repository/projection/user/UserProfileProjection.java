package com.gmail.merikbest2015.twitterspringreactjs.repository.projection.user;

import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.ImageProjection;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;
import java.util.List;

public interface UserProfileProjection {
    Long getId();
    String getFullName();
    String getUsername();
    String getLocation();
    String getAbout();
    String getWebsite();
    String getCountry();
    String getBirthday();
    LocalDateTime getRegistrationDate();
    Long getTweetCount();
    Long getMediaTweetCount();
    Long getLikeCount();
    Long getNotificationsCount();
    boolean isMutedDirectMessages();
    boolean isPrivateProfile();
    ImageProjection getAvatar();
    ImageProjection getWallpaper();

    @Value("#{target.pinnedTweet != null ? target.pinnedTweet.id : 0}")
    Integer getPinnedTweetId();

    @Value("#{target.followers.size()}")
    Integer getFollowersSize();

    @Value("#{target.following.size()}")
    Integer getFollowingSize();

    @Value("#{@userServiceImpl.isUserMutedByMyProfile(target.id)}")
    boolean getIsUserMuted();

    @Value("#{@userServiceImpl.isUserBlockedByMyProfile(target.id)}")
    boolean getIsUserBlocked();

    @Value("#{@userServiceImpl.isMyProfileBlockedByUser(target.id)}")
    boolean getIsMyProfileBlocked();

    @Value("#{@userServiceImpl.isMyProfileWaitingForApprove(target.id)}")
    boolean getIsWaitingForApprove();

    @Value("#{@userServiceImpl.isUserFollowByOtherUser(target.id)}")
    boolean getIsFollower();

    @Value("#{@userServiceImpl.isMyProfileSubscribed(target.id)}")
    boolean getIsSubscriber();

    @Value("#{@userServiceImpl.getSameFollowers(target.id)}")
    List<SameFollower> getSameFollowers();
}
