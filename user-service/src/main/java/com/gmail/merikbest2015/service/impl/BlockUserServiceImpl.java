package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.repository.BlockUserRepository;
import com.gmail.merikbest2015.repository.FollowerUserRepository;
import com.gmail.merikbest2015.repository.projection.BlockedUserProjection;
import com.gmail.merikbest2015.service.AuthenticationService;
import com.gmail.merikbest2015.service.BlockUserService;
import com.gmail.merikbest2015.service.util.UserServiceHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BlockUserServiceImpl implements BlockUserService {

    private final AuthenticationService authenticationService;
    private final BlockUserRepository blockUserRepository;
    private final FollowerUserRepository followerUserRepository;
    private final UserServiceHelper userServiceHelper;

    @Override
    public Page<BlockedUserProjection> getBlockList(Pageable pageable) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return blockUserRepository.getUserBlockListById(authUserId, pageable);
    }

    @Override
    @Transactional
    public Boolean processBlockList(Long userId) {
        userServiceHelper.checkIsUserExist(userId);
        Long authUserId = authenticationService.getAuthenticatedUserId();
        boolean isUserBlocked = blockUserRepository.isUserBlocked(authUserId, userId);

        if (isUserBlocked) {
            blockUserRepository.unblockUser(authUserId, userId);
            return false;
        } else {
            blockUserRepository.blockUser(authUserId, userId);
            followerUserRepository.unfollow(authUserId, userId);
            followerUserRepository.unfollow(userId, authUserId);
            return true;
        }
    }
}
