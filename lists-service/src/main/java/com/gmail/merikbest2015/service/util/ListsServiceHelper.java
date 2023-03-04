package com.gmail.merikbest2015.service.util;

import com.gmail.merikbest2015.dto.request.IdsRequest;
import com.gmail.merikbest2015.dto.request.NotificationRequest;
import com.gmail.merikbest2015.dto.response.lists.ListMemberResponse;
import com.gmail.merikbest2015.dto.response.lists.ListOwnerResponse;
import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.NotificationClient;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.repository.ListsFollowersRepository;
import com.gmail.merikbest2015.repository.ListsMembersRepository;
import com.gmail.merikbest2015.repository.ListsRepository;
import com.gmail.merikbest2015.repository.PinnedListsRepository;
import com.gmail.merikbest2015.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ListsServiceHelper {

    public final ListsRepository listsRepository;
    public final ListsFollowersRepository listsFollowersRepository;
    public final ListsMembersRepository listsMembersRepository;
    public final PinnedListsRepository pinnedListsRepository;
    public final NotificationClient notificationClient;
    public final UserClient userClient;

    public List<ListMemberResponse> getListMemberResponses(Long listId) {
        List<Long> membersIds = listsMembersRepository.getMembersIds(listId);
        return userClient.getListParticipantsByIds(new IdsRequest(membersIds));
    }

    public boolean isListIncludeUser(Long listId, Long memberId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return listsRepository.isListIncludeUser(listId, authUserId, memberId);
    }

    public void checkUserIsBlocked(Long userId, Long supposedBlockedUserId) {
        boolean isPresent = userClient.isUserBlocked(userId, supposedBlockedUserId);

        if (isPresent) {
            throw new ApiRequestException("User with ID:" + supposedBlockedUserId + " is blocked", HttpStatus.BAD_REQUEST);
        }
    }

    public void checkIsPrivateUserProfile(Long userId) {
        boolean isPrivateUserProfile = userClient.isUserHavePrivateProfile(userId);

        if (isPrivateUserProfile) {
            throw new ApiRequestException("User not found", HttpStatus.NOT_FOUND);
        }
    }

    public void checkIsListPrivate(Long listId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        boolean isPublic = listsRepository.isListPrivate(listId, authUserId);

        if (isPublic && !isMyProfileFollowList(listId)) {
            throw new ApiRequestException("List not found", HttpStatus.NOT_FOUND);
        }
    }

    public void checkIsListExist(Long listId, Long listOwnerId) {
        boolean isListExist = listsRepository.isListExist(listId, listOwnerId);

        if (!isListExist) {
            throw new ApiRequestException("List not found", HttpStatus.NOT_FOUND);
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
        notificationClient.sendListNotification(request);
    }

    public void validateListNameLength(String listName) {
        if (listName.length() == 0 || listName.length() > 25) {
            throw new ApiRequestException("Incorrect list name length", HttpStatus.BAD_REQUEST);
        }
    }

    public void validateListOwner(Long listOwnerId, Long authUserId) {
        if (!listOwnerId.equals(authUserId)) {
            throw new ApiRequestException("List owner not found", HttpStatus.NOT_FOUND);
        }
    }

    public boolean isMyProfileFollowList(Long listId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return listsFollowersRepository.isListFollowed(authUserId, listId);
    }

    public ListOwnerResponse getListOwnerById(Long userId) {
        return userClient.getListOwnerById(userId);
    }

    public boolean isListPinned(Long listId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return pinnedListsRepository.isListPinned(listId, authUserId);
    }
}
