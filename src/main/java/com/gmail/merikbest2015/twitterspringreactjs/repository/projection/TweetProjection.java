package com.gmail.merikbest2015.twitterspringreactjs.repository.projection;

import com.gmail.merikbest2015.twitterspringreactjs.model.LinkCoverSize;
import com.gmail.merikbest2015.twitterspringreactjs.model.ReplyType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class TweetProjection {
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
    private UserTweetProjection user;
    private List<ImageProjection> images;
    private QuoteTweetProjection quoteTweet;
    private PollProjection poll;

    public TweetProjection(
            Long id,
            String text,
            LocalDateTime dateTime,
            LocalDateTime scheduledDate,
            String addressedUsername,
            Long addressedId,
            Long addressedTweetId,
            ReplyType replyType,
            String link,
            String linkTitle,
            String linkDescription,
            String linkCover,
            LinkCoverSize linkCoverSize,
            Long userId, // User user ...
            String userEmail,
            String userFullName,
            String username,
            Long userAvatarId,
            String userAvatarSrc,
            Long imageId, // Image ...
            String imageSrc,
            Long quoteTweetId, // Quote Tweet ...
            String quoteTweetText,
            LocalDateTime quoteTweetDateTime,
            String quoteTweetLink,
            String quoteTweetLinkTitle,
            String quoteTweetLinkDescription,
            String quoteTweetLinkCover,
            LinkCoverSize quoteTweetLinkCoverSize,
            Long quoteTweetUserId,
            String quoteTweetUserEmail,
            String quoteTweetUserFullName,
            String quoteTweetUsername,
            Long quoteTweetUserAvatarId,
            String quoteTweetUserAvatarSrc,
            Long pollId, // Poll ...
            LocalDateTime pollDateTime,
            Long pollChoiceId,
            String pollChoiceChoice,
            Long pollChoiceUserId
    ) {
        this.id = id;
        this.text = text;
        this.dateTime = dateTime;
        this.scheduledDate = scheduledDate;
        this.addressedUsername = addressedUsername;
        this.addressedId = addressedId;
        this.addressedTweetId = addressedTweetId;
        this.replyType = replyType;
        this.link = link;
        this.linkTitle = linkTitle;
        this.linkDescription = linkDescription;
        this.linkCover = linkCover;
        this.linkCoverSize = linkCoverSize;
        this.user = new UserTweetProjection(userId, userEmail, userFullName, username, new ImageProjection(userAvatarId, userAvatarSrc));
        this.images = List.of(new ImageProjection(imageId, imageSrc));
        this.quoteTweet = new QuoteTweetProjection(quoteTweetId, quoteTweetText, quoteTweetDateTime, quoteTweetLink,
                quoteTweetLinkTitle, quoteTweetLinkDescription, quoteTweetLinkCover, quoteTweetLinkCoverSize,
                new UserTweetProjection(quoteTweetUserId, quoteTweetUserEmail, quoteTweetUserFullName, quoteTweetUsername,
                        new ImageProjection(quoteTweetUserAvatarId, quoteTweetUserAvatarSrc))
        );
        this.poll = new PollProjection(pollId, pollDateTime,
                List.of(new PollChoiceProjection(pollChoiceId, pollChoiceChoice, List.of(UserTweetProjection.builder().id(pollChoiceUserId).build())))
        );
    }

    @Data
    @Builder
    static class UserTweetProjection {
        private Long id;
        private String email;
        private String fullName;
        private String username;
        private ImageProjection avatar;
    }

    @Data
    @Builder
    static class QuoteTweetProjection {
        private Long id;
        private String text;
        private LocalDateTime dateTime;
        private String link;
        private String linkTitle;
        private String linkDescription;
        private String linkCover;
        private LinkCoverSize linkCoverSize;
        private UserTweetProjection user;
    }

    @Data
    @Builder
    static class PollProjection {
        private Long id;
        private LocalDateTime dateTime;
        private List<PollChoiceProjection> pollChoices;
    }

    @Data
    @Builder
    static class PollChoiceProjection {
        private Long id;
        private String choice;
        private List<UserTweetProjection> votedUser;
    }
}
