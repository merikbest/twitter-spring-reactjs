package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.commons.event.TweetNotificationDto;
import com.gmail.merikbest2015.commons.event.UserNotificationDto;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.service.AbstractServiceTest;
import com.gmail.merikbest2015.service.TweetHandlerService;
import com.gmail.merikbest2015.commons.util.TestConstants;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class TweetHandlerServiceImplTest extends AbstractServiceTest {

    @Autowired
    private TweetHandlerService tweetHandlerService;

    @Test
    public void getOrCreateTweet_getTweet() {
        TweetNotificationDto tweetNotificationDto = TweetNotificationDto.builder()
                .id(TestConstants.TWEET_ID)
                .text(TestConstants.TWEET_TEXT)
                .author(UserNotificationDto.builder()
                        .id(TestConstants.USER_ID)
                        .username(TestConstants.USERNAME)
                        .avatar(TestConstants.AVATAR_SRC_1)
                        .build())
                .build();
        User author = new User();
        author.setId(TestConstants.USER_ID);
        author.setUsername(TestConstants.USERNAME);
        author.setAvatar(TestConstants.AVATAR_SRC_1);
        Tweet tweet = new Tweet();
        tweet.setId(TestConstants.TWEET_ID);
        tweet.setText(TestConstants.TWEET_TEXT);
        tweet.setAuthor(author);
        when(userRepository.findById(tweetNotificationDto.getAuthor().getId())).thenReturn(Optional.of(author));
        when(tweetRepository.findById(TestConstants.TWEET_ID)).thenReturn(Optional.of(tweet));
        assertEquals(tweet, tweetHandlerService.getOrCreateTweet(tweetNotificationDto));
    }
}
