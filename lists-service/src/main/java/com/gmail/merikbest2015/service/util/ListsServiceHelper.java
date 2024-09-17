package com.gmail.merikbest2015.service.util;

import com.gmail.merikbest2015.commons.exception.ApiRequestException;
import com.gmail.merikbest2015.constants.ListsErrorMessage;
import com.gmail.merikbest2015.repository.ListsRepository;
import com.gmail.merikbest2015.commons.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ListsServiceHelper {

    private final ListsRepository listsRepository;

    public boolean isListIncludeUser(Long listId, Long memberId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return listsRepository.isListIncludeUser(listId, authUserId, memberId);
    }

    public void checkIsListPrivate(Long listId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        if (listsRepository.isListPrivate(listId, authUserId) && !isMyProfileFollowList(listId)) {
            throw new ApiRequestException(ListsErrorMessage.LIST_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }

    public void checkIsListExist(Long listId, Long listOwnerId) {
        if (!listsRepository.isListExist(listId, listOwnerId)) {
            throw new ApiRequestException(ListsErrorMessage.LIST_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }

    public void validateListNameLength(String listName) {
        if (listName.length() == 0 || listName.length() > 25) {
            throw new ApiRequestException(ListsErrorMessage.INCORRECT_LIST_NAME_LENGTH, HttpStatus.BAD_REQUEST);
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
