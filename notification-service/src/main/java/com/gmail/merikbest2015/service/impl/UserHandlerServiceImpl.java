package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.event.UpdateUserEvent;
import com.gmail.merikbest2015.event.UserNotificationDto;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.UserRepository;
import com.gmail.merikbest2015.service.UserHandlerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserHandlerServiceImpl implements UserHandlerService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public void handleUpdateUser(UpdateUserEvent userEvent) {
        userRepository.findById(userEvent.getId())
                .map(user -> {
                    user.setUsername(userEvent.getUsername());
                    user.setAvatar(userEvent.getAvatar());
                    return user;
                })
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setId(userEvent.getId());
                    newUser.setUsername(userEvent.getUsername());
                    newUser.setAvatar(userEvent.getAvatar());
                    return userRepository.save(newUser);
                });
    }

    @Override
    public User getOrCreateUser(UserNotificationDto user) {
        return userRepository.findById(user.getId())
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setId(user.getId());
                    newUser.setUsername(user.getUsername());
                    newUser.setAvatar(user.getAvatar());
                    return userRepository.save(newUser);
                });
    }
}
