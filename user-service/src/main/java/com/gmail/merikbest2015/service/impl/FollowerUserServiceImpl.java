package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.dto.request.NotificationRequest;
import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.feign.NotificationClient;
import com.gmail.merikbest2015.repository.FollowerUserRepository;
import com.gmail.merikbest2015.repository.UserRepository;
import com.gmail.merikbest2015.repository.projection.BaseUserProjection;
import com.gmail.merikbest2015.repository.projection.FollowerUserProjection;
import com.gmail.merikbest2015.repository.projection.UserProfileProjection;
import com.gmail.merikbest2015.repository.projection.UserProjection;
import com.gmail.merikbest2015.service.AuthenticationService;
import com.gmail.merikbest2015.service.FollowerUserService;
import com.gmail.merikbest2015.service.util.UserServiceHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FollowerUserServiceImpl implements FollowerUserService {

    private final UserRepository userRepository;
    private final FollowerUserRepository followerUserRepository;
    private final AuthenticationService authenticationService;
    private final NotificationClient notificationClient;
    private final UserServiceHelper userServiceHelper;

    @Override
    public Page<UserProjection> getFollowers(Long userId, Pageable pageable) {
        userServiceHelper.validateUserProfile(userId);
        return followerUserRepository.getFollowersById(userId, pageable);
    }

    @Override
    public Page<UserProjection> getFollowing(Long userId, Pageable pageable) {
        userServiceHelper.validateUserProfile(userId);
        return followerUserRepository.getFollowingById(userId, pageable);
    }

    @Override
    public Page<FollowerUserProjection> getFollowerRequests(Pageable pageable) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return followerUserRepository.getFollowerRequests(authUserId, pageable);
    }

    @Override
    @Transactional
    public Boolean processFollow(Long userId) {
        userServiceHelper.checkIsUserExistOrMyProfileBlocked(userId);
        Long authUserId = authenticationService.getAuthenticatedUserId();
        boolean isFollower = followerUserRepository.isFollower(authUserId, userId);
        boolean follower = false;

        if (isFollower) {
            followerUserRepository.unfollow(authUserId, userId);
            userRepository.unsubscribe(authUserId, userId);
        } else {
            boolean isPrivateProfile = userRepository.getUserPrivateProfile(userId);

            if (!isPrivateProfile) {
                followerUserRepository.follow(authUserId, userId);
                NotificationRequest request = NotificationRequest.builder()
                        .notificationType(NotificationType.FOLLOW)
                        .userId(authUserId)
                        .userToFollowId(userId)
                        .notifiedUserId(userId)
                        .build();
                notificationClient.sendNotification(request);
                follower = true;
            } else {
                followerUserRepository.addFollowerRequest(authUserId, userId);
            }
        }
        return follower;
    }

    @Override
    public List<BaseUserProjection> overallFollowers(Long userId) {
        userServiceHelper.validateUserProfile(userId);
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return followerUserRepository.getSameFollowers(userId, authUserId, BaseUserProjection.class);
    }

    @Override
    @Transactional
    public UserProfileProjection processFollowRequestToPrivateProfile(Long userId) {
        userServiceHelper.checkIsUserExistOrMyProfileBlocked(userId);
        Long authUserId = authenticationService.getAuthenticatedUserId();
        boolean isFollowerRequest = followerUserRepository.isFollowerRequest(userId, authUserId);

        if (isFollowerRequest) {
            followerUserRepository.removeFollowerRequest(authUserId, userId);
        } else {
            followerUserRepository.addFollowerRequest(authUserId, userId);
        }
        return userRepository.getUserById(userId, UserProfileProjection.class).get();
    }

    @Override
    @Transactional
    public String acceptFollowRequest(Long userId) {
        userServiceHelper.checkIsUserExist(userId);
        Long authUserId = authenticationService.getAuthenticatedUserId();
        followerUserRepository.removeFollowerRequest(userId, authUserId);
        followerUserRepository.follow(userId, authUserId);
        return String.format("User (id:%s) accepted.", userId);
    }

    @Override
    @Transactional
    public String declineFollowRequest(Long userId) {
        userServiceHelper.checkIsUserExist(userId);
        Long authUserId = authenticationService.getAuthenticatedUserId();
        followerUserRepository.removeFollowerRequest(userId, authUserId);
        return String.format("User (id:%s) declined.", userId);
    }
}
