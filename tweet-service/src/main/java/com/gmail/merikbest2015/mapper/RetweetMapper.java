package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.response.user.UserResponse;
import com.gmail.merikbest2015.dto.response.notification.NotificationResponse;
import com.gmail.merikbest2015.dto.response.TweetUserResponse;
import com.gmail.merikbest2015.repository.projection.TweetUserProjection;
import com.gmail.merikbest2015.repository.projection.UserProjection;
import com.gmail.merikbest2015.service.RetweetService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RetweetMapper {

    private final BasicMapper basicMapper;
    private final RetweetService retweetService;

    public HeaderResponse<TweetUserResponse> getUserRetweetsAndReplies(Long userId, Pageable pageable) {
        Page<TweetUserProjection> tweets = retweetService.getUserRetweetsAndReplies(userId, pageable);
        return basicMapper.getHeaderResponse(tweets, TweetUserResponse.class);
    }

    public HeaderResponse<UserResponse> getRetweetedUsersByTweetId(Long tweetId, Pageable pageable) {
        Page<UserProjection> users = retweetService.getRetweetedUsersByTweetId(tweetId, pageable);
        return basicMapper.getHeaderResponse(users, UserResponse.class);
    }

    public NotificationResponse retweet(Long tweetId) {
        return retweetService.retweet(tweetId);
    }
}
