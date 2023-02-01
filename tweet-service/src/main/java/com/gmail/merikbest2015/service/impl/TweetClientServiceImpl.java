package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.dto.ChatTweetResponse;
import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.IdsRequest;
import com.gmail.merikbest2015.dto.TweetResponse;
import com.gmail.merikbest2015.dto.notification.NotificationTweetResponse;
import com.gmail.merikbest2015.mapper.BasicMapper;
import com.gmail.merikbest2015.repository.TweetRepository;
import com.gmail.merikbest2015.repository.projection.ChatTweetProjection;
import com.gmail.merikbest2015.repository.projection.NotificationTweetProjection;
import com.gmail.merikbest2015.repository.projection.TweetProjection;
import com.gmail.merikbest2015.service.TweetClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TweetClientServiceImpl implements TweetClientService {

    private final TweetRepository tweetRepository;
    private final BasicMapper basicMapper;
//    @Override
//    public Optional<Tweet> getTweetById(Long userId) {
//        return tweetRepository.findById(userId);
//    }
//
//    @Override
//    public List<TweetsUserProjection> getTweetsByUserId(Long userId) {
//        return tweetRepository.getTweetsByUserId(userId);
//    }
//
//    @Override
//    public Optional<TweetsUserProjection> getPinnedTweetByUserId(Long userId) {
//        return tweetRepository.getPinnedTweetByUserId(userId);
//    }
//
//    @Override
//    public Page<TweetProjection> getAllUserMediaTweets(TweetPageableRequest request) {
//        return tweetRepository.getAllUserMediaTweets(request.getUserId(), request.getPageable());
//    }
//
//    @Override
//    public Page<TweetProjection> getUserMentions(TweetPageableRequest request) {
//        return tweetRepository.getUserMentions(request.getUserId(), request.getPageable());
//    }
//
//    @Override
//    public List<TweetImageProjection> getUserTweetImages(TweetPageableRequest request) {
//        return tweetRepository.getUserTweetImages(request.getUserId(), request.getPageable());
//    }
//
//    @Override
//    public List<TweetsUserProjection> getRepliesByUserId(Long userId) {
//        return tweetRepository.getRepliesByUserId(userId);
//    }
//
//    @Override
//    public List<TweetProjection> getNotificationsFromTweetAuthors(Long userId) {
//        return tweetRepository.getNotificationsFromTweetAuthors(userId).stream()
//                .map(TweetsProjection::getTweet)
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public List<TweetProjection> getTweetsByIds(List<Long> tweetIds) {
//        return tweetRepository.getTweetsByIds(tweetIds);
//    }
//
//    @Override
//    public Page<TweetProjection> getTweetsByUserIds(TweetUserIdsRequest request, Pageable pageable) {
//        return tweetRepository.findTweetsByUserIds(request.getUserIds(), pageable);
//    }

    @Override
    public TweetResponse getTweetById(Long tweetId) {
        TweetProjection tweet = tweetRepository.getTweetById(tweetId, TweetProjection.class).get();
        return basicMapper.convertToResponse(tweet, TweetResponse.class);
    }

    @Override
    public HeaderResponse<TweetResponse> getTweetsByIds(IdsRequest request, Pageable pageable) {
        Page<TweetProjection> tweets = tweetRepository.getTweetsByIds(request.getIds(), pageable);
        return basicMapper.getHeaderResponse(tweets, TweetResponse.class);
    }

    @Override
    public NotificationTweetResponse getNotificationTweet(Long tweetId) {
        NotificationTweetProjection tweet = tweetRepository.getNotificationTweet(tweetId);
        return basicMapper.convertToResponse(tweet, NotificationTweetResponse.class);
    }

    @Override
    public Boolean isTweetExists(Long tweetId) {
        return tweetRepository.isTweetExists(tweetId);
    }

    @Override
    public ChatTweetResponse getChatTweet(Long tweetId) {
        ChatTweetProjection tweet = tweetRepository.getChatTweet(tweetId);
        return basicMapper.convertToResponse(tweet, ChatTweetResponse.class);
    }
}
