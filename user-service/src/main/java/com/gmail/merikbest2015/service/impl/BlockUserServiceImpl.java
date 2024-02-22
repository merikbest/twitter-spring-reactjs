package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.producer.BlockUserProducer;
import com.gmail.merikbest2015.repository.BlockUserRepository;
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
        User authUser = authenticationService.getAuthenticatedUser();
        boolean hasUserBlocked;

        if (blockUserRepository.isUserBlocked(authUser, user)) {
            authUser.getUserBlockedList().remove(user);
            hasUserBlocked = false;
        } else {
            authUser.getUserBlockedList().add(user);
            authUser.getFollowers().remove(user);
            authUser.getFollowing().remove(user);
            hasUserBlocked = true;
        }
        blockUserProducer.sendBlockUserEvent(user, authUser.getId(), hasUserBlocked);
        return hasUserBlocked;
    }
}
