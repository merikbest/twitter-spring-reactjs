package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.event.UpdateTweetEvent;

public interface TweetHandlerService {

    void handleUpdateTweet(UpdateTweetEvent tweetEvent);
}
