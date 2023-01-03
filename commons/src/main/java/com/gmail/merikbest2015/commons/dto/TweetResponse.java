package com.gmail.merikbest2015.commons.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gmail.merikbest2015.commons.enums.LinkCoverSize;
import com.gmail.merikbest2015.commons.enums.ReplyType;
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
    private Integer quotesCount;

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
