package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.dto.request.SearchTermsRequest;
import com.gmail.merikbest2015.event.UpdateTweetCountEvent;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.TagClient;
import com.gmail.merikbest2015.feign.TweetClient;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.producer.UpdateUserProducer;
import com.gmail.merikbest2015.repository.UserRepository;
import com.gmail.merikbest2015.repository.projection.*;
import com.gmail.merikbest2015.service.AuthenticationService;
import com.gmail.merikbest2015.service.UserService;
import com.gmail.merikbest2015.service.util.UserServiceHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

import static com.gmail.merikbest2015.constants.ErrorMessage.*;
import static java.lang.Long.parseLong;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;
    private final UserServiceHelper userServiceHelper;
    private final UpdateUserProducer updateUserProducer;
    private final TweetClient tweetClient;
    private final TagClient tagClient;

    @Override
    public UserProfileProjection getUserById(Long userId) {
        return userRepository.getUserById(userId, UserProfileProjection.class)
                .orElseThrow(() -> new ApiRequestException(USER_NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    @Override
    public Page<UserProjection> getUsers(Pageable pageable) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return userRepository.findByActiveTrueAndIdNot(authUserId, pageable);
    }

    @Override
    public List<UserProjection> getRelevantUsers() {
        return userRepository.findTop5ByActiveTrue();
    }

    @Override
    public <T> Page<T> searchUsersByUsername(String text, Pageable pageable, Class<T> type) {
        return userRepository.searchUsersByUsername(text, pageable, type);
    }

    @Override
    public Map<String, Object> searchByText(String text) {
        Long tweetCount = tweetClient.getTweetCountByText(text);
        List<String> tags = tagClient.getTagsByText(text);
        List<CommonUserProjection> users = userRepository.searchUserByText(text);
        return Map.of("tweetCount", tweetCount, "tags", tags, "users", users);
    }

    @Override
    public List<CommonUserProjection> getSearchResults(SearchTermsRequest request) {
        return userRepository.getUsersByIds(request.getUsers(), CommonUserProjection.class);
    }

    @Override
    @Transactional
    public Boolean startUseTwitter() {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        userRepository.updateProfileStarted(authUserId);
        return true;
    }

    @Override
    @Transactional
    public AuthUserProjection updateUserProfile(User userInfo) {
        if (userInfo.getFullName().length() == 0 || userInfo.getFullName().length() > 50) {
            throw new ApiRequestException(INCORRECT_USERNAME_LENGTH, HttpStatus.BAD_REQUEST);
        }
        User user = authenticationService.getAuthenticatedUser();

        if (userInfo.getAvatar() != null) {
            user.setAvatar(userInfo.getAvatar());
        }
        if (userInfo.getWallpaper() != null) {
            user.setWallpaper(userInfo.getWallpaper());
        }
        user.setFullName(userInfo.getFullName());
        user.setAbout(userInfo.getAbout());
        user.setLocation(userInfo.getLocation());
        user.setWebsite(userInfo.getWebsite());
        user.setProfileCustomized(true);
        updateUserProducer.sendUpdateUserEvent(user);
        return userRepository.getUserById(user.getId(), AuthUserProjection.class).get();
    }

    @Override
    @Transactional
    public Boolean processSubscribeToNotifications(Long userId) {
        userServiceHelper.checkIsUserExistOrMyProfileBlocked(userId);
        Long authUserId = authenticationService.getAuthenticatedUserId();
        boolean isUserSubscribed = userRepository.isUserSubscribed(userId, authUserId);

        if (isUserSubscribed) {
            userRepository.unsubscribe(authUserId, userId);
            return false;
        } else {
            userRepository.subscribe(authUserId, userId);
            return true;
        }
    }

    @Override
    @Transactional
    public Long processPinTweet(Long tweetId) {
        if (!tweetClient.isTweetExists(tweetId)) {
            throw new ApiRequestException(TWEET_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        Long authUserId = authenticationService.getAuthenticatedUserId();
        Long pinnedTweetId = userRepository.getPinnedTweetId(authUserId);

        if (pinnedTweetId == null || !pinnedTweetId.equals(tweetId)) {
            userRepository.updatePinnedTweetId(tweetId, authUserId);
            return tweetId;
        } else {
            userRepository.updatePinnedTweetId(null, authUserId);
            return 0L;
        }
    }

    @Override
    public UserDetailProjection getUserDetails(Long userId) {
        userServiceHelper.checkIsUserExistOrMyProfileBlocked(userId);
        return userRepository.getUserById(userId, UserDetailProjection.class)
                .orElseThrow(() -> new ApiRequestException(USER_NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    @Override
    @Transactional
    public void handleUpdateTweetCount(UpdateTweetCountEvent tweetCountEvent, String authId) {
        User user = userRepository.getUserById(parseLong(authId), User.class)
                .orElseThrow(() -> new ApiRequestException(USER_NOT_FOUND, HttpStatus.NOT_FOUND));
        Long tweetCount = tweetCountEvent.isUpdateTweetsCount() ? user.getTweetCount() + 1 : user.getTweetCount() - 1;
        user.setTweetCount(tweetCount);
    }

    @Override
    @Transactional
    public void handleUpdateLikeTweetCount(UpdateTweetCountEvent tweetCountEvent, String authId) {
        User user = userRepository.getUserById(parseLong(authId), User.class)
                .orElseThrow(() -> new ApiRequestException(USER_NOT_FOUND, HttpStatus.NOT_FOUND));
        Long likeTweetCount = tweetCountEvent.isUpdateTweetsCount() ? user.getLikeCount() + 1 : user.getLikeCount() - 1;
        user.setLikeCount(likeTweetCount);
    }

    @Override
    @Transactional
    public void handleUpdateMediaTweetCount(UpdateTweetCountEvent tweetCountEvent, String authId) {
        User user = userRepository.getUserById(parseLong(authId), User.class)
                .orElseThrow(() -> new ApiRequestException(USER_NOT_FOUND, HttpStatus.NOT_FOUND));
        Long mediaTweetCount = tweetCountEvent.isUpdateTweetsCount() ? user.getMediaTweetCount() + 1 : user.getMediaTweetCount() - 1;
        user.setMediaTweetCount(mediaTweetCount);
    }
}
