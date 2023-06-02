package com.gmail.merikbest2015.dto.response.tweet;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gmail.merikbest2015.dto.ImageResponse;
import com.gmail.merikbest2015.dto.response.user.TaggedUserResponse;
import com.gmail.merikbest2015.enums.LinkCoverSize;
import com.gmail.merikbest2015.enums.ReplyType;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class TweetResponse {
    private Long id;
    private String text;
    private LocalDateTime dateTime;
    private LocalDateTime scheduledDate;
    private String addressedUsername;
    private Long addressedId;
    private Long addressedTweetId;
    private ReplyType replyType;
    private String link;
    private String linkTitle;
    private String linkDescription;
    private String linkCover;
    private GifImageResponse gifImage;
    private LinkCoverSize linkCoverSize;
    private TweetAuthorResponse user;
    private List<ImageResponse> images;
    private String imageDescription;
    private List<TaggedUserResponse> taggedImageUsers;
    private QuoteTweetResponse quoteTweet;
    private TweetListResponse tweetList;
    private PollResponse poll;
    private Long retweetsCount;
    private Long likedTweetsCount;
    private Long repliesCount;
    private Long quotesCount;

    @JsonProperty("isDeleted")
    private boolean isDeleted;

    @JsonProperty("isTweetLiked")
    private boolean isTweetLiked;

    @JsonProperty("isTweetRetweeted")
    private boolean isTweetRetweeted;

    @JsonProperty("isUserFollowByOtherUser")
    private boolean isUserFollowByOtherUser;

    @JsonProperty("isTweetDeleted")
    private boolean isTweetDeleted;

    @JsonProperty("isTweetBookmarked")
    private boolean isTweetBookmarked;

    @Data
    static class PollResponse {
        private Long id;
        private LocalDateTime dateTime;
        private List<PollChoiceResponse> pollChoices;
    }

    @Data
    static class GifImageResponse {
        private Long id;
        private String url;
        private Long width;
        private Long height;
    }

    @Data
    static class PollChoiceResponse {
        private Long id;
        private String choice;
        private List<VotedUserResponse> votedUser;
    }

    @Data
    static class VotedUserResponse {
        private Long id;
    }
}
