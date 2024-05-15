package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.event.TweetNotificationDto;
import com.gmail.merikbest2015.event.UpdateTweetEvent;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.TweetRepository;
import com.gmail.merikbest2015.service.TweetHandlerService;
import com.gmail.merikbest2015.service.UserHandlerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TweetHandlerServiceImpl implements TweetHandlerService {

    private final TweetRepository tweetRepository;
    private final UserHandlerService userHandlerService;

    @Override
    public void handleUpdateTweet(UpdateTweetEvent tweetEvent) {
        // TODO add tweet creation
    }

    @Override
    public Tweet getOrCreateTweet(TweetNotificationDto tweet) {
        User author = userHandlerService.getOrCreateUser(tweet.getAuthor());
        return tweetRepository.findById(tweet.getId())
                .orElseGet(() -> {
                    Tweet newTweet = new Tweet();
                    newTweet.setId(tweet.getId());
                    newTweet.setText(tweet.getText());
                    newTweet.setAuthor(author);
                    return tweetRepository.save(newTweet);
                });
    }
}
