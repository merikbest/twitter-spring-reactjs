package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.dto.notification.NotificationListResponse;
import com.gmail.merikbest2015.mapper.BasicMapper;
import com.gmail.merikbest2015.repository.ListsRepository;
import com.gmail.merikbest2015.repository.projection.NotificationListProjection;
import com.gmail.merikbest2015.service.ListsClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ListsClientServiceImpl implements ListsClientService {

    private final ListsRepository listsRepository;
    private final BasicMapper basicMapper;

    @Override
    public NotificationListResponse getNotificationList(Long listId) {
        NotificationListProjection list = listsRepository.getNotificationList(listId);
        return basicMapper.convertToResponse(list, NotificationListResponse.class);
    }
}
