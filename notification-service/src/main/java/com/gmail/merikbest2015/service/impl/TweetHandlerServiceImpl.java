package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.event.UpdateTweetEvent;
import com.gmail.merikbest2015.repository.TweetRepository;
import com.gmail.merikbest2015.service.TweetHandlerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TweetHandlerServiceImpl implements TweetHandlerService {

    private final TweetRepository tweetRepository;

    @Override
    public void handleUpdateTweet(UpdateTweetEvent tweetEvent) {
        // TODO add tweet creation
    }
}
