package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.event.UpdateTweetCountEvent;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.UserRepository;
import com.gmail.merikbest2015.service.UserUpdateTweetCountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.gmail.merikbest2015.constants.ErrorMessage.USER_NOT_FOUND;
import static java.lang.Long.parseLong;

@Service
@RequiredArgsConstructor
public class UserUpdateTweetCountServiceImpl implements UserUpdateTweetCountService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public void handleUpdateTweetCount(UpdateTweetCountEvent tweetCountEvent, String authId) {
        User user = getUserById(parseLong(authId));
        Long tweetCount = updateCount(tweetCountEvent.isUpdateTweetsCount(), user.getTweetCount());
        user.setTweetCount(tweetCount);
    }

    @Override
    @Transactional
    public void handleUpdateLikeTweetCount(UpdateTweetCountEvent tweetCountEvent, String authId) {
        User user = getUserById(parseLong(authId));
        Long likeTweetCount = updateCount(tweetCountEvent.isUpdateTweetsCount(), user.getLikeCount());
        user.setLikeCount(likeTweetCount);
    }

    @Override
    @Transactional
    public void handleUpdateMediaTweetCount(UpdateTweetCountEvent tweetCountEvent, String authId) {
        User user = getUserById(parseLong(authId));
        Long mediaTweetCount = updateCount(tweetCountEvent.isUpdateTweetsCount(), user.getMediaTweetCount());
        user.setMediaTweetCount(mediaTweetCount);
    }

    private User getUserById(Long userId) {
        return userRepository.getUserById(userId, User.class)
                .orElseThrow(() -> new ApiRequestException(USER_NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    private Long updateCount(boolean isUpdateTweetsCount, Long count) {
        return isUpdateTweetsCount ? count + 1 : count - 1;
    }
}
