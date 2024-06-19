package com.gmail.merikbest2015.repository.projection;

import com.gmail.merikbest2015.enums.ReplyType;
import org.springframework.beans.factory.annotation.Value;

public interface TweetAdditionalInfoProjection {
    String getText();
    ReplyType getReplyType();
    TweetAdditionalInfoUserProjection getAuthor();
    boolean isDeleted();

    @Value("#{target.addressedTweet == null ? null : target.addressedTweet.id}")
    Long getAddressedTweetId();

    interface TweetAdditionalInfoUserProjection {
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
