package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.TweetRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.UserRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.TweetResponse;
import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.service.TweetService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class TweetMapper {

    private final ModelMapper modelMapper;
    private final UserMapper userMapper;
    private final TweetService tweetService;

    private Tweet convertToTweetEntity(TweetRequest tweetRequest) {
        return modelMapper.map(tweetRequest, Tweet.class);
    }

    private TweetResponse convertToTweetResponse(Tweet tweet) {
        return modelMapper.map(tweet, TweetResponse.class);
    }

    List<TweetResponse> convertListToResponseDto(List<Tweet> tweets) {
        return tweets.stream()
                .map(this::convertToTweetResponse)
                .collect(Collectors.toList());
    }

    public List<TweetResponse> getTweets() {
        return convertListToResponseDto(tweetService.getTweets());
    }

    public TweetResponse getTweetById(Long tweetId) {
        return convertToTweetResponse(tweetService.getTweetById(tweetId));
    }

    public TweetResponse createTweet(TweetRequest tweetRequest) {
        return convertToTweetResponse(tweetService.createTweet(convertToTweetEntity(tweetRequest)));
    }

    public List<TweetResponse> deleteTweet(Long tweetId) {
        return convertListToResponseDto(tweetService.deleteTweet(tweetId));
    }

    public TweetResponse likeTweet(Long tweetId) {
        return convertToTweetResponse(tweetService.likeTweet(tweetId));
    }

    public List<TweetResponse> getTweetsByUser(UserRequest userRequest) {
        return convertListToResponseDto(tweetService.getTweetsByUser(userMapper.convertToEntity(userRequest)));
    }

    public TweetResponse retweet(Long tweetId) {
        return convertToTweetResponse(tweetService.retweet(tweetId));
    }

    public List<TweetResponse> searchTweets(String text) {
        return convertListToResponseDto(tweetService.searchTweets(text));
    }

    public TweetResponse replyTweet(Long tweetId, TweetRequest tweetRequest) {
        return convertToTweetResponse(tweetService.replyTweet(tweetId, convertToTweetEntity(tweetRequest)));
    }
}
