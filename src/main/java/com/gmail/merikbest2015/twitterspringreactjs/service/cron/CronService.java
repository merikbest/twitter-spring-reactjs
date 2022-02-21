package com.gmail.merikbest2015.twitterspringreactjs.service.cron;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.repository.TweetRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CronService {

    private final SimpMessagingTemplate messagingTemplate;
    private final TweetRepository tweetRepository;
    private final ModelMapper modelMapper;

    @Scheduled(initialDelay = 30000, fixedDelay = 30000)
    public void sendTweetBySchedule() {
        List<Tweet> tweets = tweetRepository.findAllByScheduledDate(LocalDateTime.now());
        tweets.forEach(tweet -> tweet.setScheduledDate(null));
        tweetRepository.saveAll(tweets);
        messagingTemplate.convertAndSend(
                "/topic/feed/schedule",
                tweets.stream()
                        .map(tweet -> modelMapper.map(tweet, TweetResponse.class))
                        .collect(Collectors.toList())
        );
    }
}
