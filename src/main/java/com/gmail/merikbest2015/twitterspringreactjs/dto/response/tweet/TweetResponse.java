package com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ImageResponse;
import com.gmail.merikbest2015.twitterspringreactjs.model.LinkCoverSize;
import com.gmail.merikbest2015.twitterspringreactjs.model.ReplyType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
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
    private LinkCoverSize linkCoverSize;
    private UserTweetResponse user;
    private List<ImageResponse> images;
    private QuoteTweetResponse quoteTweet;
    private PollResponse poll;
    private Integer retweetsCount;
    private Integer likedTweetsCount;
    private Integer repliesCount;

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

    @Getter
    @Setter
    static class QuoteTweetResponse {
        private Long id;
        private String text;
        private LocalDateTime dateTime;
        private String link;
        private String linkTitle;
        private String linkDescription;
        private String linkCover;
        private LinkCoverSize linkCoverSize;
        private UserTweetResponse user;
    }

    @Getter
    @Setter
    static class PollResponse {
        private Long id;
        private LocalDateTime dateTime;
        private List<PollChoiceResponse> pollChoices;
    }

    @Getter
    @Setter
    static class PollChoiceResponse {
        private Long id;
        private String choice;
        private List<VotedUserResponse> votedUser;
    }

    @Getter
    @Setter
    static class VotedUserResponse {
        private Long id;
    }
}
