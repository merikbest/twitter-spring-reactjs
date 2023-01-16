package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.TweetResponse;
import com.gmail.merikbest2015.dto.lists.ListOwnerResponse;
import com.gmail.merikbest2015.dto.request.UserToListsRequest;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.model.Lists;
import com.gmail.merikbest2015.repository.ListsFollowersRepository;
import com.gmail.merikbest2015.repository.ListsMembersRepository;
import com.gmail.merikbest2015.repository.ListsRepository;
import com.gmail.merikbest2015.repository.PinnedListsRepository;
import com.gmail.merikbest2015.repository.projection.*;
import com.gmail.merikbest2015.repository.projection.pinned.PinnedListProjection;
import com.gmail.merikbest2015.repository.projection.pinned.PinnedListsProjection;
import com.gmail.merikbest2015.service.ListsService;
import com.gmail.merikbest2015.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ListsServiceImpl implements ListsService {

    private final ListsRepository listsRepository;
    private final ListsFollowersRepository listsFollowersRepository;
    private final ListsMembersRepository listsMembersRepository;
    private final PinnedListsRepository pinnedListsRepository;

//    private final PinnedListsRepository pinnedListsRepository;
//    private final NotificationRepository notificationRepository;
    private final UserClient userClient;
//    private final TweetClient tweetClient;
//    private final ImageClient imageClient;

    @Override
    public List<ListProjection> getAllTweetLists() {
        return listsRepository.getAllTweetLists();
    }

    @Override
    public List<ListUserProjection> getUserTweetLists() {
        Long userId = AuthUtil.getAuthenticatedUserId();
        List<Long> listIds = listsFollowersRepository.getListIds(userId);
        return listsRepository.getUserTweetLists(userId, listIds);
    }

    @Override
    public List<PinnedListProjection> getUserPinnedLists() {
        Long userId = AuthUtil.getAuthenticatedUserId();
        return listsRepository.getUserPinnedLists(userId);
    }

    @Override
    public BaseListProjection getListById(Long listId) {
        Long userId = AuthUtil.getAuthenticatedUserId();
        List<Long> listIds = listsFollowersRepository.getListIds(userId);
        return listsRepository.getListById(listIds, listId, userId)
                .orElseThrow(() -> new ApiRequestException("List not found", HttpStatus.NOT_FOUND));
    }

    @Override
    @Transactional
    public ListUserProjection createTweetList(Lists list) {
        Long userId = AuthUtil.getAuthenticatedUserId();

        if (list.getName().length() == 0 || list.getName().length() > 25) {
            throw new ApiRequestException("Incorrect list name length", HttpStatus.BAD_REQUEST);
        }
        if (!list.getListOwnerId().equals(userId)) {
            throw new ApiRequestException("List owner not found", HttpStatus.NOT_FOUND);
        }
        // TODO pass listOwner (User) from front-end
        Lists userTweetList = listsRepository.save(list);
        return listsRepository.getUserTweetListById(userTweetList.getId());
    }

    @Override
    public List<ListProjection> getUserTweetListsById(Long userId) {
//        return listsRepository.findByListOwnerIdAndIsPrivateFalse(userId);
        return null;
    }

    @Override
    public List<ListProjection> getTweetListsWhichUserIn() {
//        Long userId = AuthUtil.getAuthenticatedUserId();
//        return listsRepository.findByMembers_Id(userId);
        return null;
    }

    @Override
    @Transactional
    public BaseListProjection editTweetList(Lists listInfo) {
//        if (listInfo.getName().length() == 0 || listInfo.getName().length() > 25) {
//            throw new ApiRequestException("Incorrect list name length", HttpStatus.BAD_REQUEST);
//        }
//        Lists listFromDb = listsRepository.findById(listInfo.getId())
//                .orElseThrow(() -> new ApiRequestException("List not found", HttpStatus.NOT_FOUND));
//        Long userId = AuthUtil.getAuthenticatedUserId();
//
//        if (!listFromDb.getListOwnerId().equals(userId)) {
//            throw new ApiRequestException("List owner not found", HttpStatus.NOT_FOUND);
//        }
//        listFromDb.setName(listInfo.getName());
//        listFromDb.setDescription(listInfo.getDescription());
//        listFromDb.setWallpaper(listInfo.getWallpaper());
//        listFromDb.setPrivate(listInfo.isPrivate());
//        return listsRepository.getListById(listFromDb.getId(), userId).get();
        return null;
    }

    @Override
    @Transactional
    public String deleteList(Long listId) {
//        Long userId = AuthUtil.getAuthenticatedUserId();
//        Lists list = listsRepository.findById(listId)
//                .orElseThrow(() -> new ApiRequestException("List not found", HttpStatus.NOT_FOUND));
//
//        if (!list.getListOwnerId().equals(userId)) {
//            throw new ApiRequestException("List owner not found", HttpStatus.BAD_REQUEST);
//        }
//        if (list.getWallpaper() != null) {
//            imageClient.deleteImage(list.getWallpaper());
//        }
//        pinnedListsRepository.deletePinnedList(listId);
//        listsRepository.delete(list);
//        return "List id:" + list.getId() + " deleted.";
        return null;
    }

    @Override
    @Transactional
    public ListUserProjection followList(Long listId) {
//        // TODO if user blocked by other user, can the user follow list???
//        boolean isListExist = listsRepository.findByIdAndIsPrivateFalse(listId);
//
//        if (!isListExist) {
//            throw new ApiRequestException("List not found", HttpStatus.NOT_FOUND);
//        }
//        Long userId = AuthUtil.getAuthenticatedUserId();
//        boolean isListFollowed = listsRepository.isListFollowed(userId, listId);
//
//        if (isListFollowed) {
//            listsRepository.removeFollowerFromList(userId, listId);
//            pinnedListsRepository.removePinnedList(listId, userId);
//        } else {
//            listsRepository.addFollowerToList(userId, listId);
//        }
//        return listsRepository.getUserTweetListById(listId);
        return null;
    }

    @Override
    @Transactional
    public PinnedListProjection pinList(Long listId) {
//        Long userId = AuthUtil.getAuthenticatedUserId();
//        boolean isListExist = listsRepository.isListExist(listId, userId);
//
//        if (isListExist) {
//            boolean isListPinned = pinnedListsRepository.isListPinned(listId, userId);
//
//            if (isListPinned) {
//                pinnedListsRepository.removePinnedList(listId, userId);
//            } else {
//                pinnedListsRepository.addPinnedList(listId, userId, LocalDateTime.now().withNano(0));
//            }
//            return listsRepository.getUserPinnedListById(listId);
//            // TODO or return true/false if lists pinned
//        } else {
//            throw new ApiRequestException("List not found", HttpStatus.NOT_FOUND);
//        }
        return null;
    }

    @Override
    public List<Map<String, Object>> getListsToAddUser(Long userId) {
//        Long authUserId = AuthUtil.getAuthenticatedUserId();
//        List<Map<String, Object>> lists = new ArrayList<>();
//        listsRepository.getUserOwnerLists(authUserId)
//                .forEach(list -> lists.add(Map.of(
//                        "list", list,
//                        "isMemberInList", isListIncludeUser(list.getId(), userId))
//                ));
//        return lists;
        return null;
    }

    @Override
    @Transactional
    public String addUserToLists(UserToListsRequest listsRequest) { // TODO add notification
//        Long authUserId = AuthUtil.getAuthenticatedUserId();
//        checkUserIsBlocked(authUserId, listsRequest.getUserId());
//        checkUserIsBlocked(listsRequest.getUserId(), authUserId);
//        checkIsPrivateUserProfile(listsRequest.getUserId(), authUserId);
//        listsRequest.getLists().forEach(listRequest -> {
//            checkIsListExist(listRequest.getListId(), authUserId);
//
//            if (!listRequest.getIsMemberInList()) {
//                boolean isMemberInList = listsRepository.isMemberInList(listRequest.getListId(), listsRequest.getUserId());
//
//                if (!isMemberInList) {
//                    listsRepository.addMemberToList(listsRequest.getUserId(), listRequest.getListId());
//                }
//            } else {
//                listsRepository.removeMemberFromList(listsRequest.getUserId(), listRequest.getListId());
//            }
//        });
//        return "User added to lists success.";
        return null;
    }

    @Override
    @Transactional
    public Map<String, Object> addUserToList(Long userId, Long listId) {
//        Long authUserId = AuthUtil.getAuthenticatedUserId();
//        checkUserIsBlocked(authUserId, userId);
//        checkUserIsBlocked(userId, authUserId);
//        User user = checkIsPrivateUserProfile(userId, authUserId);
//        Lists list = listsRepository.getAuthUserListById(listId, authUserId)
//                .orElseThrow(() -> new ApiRequestException("List not found", HttpStatus.NOT_FOUND));
//        boolean isMemberInList = listsRepository.isMemberInList(listId, userId);
//        boolean isAddedToList;
//
//        if (isMemberInList) {
//            listsRepository.removeMemberFromList(userId, listId);
//            isAddedToList = false;
//        } else {
//            listsRepository.addMemberToList(userId, listId);
//            isAddedToList = true;
//        }
//
//        Notification notification = new Notification();
//        notification.setNotificationType(NotificationType.LISTS);
//        notification.setNotifiedUser(user);
//        notification.setUser(user);
//        notification.setList(list);
//
//        if (!user.getId().equals(authUserId)) {
//            boolean isNotificationExists = notificationRepository.isNotificationExists(userId, listId, NotificationType.LISTS);
//
//            if (!isNotificationExists) {
//                Notification newNotification = notificationRepository.save(notification);
//                userClient.increaseNotificationsCount(userId);
//                return Map.of("notification", newNotification, "isAddedToList", isAddedToList);
//            }
//        }
//        return Map.of("notification", notification, "isAddedToList", isAddedToList);
        return null;
    }

    @Override
    public HeaderResponse<TweetResponse> getTweetsByListId(Long listId, Pageable pageable) {
//        Long authUserId = AuthUtil.getAuthenticatedUserId();
//        List<Long> listMembersIds = listsRepository.getListMembersIds(listId, authUserId);
//        return tweetClient.getTweetsByUserIds(new TweetUserIdsRequest(listMembersIds), pageable);
        return null;
    }

    @Override
    public BaseListProjection getListDetails(Long listId) {
//        Long authUserId = AuthUtil.getAuthenticatedUserId();
//        return listsRepository.getListDetails(listId, authUserId)
//                .orElseThrow(() -> new ApiRequestException("List not found", HttpStatus.NOT_FOUND));
        return null;
    }

    @Override
    public List<ListMemberProjection> getListFollowers(Long listId, Long listOwnerId) {
//        Long authUserId = AuthUtil.getAuthenticatedUserId();
//
//        if (!Objects.equals(listOwnerId, authUserId)) {
//            checkUserIsBlocked(listOwnerId, authUserId);
//            checkIsListExist(listId, listOwnerId);
//            checkIsListPrivate(listId);
//        }
//        checkIsListExist(listId, authUserId);
//        return listsRepository.getListFollowers(listId, listOwnerId);
        return null;
    }

    @Override
    public Map<String, Object> getListMembers(Long listId, Long listOwnerId) {
//        Long authUserId = AuthUtil.getAuthenticatedUserId();
//
//        if (!listOwnerId.equals(authUserId)) {
//            checkUserIsBlocked(listOwnerId, authUserId);
//            checkIsListExist(listId, listOwnerId);
//            checkIsListPrivate(listId);
//            List<ListMemberProjection> listMembers = listsRepository.getListMembers(listId);
//            return Map.of("userMembers", listMembers);
//        } else {
//            checkIsListExist(listId, authUserId);
//            List<ListsOwnerMemberProjection> listMembers = listsRepository.getListOwnerMembers(listId);
//            return Map.of("authUserMembers", listMembers);
//        }
        return null;
    }

    @Override
    public List<Map<String, Object>> searchListMembersByUsername(Long listId, String username) {
//        List<Map<String, Object>> members = new ArrayList<>();
//        listsRepository.searchListMembersByUsername(username)
//                .forEach(member ->
//                        members.add(Map.of(
//                                "member", member.getMember(),
//                                "isMemberInList", isListIncludeUser(listId, member.getMember().getId()))
//                        ));
//        return members;
        return null;
    }

    public boolean isMyProfileFollowList(Long listId) {
//        Long authUserId = AuthUtil.getAuthenticatedUserId();
//        return listsRepository.isMyProfileFollowList(listId, authUserId);
        return false;
    }

    public boolean isListIncludeUser(Long listId, Long memberId) {
//        Long authUserId = AuthUtil.getAuthenticatedUserId();
//        return listsRepository.isListIncludeUser(listId, authUserId, memberId);
        return false;
    }

    private void checkUserIsBlocked(Long userId, Long supposedBlockedUserId) {
//        boolean isPresent = userClient.isUserBlocked(userId, supposedBlockedUserId);
//
//        if (isPresent) {
//            throw new ApiRequestException("User with ID:" + supposedBlockedUserId + " is blocked", HttpStatus.BAD_REQUEST);
//        }
    }

//    private User checkIsPrivateUserProfile(Long userId, Long authUserId) {
//        try {
//            return userClient.getValidUser(userId, authUserId);
//        } catch (RuntimeException exception) {
//            throw new ApiRequestException("User not found", HttpStatus.NOT_FOUND);
//        }
//    }

    private void checkIsListPrivate(Long listId) {
//        Long authUserId = AuthUtil.getAuthenticatedUserId();
//        boolean isPrivate = listsRepository.isListPrivate(listId, authUserId);
//
//        if (isPrivate && !isMyProfileFollowList(listId)) {
//            throw new ApiRequestException("List not found", HttpStatus.NOT_FOUND);
//        }
    }

    private void checkIsListExist(Long listId, Long listOwnerId) {
//        boolean isListExist = listsRepository.isListExist(listId, listOwnerId);
//
//        if (!isListExist) {
//            throw new ApiRequestException("List not found", HttpStatus.NOT_FOUND);
//        }
    }

    public ListOwnerResponse getListOwnerById(Long userId) {
        return userClient.getListOwnerById(userId);
    }
}
