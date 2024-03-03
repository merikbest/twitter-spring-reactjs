package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.dto.request.NotificationRequest;
import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.feign.NotificationClient;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.producer.FollowRequestUserProducer;
import com.gmail.merikbest2015.producer.FollowUserProducer;
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
    private final FollowUserProducer followUserProducer;
    private final FollowRequestUserProducer followRequestUserProducer;

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
        User user = userServiceHelper.getUserById(userId);
        User authUser = authenticationService.getAuthenticatedUser();
        userServiceHelper.checkIsUserBlocked(user, authUser);

        if (followerUserRepository.isFollower(authUser, user)) {
            authUser.getFollowers().remove(user);
            user.getSubscribers().remove(authUser);
            followUserProducer.sendFollowUserEvent(user, authUser.getId(), false);
        } else {
            if (!user.isPrivateProfile()) {
                authUser.getFollowers().add(user);
                NotificationRequest request = NotificationRequest.builder()
                        .notificationType(NotificationType.FOLLOW)
                        .userId(authUser.getId())
                        .userToFollowId(userId)
                        .notifiedUserId(userId)
                        .build();
                notificationClient.sendNotification(request);
                followUserProducer.sendFollowUserEvent(user, authUser.getId(), true);
                return true;
            } else {
                followerUserRepository.addFollowerRequest(authUser.getId(), userId);
                followRequestUserProducer.sendFollowRequestUserEvent(user, authUser.getId(), true);
            }
        }
        return false;
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
        User user = userServiceHelper.getUserById(userId);
        userServiceHelper.checkIsUserExistOrMyProfileBlocked(userId);
        User authUser = authenticationService.getAuthenticatedUser();
        boolean hasUserFollowRequest;

        if (followerUserRepository.isFollowerRequest(user.getId(), authUser.getId())) {
            followerUserRepository.removeFollowerRequest(authUser.getId(), user.getId());
            hasUserFollowRequest = false;
        } else {
            followerUserRepository.addFollowerRequest(authUser.getId(), user.getId());
            hasUserFollowRequest = true;
        }
        followRequestUserProducer.sendFollowRequestUserEvent(user, authUser.getId(), hasUserFollowRequest);
        return userRepository.getUserById(user.getId(), UserProfileProjection.class).get();
    }

    @Override
    @Transactional
    public String acceptFollowRequest(Long userId) {
        User user = userServiceHelper.getUserById(userId);
        User authUser = authenticationService.getAuthenticatedUser();
        followerUserRepository.removeFollowerRequest(user.getId(), authUser.getId());
        followerUserRepository.follow(user.getId(), authUser.getId());
        followRequestUserProducer.sendFollowRequestUserEvent(user, authUser.getId(), false);
        followUserProducer.sendFollowUserEvent(user, authUser.getId(), true);
        return String.format("User (id:%s) accepted.", userId);
    }

    @Override
    @Transactional
    public String declineFollowRequest(Long userId) {
        User user = userServiceHelper.getUserById(userId);
        User authUser = authenticationService.getAuthenticatedUser();
        followerUserRepository.removeFollowerRequest(user.getId(), authUser.getId());
        followRequestUserProducer.sendFollowRequestUserEvent(user, authUser.getId(), false);
        return String.format("User (id:%s) declined.", userId);
    }
}
