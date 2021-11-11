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

@Service
@Transactional
@RequiredArgsConstructor
public class CronService {

    private final SimpMessagingTemplate messagingTemplate;
    private final TweetRepository tweetRepository;
    private final ModelMapper modelMapper;

//    @Scheduled(initialDelay = 10000, fixedDelay = 2000)
    public void sendTweetBySchedule() {
        Tweet tweet = tweetRepository.findByScheduledDateLessThanEqual(LocalDateTime.now());
        TweetResponse map = modelMapper.map(tweet, TweetResponse.class);
        messagingTemplate.convertAndSend("/topic/feed/add", map);
    }
}
