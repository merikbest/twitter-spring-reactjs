package com.gmail.merikbest2015.service.cron;

import com.gmail.merikbest2015.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.feign.WebSocketClient;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.producer.UpdateTweetCountProducer;
import com.gmail.merikbest2015.repository.TweetRepository;
import com.gmail.merikbest2015.service.util.TweetServiceHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import static com.gmail.merikbest2015.constants.WebsocketConstants.TOPIC_FEED_SCHEDULE;

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
        List<Tweet> tweets = tweetRepository.findAllByScheduledDate(LocalDateTime.now());
        tweets.forEach((tweet) -> {
            if (tweet.getText().contains("youtube.com") || !tweet.getImages().isEmpty()) {
                updateTweetCountProducer.sendUpdateMediaTweetCountEvent(tweet.getAuthor().getId(), true);
            } else {
                updateTweetCountProducer.sendUpdateTweetCountEvent(tweet.getAuthor().getId(), true);
            }
            tweet.setScheduledDate(null);
            tweet.setDateTime(LocalDateTime.now());
            TweetResponse tweetResponse = tweetServiceHelper.processTweetResponse(tweet);
            webSocketClient.send(TOPIC_FEED_SCHEDULE, tweetResponse);
        });
    }
}
