package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.repository.UserRepository;
import com.gmail.merikbest2015.repository.projection.BlockedUserProjection;
import com.gmail.merikbest2015.service.AuthenticationService;
import com.gmail.merikbest2015.service.BlockUserService;
import com.gmail.merikbest2015.util.UserServiceHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BlockUserServiceImpl implements BlockUserService {

    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;
    private final UserServiceHelper userServiceHelper;

    @Override
    public Page<BlockedUserProjection> getBlockList(Pageable pageable) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return userRepository.getUserBlockListById(authUserId, pageable);
    }

    @Override
    @Transactional
    public Boolean processBlockList(Long userId) {
        userServiceHelper.checkIsUserExist(userId);
        Long authUserId = authenticationService.getAuthenticatedUserId();
        boolean isUserBlocked = userRepository.isUserBlocked(authUserId, userId);

        if (isUserBlocked) {
            userRepository.unblockUser(authUserId, userId);
            return false;
        } else {
            userRepository.blockUser(authUserId, userId);
            userRepository.unfollow(authUserId, userId);
            userRepository.unfollow(userId, authUserId);
            return true;
        }
    }
}
