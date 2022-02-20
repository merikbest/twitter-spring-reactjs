package com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ImageProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.model.LinkCoverSize;
import com.gmail.merikbest2015.twitterspringreactjs.model.ReplyType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class TweetProjectionResponse {
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
    private TweetUserProjectionResponse user;
    private List<ImageProjectionResponse> images;
    private QuoteTweetProjectionResponse quoteTweet;
    private PollProjectionResponse poll;
    private Integer retweetsCount;
    private Integer likedTweetsCount;
    private Integer repliesCount;
    private boolean isTweetLiked;
    private boolean isTweetRetweeted;
    private boolean isUserFollowByOtherUser;
    private boolean isTweetDeleted;
    private boolean isTweetBookmarked;

    @Getter
    @Setter
    static class QuoteTweetProjectionResponse {
        private Long id;
        private String text;
        private LocalDateTime dateTime;
        private String link;
        private String linkTitle;
        private String linkDescription;
        private String linkCover;
        private LinkCoverSize linkCoverSize;
        private TweetUserProjectionResponse user;
    }

    @Getter
    @Setter
    static class PollProjectionResponse {
        private Long id;
        private LocalDateTime dateTime;
        private List<PollChoiceProjectionResponse> pollChoices;
    }

    @Getter
    @Setter
    static class PollChoiceProjectionResponse {
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
