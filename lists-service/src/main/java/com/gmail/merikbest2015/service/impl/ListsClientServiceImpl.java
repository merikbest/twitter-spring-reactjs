package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.dto.response.tweet.TweetListResponse;
import com.gmail.merikbest2015.dto.response.notification.NotificationListResponse;
import com.gmail.merikbest2015.mapper.BasicMapper;
import com.gmail.merikbest2015.repository.ListsRepository;
import com.gmail.merikbest2015.repository.projection.NotificationListProjection;
import com.gmail.merikbest2015.repository.projection.TweetListProjection;
import com.gmail.merikbest2015.service.ListsClientService;
import com.gmail.merikbest2015.service.UserService;
import com.gmail.merikbest2015.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ListsClientServiceImpl implements ListsClientService {

    private final ListsRepository listsRepository;
    private final UserService userService;
    private final BasicMapper basicMapper;

    @Override
    public NotificationListResponse getNotificationList(Long listId) {
        NotificationListProjection list = listsRepository.getListById(listId, NotificationListProjection.class);
        return basicMapper.convertToResponse(list, NotificationListResponse.class);
    }

    @Override
    public TweetListResponse getTweetList(Long listId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        Optional<TweetListProjection> list = listsRepository.getListById(listId, authUserId, TweetListProjection.class);

        if (list.isEmpty() || userService.isUserBlocked(list.get().getListOwner().getId(), authUserId)) {
            return new TweetListResponse();
        }
        if (!authUserId.equals(list.get().getListOwner().getId()) && userService.isUserHavePrivateProfile(list.get().getListOwner().getId(), authUserId)) {
            return new TweetListResponse();
        }
        return basicMapper.convertToResponse(list.get(), TweetListResponse.class);
    }
}
