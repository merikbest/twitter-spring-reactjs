package com.gmail.merikbest2015.repository.projection;

import com.gmail.merikbest2015.commons.dto.response.tweet.TweetListResponse;
import com.gmail.merikbest2015.commons.enums.LinkCoverSize;
import com.gmail.merikbest2015.commons.enums.ReplyType;
import com.gmail.merikbest2015.commons.enums.TweetType;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;
import java.util.List;

public interface TweetUserProjection {

    @Value("#{target.retweet != null ? target.retweet.id : target.id}")
    Long getId();

    @Value("#{target.retweet != null ? target.retweet.text : target.text}")
    String getText();

    TweetType getTweetType();

    @Value("#{target.retweet != null ? target.retweet.createdAt : target.createdAt}")
    LocalDateTime getCreatedAt();

    @Value("#{target.retweet != null ? target.retweet.scheduledDate : target.scheduledDate}")
    LocalDateTime getScheduledDate();

    @Value("#{target.retweet != null ? target.retweet.replyType : target.replyType}")
    ReplyType getReplyType();

    @Value("#{target.retweet != null ? target.retweet.link : target.link}")
    String getLink();

    @Value("#{target.retweet != null ? target.retweet.linkTitle : target.linkTitle}")
    String getLinkTitle();

    @Value("#{target.retweet != null ? target.retweet.linkDescription : target.linkDescription}")
    String getLinkDescription();

    @Value("#{target.retweet != null ? target.retweet.linkCover : target.linkCover}")
    String getLinkCover();

    @Value("#{target.retweet != null ? target.retweet.linkCoverSize : target.linkCoverSize}")
    LinkCoverSize getLinkCoverSize();

    @Value("#{target.retweet != null ? target.retweet.gifImage : target.gifImage}")
    GifImageProjection getGifImage();

    @Value("#{target.retweet != null ? target.retweet.listId : target.listId}")
    Long getListId();

    @Value("#{target.retweet != null ? target.retweet.images : target.images}")
    List<TweetImageProjection> getImages();

    @Value("#{target.retweet != null ? target.retweet.imageDescription : target.imageDescription}")
    String getImageDescription();

    @Value("#{target.retweet != null ? target.retweet.quoteTweet : target.quoteTweet}")
    QuoteTweetProjection getQuoteTweet();

    @Value("#{target.retweet != null ? target.retweet.poll : target.poll}")
    PollProjection getPoll();

    @Value("#{target.retweet != null ? target.retweet.deleted : target.deleted}")
    boolean isDeleted();

    @Value("#{target.retweet != null ? target.retweet.author : target.author}")
    TweetAuthorProjection getAuthor();

    @Value("#{target.retweet != null ? target.retweet.retweetsCount : target.retweetsCount}")
    Long getRetweetsCount();

    @Value("#{target.retweet != null ? target.retweet.likesCount : target.likesCount}")
    Long getLikesCount();

    @Value("#{target.retweet != null ? target.retweet.repliesCount : target.repliesCount}")
    Long getRepliesCount();

    @Value("#{target.retweet != null ? target.retweet.addressedUser?.id : target.addressedUser?.id}")
    Long getAddressedId();

    @Value("#{target.retweet != null ? target.retweet.addressedUser?.username : target.addressedUser?.username}")
    String getAddressedUsername();

    @Value("#{target.retweet != null ? target.retweet.addressedTweet?.id : target.addressedTweet?.id}")
    Long getAddressedTweetId();

    @Value("#{@tweetProjectionHelper.getTweetList(target.retweet != null ? target.retweet.listId : target.listId)}")
    TweetListResponse getTweetList();

    @Value("#{target.retweet != null ? target.retweet.taggedImageUsers : target.taggedImageUsers}")
    List<TaggedUserProjection> getTaggedImageUsers();

    @Value("#{@tweetProjectionHelper.isUserLikedTweet(target.retweet != null ? target.retweet.id : target.id)}")
    boolean getIsTweetLiked();

    @Value("#{@tweetProjectionHelper.isUserRetweetedTweet(target.retweet != null ? target.retweet.id : target.id)}")
    boolean getIsTweetRetweeted();

    @Value("#{@tweetProjectionHelper.isUserBookmarkedTweet(target.retweet != null ? target.retweet.id : target.id)}")
    boolean getIsTweetBookmarked();

    @Value("#{@userServiceImpl.isUserFollowByOtherUser(target.retweet != null ? target.retweet.author.id : target.author.id)}")
    boolean getIsUserFollowByOtherUser();

    interface QuoteTweetProjection {
        @Value("#{target.isDeleted ? null : target.id}")
        Long getId();

        @Value("#{target.isDeleted ? null : target.text}")
        String getText();

        @Value("#{target.isDeleted ? null : target.tweetType}")
        TweetType getTweetType();

        @Value("#{target.isDeleted ? null : target.createdAt}")
        LocalDateTime getCreatedAt();

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

        TweetAuthorProjection getAuthor();

        boolean isDeleted();
    }

    interface PollProjection {
        Long getId();
        LocalDateTime getCreatedAt();
        List<PollChoiceProjection> getPollChoices();
    }

    interface PollChoiceProjection {
        Long getId();
        String getChoice();

        @Value("#{@pollChoiceVotedRepository.getVotedUserIds(target.id)}")
        List<VotedUserProjection> getVotedUser();
    }

    interface GifImageProjection {
        Long getId();
        String getUrl();
        Long getWidth();
        Long getHeight();
    }
}
