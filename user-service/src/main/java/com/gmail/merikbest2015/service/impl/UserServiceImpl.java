package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.dto.NotificationRequest;
import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.NotificationClient;
import com.gmail.merikbest2015.feign.TweetClient;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.UserRepository;
import com.gmail.merikbest2015.repository.projection.*;
import com.gmail.merikbest2015.service.AuthenticationService;
import com.gmail.merikbest2015.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;
    private final TweetClient tweetClient;
    private final NotificationClient notificationClient;

    @Override
    public UserProfileProjection getUserById(Long userId) {
        return userRepository.getUserById(userId, UserProfileProjection.class)
                .orElseThrow(() -> new ApiRequestException("User not found", HttpStatus.NOT_FOUND));
    }

    @Override
    public Page<UserProjection> getUsers(Pageable pageable) {
        Long userId = authenticationService.getAuthenticatedUserId();
        return userRepository.findByActiveTrueAndIdNot(userId, pageable);
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
    @Transactional
    public Boolean startUseTwitter() {
        Long userId = authenticationService.getAuthenticatedUserId();
        userRepository.updateProfileStarted(userId);
        return true;
    }

    @Override
    @Transactional
    public AuthUserProjection updateUserProfile(User userInfo) {
        if (userInfo.getUsername().length() == 0 || userInfo.getUsername().length() > 50) {
            throw new ApiRequestException("Incorrect username length", HttpStatus.BAD_REQUEST);
        }
        User user = authenticationService.getAuthenticatedUser();

        if (userInfo.getAvatar() != null) {
            user.setAvatar(userInfo.getAvatar());
        }
        if (userInfo.getWallpaper() != null) {
            user.setWallpaper(userInfo.getWallpaper());
        }
        user.setUsername(userInfo.getUsername());
        user.setAbout(userInfo.getAbout());
        user.setLocation(userInfo.getLocation());
        user.setWebsite(userInfo.getWebsite());
        user.setProfileCustomized(true);
        return userRepository.getUserById(user.getId(), AuthUserProjection.class).get();
    }

    @Override
    public Page<UserProjection> getFollowers(Long userId, Pageable pageable) {
        checkIsUserExist(userId);
        checkIsUserBlocked(userId);
        return userRepository.getFollowersById(userId, pageable);
    }

    @Override
    public Page<UserProjection> getFollowing(Long userId, Pageable pageable) { // TODO check in swagger
        checkIsUserExist(userId);
        checkIsUserBlocked(userId);
        return userRepository.getFollowingById(userId, pageable);
    }

    @Override
    public Page<FollowerUserProjection> getFollowerRequests(Pageable pageable) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return userRepository.getFollowerRequests(authUserId, pageable);
    }

    @Override
    @Transactional
    public Boolean processFollow(Long userId) {
        checkIsUserExist(userId);
        Long authUserId = authenticationService.getAuthenticatedUserId();
        boolean isFollower = userRepository.isFollower(authUserId, userId);
        boolean follower;

        if (isFollower) {
            userRepository.unfollow(authUserId, userId);
            userRepository.unsubscribe(authUserId, userId);
            follower = false;
        } else {
            userRepository.follow(authUserId, userId);
            follower = true;
        }

        NotificationRequest request = NotificationRequest.builder()
                .notificationType(NotificationType.FOLLOW)
                .userId(authUserId)
                .userToFollowId(userId)
                .notifiedUserId(userId)
                .build();
        notificationClient.sendUserNotification(request);
        return follower;
    }

    @Override
    public List<BaseUserProjection> overallFollowers(Long userId) {
        checkIsUserExist(userId);
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return userRepository.getSameFollowers(userId, authUserId, BaseUserProjection.class);
    }

    @Override
    @Transactional
    public UserProfileProjection processFollowRequestToPrivateProfile(Long userId) {
        checkIsUserExist(userId);
        Long authUserId = authenticationService.getAuthenticatedUserId();
        boolean isFollowerRequest = userRepository.isFollowerRequest(userId, authUserId);

        if (isFollowerRequest) {
            userRepository.removeFollowerRequest(authUserId, userId);
        } else {
            userRepository.addFollowerRequest(authUserId, userId);
        }
        return userRepository.getUserById(userId, UserProfileProjection.class).get();
    }

    @Override
    @Transactional
    public String acceptFollowRequest(Long userId) {
        checkIsUserExist(userId);
        Long authUserId = authenticationService.getAuthenticatedUserId();
        userRepository.removeFollowerRequest(userId, authUserId);
        userRepository.follow(userId, authUserId);
        return "User (id:" + userId + ") accepted.";
    }

    @Override
    @Transactional
    public String declineFollowRequest(Long userId) {
        checkIsUserExist(userId);
        Long authUserId = authenticationService.getAuthenticatedUserId();
        userRepository.removeFollowerRequest(userId, authUserId);
        return "User (id:" + userId + ") declined.";
    }

    @Override
    @Transactional
    public Boolean processSubscribeToNotifications(Long userId) {
        checkIsUserExist(userId);
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
            throw new ApiRequestException("Tweet not found", HttpStatus.NOT_FOUND);
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
    public Page<BlockedUserProjection> getBlockList(Pageable pageable) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return userRepository.getUserBlockListById(authUserId, pageable);
    }

    @Override
    @Transactional
    public Boolean processBlockList(Long userId) {
        checkIsUserExist(userId);
        Long authUserId = authenticationService.getAuthenticatedUserId();
        boolean isUserBlocked = userRepository.isUserBlocked(authUserId, userId);

        if (isUserBlocked) {
            userRepository.unblockUser(authUserId, userId);
            return false;
        } else {
            userRepository.blockUser(authUserId, userId);
            userRepository.unfollow(authUserId, userId);
            userRepository.unfollow(userId, authUserId);
            // TODO get lists by user id instead of user.getLists()
//            user.getLists().removeIf(list -> list.getMembers().stream()
//                    .anyMatch(member -> member.getId().equals(currentUser.getId())));
            return true;
        }
    }

    @Override
    public Page<MutedUserProjection> getMutedList(Pageable pageable) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return userRepository.getUserMuteListById(authUserId, pageable);
    }

    @Override
    @Transactional
    public Boolean processMutedList(Long userId) {
        checkIsUserExist(userId);
        Long authUserId = authenticationService.getAuthenticatedUserId();
        boolean isUserMuted = userRepository.isUserMuted(authUserId, userId);

        if (isUserMuted) {
            userRepository.unmuteUser(authUserId, userId);
            return false;
        } else {
            userRepository.muteUser(authUserId, userId);
            return true;
        }
    }

    @Override
    public UserDetailProjection getUserDetails(Long userId) {
        return userRepository.getUserById(userId, UserDetailProjection.class)
                .orElseThrow(() -> new ApiRequestException("User not found", HttpStatus.NOT_FOUND));
    }

    private void checkIsUserExist(Long userId) {
        boolean userExist = userRepository.isUserExist(userId);

        if (!userExist) {
            throw new ApiRequestException("User (id:" + userId + ") not found", HttpStatus.NOT_FOUND);
        }
    }

    private void checkIsUserBlocked(Long userId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        boolean userBlocked = userRepository.isUserBlocked(userId, authUserId);

        if (userBlocked) {
            throw new ApiRequestException("User (id:" + authUserId + ") is blocked", HttpStatus.BAD_REQUEST);
        }
    }

    public boolean isUserFollowByOtherUser(Long userId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return userRepository.isUserFollowByOtherUser(authUserId, userId);
    }

    public boolean isUserHavePrivateProfile(Long userId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return !userRepository.isUserHavePrivateProfile(userId, authUserId);
    }

    public boolean isUserBlockedByMyProfile(Long userId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return userRepository.isUserBlocked(authUserId, userId);
    }

    public boolean isUserMutedByMyProfile(Long userId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return userRepository.isUserMuted(authUserId, userId);
    }

    public boolean isMyProfileBlockedByUser(Long userId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return userRepository.isUserBlocked(userId, authUserId);
    }

    public boolean isMyProfileWaitingForApprove(Long userId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return userRepository.isMyProfileWaitingForApprove(userId, authUserId);
    }

    public boolean isMyProfileSubscribed(Long userId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return userRepository.isMyProfileSubscribed(userId, authUserId);
    }

    public List<SameFollower> getSameFollowers(Long userId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return userRepository.getSameFollowers(userId, authUserId, SameFollower.class);
    }
}
