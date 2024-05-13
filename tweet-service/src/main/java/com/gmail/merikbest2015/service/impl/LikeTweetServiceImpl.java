package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.broker.producer.TweetNotificationProducer;
import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.model.LikeTweet;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.broker.producer.UpdateTweetCountProducer;
import com.gmail.merikbest2015.repository.LikeTweetRepository;
import com.gmail.merikbest2015.repository.projection.LikeTweetProjection;
import com.gmail.merikbest2015.repository.projection.UserProjection;
import com.gmail.merikbest2015.service.LikeTweetService;
import com.gmail.merikbest2015.service.UserService;
import com.gmail.merikbest2015.service.util.TweetValidationHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LikeTweetServiceImpl implements LikeTweetService {

    private final LikeTweetRepository likeTweetRepository;
    private final TweetValidationHelper tweetValidationHelper;
    private final UpdateTweetCountProducer tweetCountProducer;
    private final TweetNotificationProducer tweetNotificationProducer;
    private final UserService userService;

    @Override
    @Transactional(readOnly = true)
    public Page<LikeTweetProjection> getUserLikedTweets(Long userId, Pageable pageable) {
        tweetValidationHelper.validateUserProfile(userId);
        return likeTweetRepository.getUserLikedTweets(userId, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<UserProjection> getLikedUsersByTweetId(Long tweetId, Pageable pageable) {
        Tweet tweet = tweetValidationHelper.checkValidTweet(tweetId);
        return userService.getLikedUsersByTweet(tweet, pageable);
    }

    @Override
    @Transactional
    public Tweet likeTweet(Long tweetId) {
        Tweet tweet = tweetValidationHelper.checkValidTweet(tweetId);
        User authUser = userService.getAuthUser();
        LikeTweet likedTweet = likeTweetRepository.getLikedTweet(authUser, tweet);
        boolean isTweetLiked;

        if (likedTweet != null) {
            likeTweetRepository.delete(likedTweet);
            isTweetLiked = false;
        } else {
            LikeTweet newLikeTweet = new LikeTweet(authUser, tweet);
            likeTweetRepository.save(newLikeTweet);
            isTweetLiked = true;
        }
        tweetCountProducer.sendUpdateLikeTweetCountEvent(authUser.getId(), isTweetLiked);
        tweetNotificationProducer.sendTweetNotificationEvent(NotificationType.LIKE, tweet, authUser, isTweetLiked);
        return tweet;
    }
}
