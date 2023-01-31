package com.gmail.merikbest2015.repository.projection;

import com.gmail.merikbest2015.dto.TweetAuthorResponse;
import com.gmail.merikbest2015.enums.LinkCoverSize;
import com.gmail.merikbest2015.enums.ReplyType;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;
import java.util.List;

public interface TweetUserProjection {
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
    Long getAuthorId();
    List<TweetImageProjection> getImages();
    QuoteTweetProjection getQuoteTweet();
    PollProjection getPoll();
    boolean isDeleted();

    @Value("#{@tweetServiceImpl.getTweetAuthor(target.authorId)}")
    TweetAuthorResponse getUser();

    @Value("#{@retweetRepository.getRetweetsUserIds(target.id)}")
    List<Long> getRetweetsUserIds();

    @Value("#{@tweetServiceImpl.isUserLikedTweet(target.id)}")
    boolean getIsTweetLiked();

    @Value("#{@tweetServiceImpl.isUserRetweetedTweet(target.id)}")
    boolean getIsTweetRetweeted();

    @Value("#{@tweetServiceImpl.isUserBookmarkedTweet(target.id)}")
    boolean getIsTweetBookmarked();

    @Value("#{@tweetServiceImpl.isUserFollowByOtherUser(target.user.id)}")
    boolean getIsUserFollowByOtherUser();

    @Value("#{@retweetRepository.getRetweetSize(target.id)}")
    Long getRetweetsCount();

    @Value("#{@likeTweetRepository.getLikedTweetsSize(target.id)}")
    Long getLikedTweetsCount();

    @Value("#{target.replies != null ? target.replies.size() : 0}")
    Long getRepliesCount();

    interface QuoteTweetProjection {
        @Value("#{target.isDeleted ? null : target.id}")
        Long getId();

        @Value("#{target.isDeleted ? null : target.text}")
        String getText();

        @Value("#{target.isDeleted ? null : target.dateTime}")
        LocalDateTime getDateTime();

        @Value("#{target.isDeleted ? null : target.link}")
        String getLink();

        @Value("#{target.isDeleted ? null : target.linkTitle}")
        String getLinkTitle();

        @Value("#{target.isDeleted ? null : target.linkDescription}")
        String getLinkDescription();

        @Value("#{target.isDeleted ? null : target.linkCover}")
        String getLinkCover();

        @Value("#{target.isDeleted ? null : target.linkCoverSize}")
        LinkCoverSize getLinkCoverSize();

        @Value("#{target.isDeleted ? null : target.authorId}")
        Long getAuthorId();

        @Value("#{target.isDeleted ? null : @tweetServiceImpl.getTweetAuthor(target.authorId)}")
        TweetAuthorResponse getUser();

        boolean isDeleted();
    }

    interface PollProjection {
        Long getId();
        LocalDateTime getDateTime();
        List<PollChoiceProjection> getPollChoices();
    }

    interface PollChoiceProjection {
        Long getId();
        String getChoice();

        @Value("#{@pollChoiceVotedRepository.getVotedUserIds(target.id)}")
        List<VotedUserProjection> getVotedUser();
    }
}
