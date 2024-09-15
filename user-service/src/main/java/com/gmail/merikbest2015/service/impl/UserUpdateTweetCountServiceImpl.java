package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.commons.event.UpdateTweetCountEvent;
import com.gmail.merikbest2015.commons.exception.ApiRequestException;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.UserRepository;
import com.gmail.merikbest2015.service.UserUpdateTweetCountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.gmail.merikbest2015.commons.constants.ErrorMessage.USER_NOT_FOUND;
import static java.lang.Long.parseLong;

@Service
@RequiredArgsConstructor
public class UserUpdateTweetCountServiceImpl implements UserUpdateTweetCountService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public void handleUpdateTweetCount(UpdateTweetCountEvent tweetCountEvent, String authId) {
        User user = getUserById(parseLong(authId));
        userRepository.updateTweetCount(tweetCountEvent.isUpdateTweetsCount(), user.getId());
    }

    @Override
    @Transactional
    public void handleUpdateLikeTweetCount(UpdateTweetCountEvent tweetCountEvent, String authId) {
        User user = getUserById(parseLong(authId));
        userRepository.updateLikeCount(tweetCountEvent.isUpdateTweetsCount(), user.getId());
    }

    @Override
    @Transactional
    public void handleUpdateMediaTweetCount(UpdateTweetCountEvent tweetCountEvent, String authId) {
        User user = getUserById(parseLong(authId));
        userRepository.updateMediaTweetCount(tweetCountEvent.isUpdateTweetsCount(), user.getId());
    }

    private User getUserById(Long userId) {
        return userRepository.getUserById(userId, User.class)
                .orElseThrow(() -> new ApiRequestException(USER_NOT_FOUND, HttpStatus.NOT_FOUND));
    }
}
