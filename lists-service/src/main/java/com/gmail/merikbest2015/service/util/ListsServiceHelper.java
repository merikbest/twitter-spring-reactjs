package com.gmail.merikbest2015.service.util;

import com.gmail.merikbest2015.dto.request.NotificationRequest;
import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.NotificationClient;
import com.gmail.merikbest2015.repository.ListsRepository;
import com.gmail.merikbest2015.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.gmail.merikbest2015.constants.ErrorMessage.INCORRECT_LIST_NAME_LENGTH;
import static com.gmail.merikbest2015.constants.ErrorMessage.LIST_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ListsServiceHelper {

    private final ListsRepository listsRepository;
    private final NotificationClient notificationClient;

    public boolean isListIncludeUser(Long listId, Long memberId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return listsRepository.isListIncludeUser(listId, authUserId, memberId);
    }

    public void checkIsListPrivate(Long listId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        if (listsRepository.isListPrivate(listId, authUserId) && !isMyProfileFollowList(listId)) {
            throw new ApiRequestException(LIST_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }

    public void checkIsListExist(Long listId, Long listOwnerId) {
        if (!listsRepository.isListExist(listId, listOwnerId)) {
            throw new ApiRequestException(LIST_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }

    public void sendNotification(Long notifiedUserId, Long userId, Long listId) {
        NotificationRequest request = NotificationRequest.builder()
                .notificationType(NotificationType.LISTS)
                .notificationCondition(true)
                .notifiedUserId(notifiedUserId)
                .userId(userId)
                .listId(listId)
                .build();
        notificationClient.sendNotification(request);
    }

    public void validateListNameLength(String listName) {
        if (listName.length() == 0 || listName.length() > 25) {
            throw new ApiRequestException(INCORRECT_LIST_NAME_LENGTH, HttpStatus.BAD_REQUEST);
        }
    }

    public boolean isMyProfileFollowList(Long listId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return listsRepository.isListFollowed(listId, authUserId);
    }

    public boolean isListPinned(Long listId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return listsRepository.isListPinned(listId, authUserId);
    }
}
