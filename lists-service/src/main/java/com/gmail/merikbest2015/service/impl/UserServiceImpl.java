package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.commons.constants.ErrorMessage;
import com.gmail.merikbest2015.commons.exception.ApiRequestException;
import com.gmail.merikbest2015.constants.ListsErrorMessage;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.UserRepository;
import com.gmail.merikbest2015.service.UserService;
import com.gmail.merikbest2015.commons.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User getAuthUser() {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return userRepository.findById(authUserId)
                .orElseThrow(() -> new ApiRequestException(ErrorMessage.USER_NOT_FOUND, HttpStatus.UNAUTHORIZED));
    }

    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ApiRequestException(ErrorMessage.USER_NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    @Override
    public List<User> searchListMembersByUsername(String username) {
        return userRepository.searchListMembersByUsername(username);
    }

    @Override
    public void checkUserIsBlocked(Long userId, Long supposedBlockedUserId) {
        if (isUserBlocked(userId, supposedBlockedUserId)) {
            throw new ApiRequestException(String.format(ListsErrorMessage.USER_ID_BLOCKED, supposedBlockedUserId), HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public void checkIsPrivateUserProfile(Long userId, Long authUserId) {
        if (isUserHavePrivateProfile(userId, authUserId)) {
            throw new ApiRequestException(ErrorMessage.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public boolean isUserBlocked(Long userId, Long supposedBlockedUserId) {
        return userRepository.isUserBlocked(userId, supposedBlockedUserId);
    }

    @Override
    public boolean isUserHavePrivateProfile(Long userId, Long authUserId) {
        return !userRepository.isUserHavePrivateProfile(userId, authUserId);
    }
}
