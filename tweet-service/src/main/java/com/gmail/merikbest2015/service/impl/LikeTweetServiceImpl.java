package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.IdsRequest;
import com.gmail.merikbest2015.dto.UserResponse;
import com.gmail.merikbest2015.dto.notification.NotificationResponse;
import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.model.LikeTweet;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.repository.LikeTweetRepository;
import com.gmail.merikbest2015.repository.TweetRepository;
import com.gmail.merikbest2015.repository.projection.LikeTweetProjection;
import com.gmail.merikbest2015.service.LikeTweetService;
import com.gmail.merikbest2015.util.AuthUtil;
import com.gmail.merikbest2015.util.TweetServiceHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LikeTweetServiceImpl implements LikeTweetService {

    private final LikeTweetRepository likeTweetRepository;
    private final TweetRepository tweetRepository;
    private final TweetServiceHelper tweetServiceHelper;
    private final UserClient userClient;

    @Override
    public Page<LikeTweetProjection> getUserLikedTweets(Long userId, Pageable pageable) {
        tweetServiceHelper.checkIsUserExist(userId);
        return likeTweetRepository.getUserLikedTweets(userId, pageable);
    }

    @Override
    public HeaderResponse<UserResponse> getLikedUsersByTweetId(Long tweetId, Pageable pageable) {
        Page<Long> likedUserIds = likeTweetRepository.getLikedUserIds(tweetId, pageable);
        return userClient.getTweetLikedUsersByIds(new IdsRequest(likedUserIds.getContent()), pageable);
    }

    @Override
    @Transactional
    public NotificationResponse likeTweet(Long tweetId) {
        Long userId = AuthUtil.getAuthenticatedUserId();
        Tweet tweet = tweetRepository.findById(tweetId)
                .orElseThrow(() -> new ApiRequestException("Tweet not found", HttpStatus.NOT_FOUND));
        tweetServiceHelper.checkIsValidUserProfile(tweet.getAuthorId());
        LikeTweet likedTweet = likeTweetRepository.getLikedTweet(userId, tweetId);
        boolean isTweetLiked;

        if (likedTweet != null) {
            likeTweetRepository.delete(likedTweet);
            userClient.updateLikeCount(false);
            isTweetLiked = false;
        } else {
            LikeTweet newLikeTweet = new LikeTweet(userId, tweetId);
            likeTweetRepository.save(newLikeTweet);
            userClient.updateLikeCount(true);
            isTweetLiked = true;
        }
        return tweetServiceHelper.sendNotification(NotificationType.LIKE, isTweetLiked, tweet.getAuthorId(), userId, tweetId);
    }
}
