package com.gmail.merikbest2015.service.cron;

import com.gmail.merikbest2015.broker.producer.UpdateTweetCountProducer;
import com.gmail.merikbest2015.client.WebSocketClient;
import com.gmail.merikbest2015.repository.TweetRepository;
import com.gmail.merikbest2015.service.util.TweetServiceHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class CronService {

    private final WebSocketClient webSocketClient;
    private final TweetRepository tweetRepository;
    private final TweetServiceHelper tweetServiceHelper;
    private final UpdateTweetCountProducer updateTweetCountProducer;

    @Scheduled(initialDelay = 30000, fixedDelay = 30000)
    public void sendTweetBySchedule() {
        tweetRepository.findAllByScheduledDate(LocalDateTime.now()).forEach((tweet) -> {
            if (tweet.getText().contains("youtube.com") || !tweet.getImages().isEmpty()) {
                updateTweetCountProducer.sendUpdateMediaTweetCountEvent(tweet.getAuthor().getId(), true);
            } else {
                updateTweetCountProducer.sendUpdateTweetCountEvent(tweet.getAuthor().getId(), true);
            }
            tweet.setScheduledDate(null);
            tweet.setCreatedAt(LocalDateTime.now());
            // TODO refactor
//            TweetResponse tweetResponse = tweetServiceHelper.processTweetResponse(tweet, null);
//            webSocketClient.send(TOPIC_FEED_SCHEDULE, tweetResponse);
        });
    }
}
