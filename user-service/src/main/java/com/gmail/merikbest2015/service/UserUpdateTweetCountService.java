package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.event.UpdateTweetCountEvent;

public interface UserUpdateTweetCountService {

    void handleUpdateTweetCount(UpdateTweetCountEvent tweetCountEvent, String authId);

    void handleUpdateLikeTweetCount(UpdateTweetCountEvent tweetCountEvent, String authId);

    void handleUpdateMediaTweetCount(UpdateTweetCountEvent tweetCountEvent, String authId);
}
