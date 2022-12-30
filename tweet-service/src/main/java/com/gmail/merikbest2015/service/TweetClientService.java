package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.client.tweet.TweetPageableRequest;
import com.gmail.merikbest2015.models.Tweet;
import com.gmail.merikbest2015.projection.TweetImageProjection;
import com.gmail.merikbest2015.projection.TweetProjection;
import com.gmail.merikbest2015.projection.TweetsProjection;
import com.gmail.merikbest2015.projection.TweetsUserProjection;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface TweetClientService {

    Optional<Tweet> getTweetById(Long userId);

    List<TweetsUserProjection> getTweetsByUserId(Long userId);

    Optional<TweetsUserProjection> getPinnedTweetByUserId(Long userId);

    Page<TweetProjection> getAllUserMediaTweets(TweetPageableRequest request);

    Page<TweetProjection> getUserMentions(TweetPageableRequest request);

    List<TweetImageProjection> getUserTweetImages(TweetPageableRequest request);

    List<TweetsUserProjection> getRepliesByUserId(Long userId);

    List<TweetsProjection> getNotificationsFromTweetAuthors(Long userId);
}
