package com.gmail.merikbest2015.twitterspringreactjs.service.cron;

import com.gmail.merikbest2015.twitterspringreactjs.mapper.TweetMapper;
import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.repository.TweetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CronService {

    private final SimpMessagingTemplate messagingTemplate;
    private final TweetRepository tweetRepository;
    private final TweetMapper tweetMapper;

    @Scheduled(initialDelay = 10000, fixedDelay = 10000)
    public void sendTweetBySchedule() {
        List<Tweet> tweets = tweetRepository.findAllByScheduledDate(LocalDateTime.now());
        tweets.forEach(tweet -> tweet.setScheduledDate(null));
        tweetRepository.saveAll(tweets);
        messagingTemplate.convertAndSend("/topic/feed/schedule", tweetMapper.convertListToResponse(tweets));
    }
}
