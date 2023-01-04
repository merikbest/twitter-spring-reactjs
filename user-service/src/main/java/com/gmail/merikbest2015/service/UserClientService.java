package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.client.user.UserIdsRequest;
import com.gmail.merikbest2015.commons.models.User;
import com.gmail.merikbest2015.repository.projection.UserChatProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface UserClientService {

    Optional<User> getUserById(Long userId);

    List<User> getUsersByIds(UserIdsRequest request);

    List<Long> getUserFollowersIds();

    Page<UserChatProjection> searchUsersByUsername(String username, Pageable pageable);

    Optional<User> getValidUser(Long userId, Long authUserId);

    Boolean isUserFollowByOtherUser(Long userId);

    Boolean isUserMutedByMyProfile(Long userId);

    Boolean isUserBlocked(Long userId, Long supposedBlockedUserId);

    Boolean isUserBlockedByMyProfile(Long userId);

    Boolean isMyProfileBlockedByUser(Long userId);

    Boolean isMyProfileWaitingForApprove(Long userId);

    void saveUser(User user);
}
