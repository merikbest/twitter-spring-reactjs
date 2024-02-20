package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.event.UserEvent;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.UserRepository;
import com.gmail.merikbest2015.service.UserService;
import com.gmail.merikbest2015.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public boolean isUserExists(Long userId) {
        return userRepository.isUserExists(userId);
    }

    @Override
    public boolean isMyProfileBlockedByUser(Long userId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return userRepository.isUserBlocked(userId, authUserId);
    }

    @Override
    public boolean isUserHavePrivateProfile(Long userId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return userRepository.isUserHavePrivateProfile(userId, authUserId);
    }

    @Override
    @Transactional
    public void handleUser(UserEvent userEvent) {
        Optional<User> user = userRepository.findById(userEvent.getId());

        if (user.isPresent()) {
            mapUser(user.get(), userEvent);
        } else {
            User newUser = new User();
            mapUser(newUser, userEvent);
            userRepository.save(newUser);
        }
    }

    private void mapUser(User user, UserEvent userEvent) {
        user.setUsername(userEvent.getUsername());
        user.setFullName(userEvent.getFullName());
        user.setPrivateProfile(userEvent.isPrivateProfile());
    }
}
