package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.IdsRequest;
import com.gmail.merikbest2015.dto.UserResponse;
import com.gmail.merikbest2015.dto.notification.NotificationResponse;
import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.model.Retweet;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.repository.RetweetRepository;
import com.gmail.merikbest2015.repository.TweetRepository;
import com.gmail.merikbest2015.repository.projection.RetweetProjection;
import com.gmail.merikbest2015.repository.projection.TweetUserProjection;
import com.gmail.merikbest2015.service.RetweetService;
import com.gmail.merikbest2015.util.AuthUtil;
import com.gmail.merikbest2015.util.TweetServiceHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RetweetServiceImpl implements RetweetService {

    private final TweetRepository tweetRepository;
    private final TweetServiceHelper tweetServiceHelper;
    private final RetweetRepository retweetRepository;
    private final UserClient userClient;

    @Override
    public Page<TweetUserProjection> getUserRetweetsAndReplies(Long userId, Pageable pageable) {
        tweetServiceHelper.checkIsUserExist(userId);
        List<TweetUserProjection> replies = tweetRepository.getRepliesByUserId(userId);
        List<RetweetProjection> retweets = retweetRepository.getRetweetsByUserId(userId);
        List<TweetUserProjection> userTweets = tweetServiceHelper.combineTweetsArrays(replies, retweets);
        return tweetServiceHelper.getPageableTweetProjectionList(pageable, userTweets, replies.size() + retweets.size());
    }

    @Override
    public HeaderResponse<UserResponse> getRetweetedUsersByTweetId(Long tweetId, Pageable pageable) {
        Page<Long> retweetedUserIds = retweetRepository.getRetweetedUserIds(tweetId, pageable);
        return userClient.getRetweetedUsersByIds(new IdsRequest(retweetedUserIds.getContent()), pageable);
    }

    @Override
    @Transactional
    public NotificationResponse retweet(Long tweetId) {
        Long userId = AuthUtil.getAuthenticatedUserId();
        Tweet tweet = tweetRepository.findById(tweetId)
                .orElseThrow(() -> new ApiRequestException("Tweet not found", HttpStatus.NOT_FOUND));
        tweetServiceHelper.checkIsValidUserProfile(tweet.getAuthorId());
        Retweet retweet = retweetRepository.isTweetRetweeted(userId, tweetId);
        boolean isRetweeted;

        if (retweet != null) {
            retweetRepository.delete(retweet);
            userClient.updateTweetCount(false);
            isRetweeted = false;
        } else {
            Retweet newRetweet = new Retweet(userId, tweetId);
            retweetRepository.save(newRetweet);
            userClient.updateTweetCount(true);
            isRetweeted = true;
        }
        return tweetServiceHelper.sendNotification(NotificationType.RETWEET, isRetweeted, tweet.getAuthorId(), userId, tweetId);
    }
}
