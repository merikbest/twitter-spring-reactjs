package com.gmail.merikbest2015.repository.projection.tweet;

import com.gmail.merikbest2015.enums.ReplyType;
import org.springframework.beans.factory.annotation.Value;

public interface TweetAdditionalInfoProjection {
    String getText();
    ReplyType getReplyType();
    Long getAddressedTweetId();
    UserProjection getUser();
    boolean isDeleted();

    interface UserProjection {
        Long getId();
        String getFullName();
        String getUsername();

        @Value("#{@userServiceImpl.isUserMutedByMyProfile(target.id)}")
        boolean getIsUserMuted();

        @Value("#{@userServiceImpl.isUserBlockedByMyProfile(target.id)}")
        boolean getIsUserBlocked();

        @Value("#{@userServiceImpl.isMyProfileBlockedByUser(target.id)}")
        boolean getIsMyProfileBlocked();

        @Value("#{@userServiceImpl.isUserFollowByOtherUser(target.id)}")
        boolean getIsFollower();
    }
}
