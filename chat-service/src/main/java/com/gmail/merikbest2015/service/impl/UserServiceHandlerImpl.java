package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.event.*;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.UserRepository;
import com.gmail.merikbest2015.service.UserServiceHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static java.lang.Long.parseLong;

@Service
@RequiredArgsConstructor
public class UserServiceHandlerImpl implements UserServiceHandler {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public void handleUpdateUser(UpdateUserEvent updateUserEvent) {
        userRepository.findById(updateUserEvent.getId())
                .map(user -> {
                    user.setUsername(updateUserEvent.getUsername());
                    user.setFullName(updateUserEvent.getFullName());
                    user.setAbout(updateUserEvent.getAbout());
                    user.setAvatar(updateUserEvent.getAvatar());
                    user.setPrivateProfile(updateUserEvent.isPrivateProfile());
                    user.setActive(updateUserEvent.isActive());
                    return user;
                })
                .orElseGet(() -> createUser(updateUserEvent));
    }

    @Override
    @Transactional
    public void handleBlockUser(BlockUserEvent blockUserEvent, String authId) {
        User user = userRepository.findById(blockUserEvent.getId())
                .orElseGet(() -> createUser(blockUserEvent));
        User authUser = userRepository.findById(parseLong(authId)).get();

        if (blockUserEvent.isUserBlocked()) {
            authUser.getUserBlockedList().add(user);
            authUser.getFollowers().remove(user);
            authUser.getFollowing().remove(user);
        } else {
            authUser.getUserBlockedList().remove(user);
        }
    }

    @Override
    @Transactional
    public void handleFollowUser(FollowUserEvent followUserEvent, String authId) {
        User user = userRepository.findById(followUserEvent.getId())
                .orElseGet(() -> createUser(followUserEvent));
        User authUser = userRepository.findById(parseLong(authId)).get();

        if (followUserEvent.isUserFollow()) {
            authUser.getFollowers().add(user);
        } else {
            authUser.getFollowers().remove(user);
        }
    }

    @Override
    @Transactional
    public void handleFollowUserRequest(FollowRequestUserEvent followRequestUserEvent, String authId) {
        User user = userRepository.findById(followRequestUserEvent.getId())
                .orElseGet(() -> createUser(followRequestUserEvent));
        User authUser = userRepository.findById(parseLong(authId)).get();

        if (followRequestUserEvent.isUserFollowRequest()) {
            user.getFollowerRequests().add(authUser);
        } else {
            user.getFollowerRequests().remove(authUser);
        }
    }

    private User createUser(UserEvent userEvent) {
        User newUser = new User();
        newUser.setId(userEvent.getId());
        newUser.setUsername(userEvent.getUsername());
        newUser.setFullName(userEvent.getFullName());
        newUser.setAbout(userEvent.getAbout());
        newUser.setAvatar(userEvent.getAvatar());
        newUser.setPrivateProfile(userEvent.isPrivateProfile());
        newUser.setActive(userEvent.isActive());
        newUser.setMutedDirectMessages(userEvent.isActive());
        return userRepository.save(newUser);
    }
}
