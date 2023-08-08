package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.request.IdsRequest;
import com.gmail.merikbest2015.dto.response.notification.NotificationResponse;
import com.gmail.merikbest2015.dto.response.user.UserResponse;
import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.model.LikeTweet;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.repository.LikeTweetRepository;
import com.gmail.merikbest2015.repository.projection.LikeTweetProjection;
import com.gmail.merikbest2015.service.LikeTweetService;
import com.gmail.merikbest2015.service.util.TweetValidationHelper;
import com.gmail.merikbest2015.util.AuthUtil;
import com.gmail.merikbest2015.service.util.TweetServiceHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LikeTweetServiceImpl implements LikeTweetService {

    private final LikeTweetRepository likeTweetRepository;
    private final TweetServiceHelper tweetServiceHelper;
    private final TweetValidationHelper tweetValidationHelper;
    private final UserClient userClient;

    @Override
    @Transactional(readOnly = true)
    public Page<LikeTweetProjection> getUserLikedTweets(Long userId, Pageable pageable) {
        tweetValidationHelper.validateUserProfile(userId);
        return likeTweetRepository.getUserLikedTweets(userId, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public HeaderResponse<UserResponse> getLikedUsersByTweetId(Long tweetId, Pageable pageable) {
        tweetValidationHelper.checkValidTweet(tweetId);
        List<Long> likedUserIds = likeTweetRepository.getLikedUserIds(tweetId);
        return userClient.getUsersByIds(new IdsRequest(likedUserIds), pageable);
    }

    @Override
    @Transactional
    public NotificationResponse likeTweet(Long tweetId) {
        Tweet tweet = tweetValidationHelper.checkValidTweet(tweetId);
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        LikeTweet likedTweet = likeTweetRepository.getLikedTweet(authUserId, tweetId);
        boolean isTweetLiked;

        if (likedTweet != null) {
            likeTweetRepository.delete(likedTweet);
            userClient.updateLikeCount(false);
            isTweetLiked = false;
        } else {
            LikeTweet newLikeTweet = new LikeTweet(authUserId, tweetId);
            likeTweetRepository.save(newLikeTweet);
            userClient.updateLikeCount(true);
            isTweetLiked = true;
        }
        return tweetServiceHelper.sendNotification(NotificationType.LIKE, isTweetLiked, tweet.getAuthorId(), authUserId, tweetId);
    }
}
