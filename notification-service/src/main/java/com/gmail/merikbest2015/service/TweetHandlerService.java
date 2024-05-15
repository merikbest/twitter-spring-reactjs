package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.event.TweetNotificationDto;
import com.gmail.merikbest2015.event.UpdateTweetEvent;
import com.gmail.merikbest2015.model.Tweet;

public interface TweetHandlerService {

    void handleUpdateTweet(UpdateTweetEvent tweetEvent);

    Tweet getOrCreateTweet(TweetNotificationDto tweet);
}
