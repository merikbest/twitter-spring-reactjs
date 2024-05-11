package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.broker.producer.BlockUserProducer;
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
    private final UserServiceHelper userServiceHelper;
    private final FollowerUserRepository followerUserRepository;
    private final BlockUserProducer blockUserProducer;

    @Override
    public Page<BlockedUserProjection> getBlockList(Pageable pageable) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return blockUserRepository.getUserBlockListById(authUserId, pageable);
    }

    @Override
    @Transactional
    public Boolean processBlockList(Long userId) {
        User user = userServiceHelper.getUserById(userId);
        Long authUserId = authenticationService.getAuthenticatedUserId();
        boolean hasUserBlocked;

        if (blockUserRepository.isUserBlocked(authUserId, userId)) {
            blockUserRepository.unblockUser(authUserId, userId);
            hasUserBlocked = false;
        } else {
            blockUserRepository.blockUser(authUserId, userId);
            followerUserRepository.unfollow(authUserId, userId);
            followerUserRepository.unfollow(userId, authUserId);
            hasUserBlocked = true;
        }
        blockUserProducer.sendBlockUserEvent(user, authUserId, hasUserBlocked);
        return hasUserBlocked;
    }
}
