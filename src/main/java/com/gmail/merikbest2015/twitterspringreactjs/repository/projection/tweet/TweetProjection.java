package com.gmail.merikbest2015.twitterspringreactjs.repository.projection.tweet;

import com.gmail.merikbest2015.twitterspringreactjs.model.LinkCoverSize;
import com.gmail.merikbest2015.twitterspringreactjs.model.ReplyType;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.ImageProjection;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;
import java.util.List;

public interface TweetProjection {
    Long getId();
    String getText();
    LocalDateTime getDateTime();
    LocalDateTime getScheduledDate();
    String getAddressedUsername();
    Long getAddressedId();
    Long getAddressedTweetId();
    ReplyType getReplyType();
    String getLink();
    String getLinkTitle();
    String getLinkDescription();
    String getLinkCover();
    LinkCoverSize getLinkCoverSize();
    UserProjection getUser();
    List<ImageProjection> getImages();
    QuoteTweetProjection getQuoteTweet();
    PollProjection getPoll();

    @Value("#{@tweetServiceImpl.isUserLikedTweet(target.id)}")
    boolean getIsTweetLiked();

    @Value("#{@tweetServiceImpl.isUserRetweetedTweet(target.id)}")
    boolean getIsTweetRetweeted();

    @Value("#{@tweetServiceImpl.isUserBookmarkedTweet(target.id)}")
    boolean getIsTweetBookmarked();

    @Value("#{@userServiceImpl.isUserFollowByOtherUser(target.user.id)}")
    boolean getIsUserFollowByOtherUser();

    @Value("#{target.retweets.size()}")
    Integer getRetweetsCount();

    @Value("#{target.likedTweets.size()}")
    Integer getLikedTweetsCount();

    @Value("#{target.replies.size()}")
    Integer getRepliesCount();

    interface UserProjection {
        Long getId();
        String getEmail();
        String getFullName();
        String getUsername();
        ImageProjection getAvatar();

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
    }

    interface QuoteTweetProjection {
        Long getId();
        String getText();
        LocalDateTime getDateTime();
        String getLink();
        String getLinkTitle();
        String getLinkDescription();
        String getLinkCover();
        LinkCoverSize getLinkCoverSize();
        UserProjection getUser();
    }

    interface PollProjection {
        Long getId();
        LocalDateTime getDateTime();
        List<PollChoiceProjection> getPollChoices();
    }

    interface PollChoiceProjection {
        Long getId();
        String getChoice();
        List<VotedUser> getVotedUser();
    }

    interface VotedUser {
        Long getId();
    }
}
