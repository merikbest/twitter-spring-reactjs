package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.UserRepository;
import com.gmail.merikbest2015.service.UserService;
import com.gmail.merikbest2015.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.gmail.merikbest2015.constants.ErrorMessage.USER_ID_BLOCKED;
import static com.gmail.merikbest2015.constants.ErrorMessage.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User getAuthUser() {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return userRepository.findById(authUserId)
                .orElseThrow(() -> new ApiRequestException(USER_NOT_FOUND, HttpStatus.UNAUTHORIZED));
    }

    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ApiRequestException(USER_NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    @Override
    public List<User> searchListMembersByUsername(String username) {
        return userRepository.searchListMembersByUsername(username);
    }

    @Override
    public void checkUserIsBlocked(Long userId, Long supposedBlockedUserId) {
        if (isUserBlocked(userId, supposedBlockedUserId)) {
            throw new ApiRequestException(String.format(USER_ID_BLOCKED, supposedBlockedUserId), HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public void checkIsPrivateUserProfile(Long userId, Long authUserId) {
        if (isUserHavePrivateProfile(userId, authUserId)) {
            throw new ApiRequestException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public boolean isUserBlocked(Long userId, Long supposedBlockedUserId) {
        return userRepository.isUserBlocked(userId, supposedBlockedUserId);
    }

    @Override
    public boolean isUserHavePrivateProfile(Long userId, Long authUserId) {
        return userRepository.isUserHavePrivateProfile(userId, authUserId);
    }
}
