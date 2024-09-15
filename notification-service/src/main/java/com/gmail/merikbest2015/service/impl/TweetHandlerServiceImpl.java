package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.commons.event.TweetNotificationDto;
import com.gmail.merikbest2015.commons.event.UpdateTweetEvent;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.TweetRepository;
import com.gmail.merikbest2015.service.TweetHandlerService;
import com.gmail.merikbest2015.service.UserHandlerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TweetHandlerServiceImpl implements TweetHandlerService {

    private final TweetRepository tweetRepository;
    private final UserHandlerService userHandlerService;

    @Override
    @Transactional
    public void handleUpdateTweet(UpdateTweetEvent tweetEvent) {
        tweetRepository.findById(tweetEvent.getId())
                .map(tweet -> {
                    tweet.setText(tweetEvent.getText());
                    return tweet;
                });
    }

    @Override
    @Transactional
    public Tweet getOrCreateTweet(TweetNotificationDto tweet) {
        User author = userHandlerService.getOrCreateUser(tweet.getAuthor());
        return tweetRepository.findById(tweet.getId())
                .orElseGet(() -> {
                    Tweet newTweet = new Tweet();
                    newTweet.setId(tweet.getId());
                    newTweet.setText(tweet.getText());
                    newTweet.setTweetType(tweet.getTweetType());
                    newTweet.setAuthor(author);
                    return tweetRepository.save(newTweet);
                });
    }
}
