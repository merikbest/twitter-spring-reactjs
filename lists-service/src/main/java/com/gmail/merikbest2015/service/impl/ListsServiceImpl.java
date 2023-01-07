package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.client.image.ImageClient;
import com.gmail.merikbest2015.client.tweet.TweetClient;
import com.gmail.merikbest2015.client.tweet.TweetUserIdsRequest;
import com.gmail.merikbest2015.client.user.AuthenticationClient;
import com.gmail.merikbest2015.client.user.UserClient;
import com.gmail.merikbest2015.commons.util.AuthUtil;
import com.gmail.merikbest2015.dto.request.UserToListsRequest;
import com.gmail.merikbest2015.commons.enums.NotificationType;
import com.gmail.merikbest2015.commons.exception.ApiRequestException;
import com.gmail.merikbest2015.commons.models.Lists;
import com.gmail.merikbest2015.commons.models.Notification;
import com.gmail.merikbest2015.commons.models.User;
import com.gmail.merikbest2015.commons.projection.TweetProjection;
import com.gmail.merikbest2015.repository.ListsRepository;
import com.gmail.merikbest2015.commons.repository.NotificationRepository;
import com.gmail.merikbest2015.repository.projection.*;
import com.gmail.merikbest2015.service.ListsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ListsServiceImpl implements ListsService {

    private final ListsRepository listsRepository;
    private final NotificationRepository notificationRepository;
    private final AuthenticationClient authenticationClient;
    private final UserClient userClient;
    private final TweetClient tweetClient;
    private final ImageClient imageClient;

    @Override
    public List<ListProjection> getAllTweetLists() {
        return listsRepository.getAllTweetLists();
    }

    @Override
    public List<ListUserProjection> getUserTweetLists() {
        Long userId = AuthUtil.getAuthenticatedUserId();
        return listsRepository.getUserTweetLists(userId);
    }

    @Override
    public List<PinnedListProjection> getUserPinnedLists() {
        Long userId = AuthUtil.getAuthenticatedUserId();
        return listsRepository.getUserPinnedLists(userId);
    }

    @Override
    public BaseListProjection getListById(Long listId) {
        Long userId = AuthUtil.getAuthenticatedUserId();
        return listsRepository.getListById(listId, userId)
                .orElseThrow(() -> new ApiRequestException("List not found", HttpStatus.NOT_FOUND));
    }

    @Override
    @Transactional
    public ListUserProjection createTweetList(Lists list) {
        Long userId = AuthUtil.getAuthenticatedUserId();

        if (!list.getListOwner().getId().equals(userId)) {
            throw new ApiRequestException("List owner not found", HttpStatus.NOT_FOUND);
        }
        if (list.getName().length() == 0 || list.getName().length() > 25) {
            throw new ApiRequestException("Incorrect list name length", HttpStatus.BAD_REQUEST);
        }
        // TODO pass listOwner (User) from front-end
        Lists userTweetList = listsRepository.save(list);
        return listsRepository.getUserTweetListById(userTweetList.getId());
    }

    @Override
    public List<ListProjection> getUserTweetListsById(Long userId) {
        return listsRepository.findByListOwnerIdAndIsPrivateFalse(userId);
    }

    @Override
    public List<ListProjection> getTweetListsWhichUserIn() {
        Long userId = AuthUtil.getAuthenticatedUserId();
        return listsRepository.findByMembers_Id(userId);
    }

    @Override
    @Transactional
    public BaseListProjection editTweetList(Lists listInfo) {
        if (listInfo.getName().length() == 0 || listInfo.getName().length() > 25) {
            throw new ApiRequestException("Incorrect list name length", HttpStatus.BAD_REQUEST);
        }
        Lists listFromDb = listsRepository.findById(listInfo.getId())
                .orElseThrow(() -> new ApiRequestException("List not found", HttpStatus.NOT_FOUND));
        Long userId = AuthUtil.getAuthenticatedUserId();

        if (!listFromDb.getListOwner().getId().equals(userId)) {
            throw new ApiRequestException("List owner not found", HttpStatus.NOT_FOUND);
        }
        listsRepository.save(listInfo);
        return listsRepository.getListById(listFromDb.getId(), userId).get();
    }

    @Override
    @Transactional(rollbackFor = ApiRequestException.class)
    public String deleteList(Long listId) {
        Long userId = AuthUtil.getAuthenticatedUserId();
        Lists list = listsRepository.findById(listId)
                .orElseThrow(() -> new ApiRequestException("List not found", HttpStatus.NOT_FOUND));

        if (!list.getListOwner().getId().equals(userId)) {
            throw new ApiRequestException("List owner not found", HttpStatus.BAD_REQUEST);
        }
        if (list.getWallpaper() != null) {
            imageClient.deleteImage(list.getWallpaper());
        }
        listsRepository.delete(list);
        return "List id:" + list.getId() + " deleted.";
    }

    @Override
    @Transactional
    public ListUserProjection followList(Long listId) {
        // TODO if user blocked by other user, can the user follow list???
        boolean isListExist = listsRepository.findByIdAndIsPrivateFalse(listId);

        if (!isListExist) {
            throw new ApiRequestException("List not found", HttpStatus.NOT_FOUND);
        }
        Long userId = AuthUtil.getAuthenticatedUserId();
        boolean isListFollowed = listsRepository.isListFollowed(userId, listId);

        if (isListFollowed) {
            listsRepository.removeFollowerFromList(userId, listId);
//            listsRepository.updateListPinnedDate(listId, null);
        } else {
            listsRepository.addFollowerToList(userId, listId);
        }
        return listsRepository.getUserTweetListById(listId);
    }

    @Override
    @Transactional
    public PinnedListProjection pinList(Long listId) {
        Long userId = AuthUtil.getAuthenticatedUserId();
        boolean isListExist = listsRepository.isListExist(listId, userId);
        // pin list if it exists in user_lists

        if (isListExist) {
//            boolean isListPinned = listsRepository.isListPinned(listId, userId);

            if (true) {
//                listsRepository.updateListPinnedDate(listId, null);
            } else {
//                listsRepository.updateListPinnedDate(listId, LocalDateTime.now().withNano(0));
            }
            return listsRepository.getUserPinnedListById(listId);
        } else {
            throw new ApiRequestException("List not found", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public List<Map<String, Object>> getListsToAddUser(Long userId) {
        Long authUserId = authenticationClient.getAuthenticatedUserId();
        List<Map<String, Object>> lists = new ArrayList<>();
        listsRepository.getUserOwnerLists(authUserId)
                .forEach(list -> lists.add(Map.of(
                        "list", list,
                        "isMemberInList", isListIncludeUser(list.getId(), userId))
                ));
        return lists;
    }

    @Override
    @Transactional(rollbackFor = ApiRequestException.class)
    public String addUserToLists(UserToListsRequest listsRequest) { // TODO add notification
        Long authUserId = authenticationClient.getAuthenticatedUserId();
        checkUserIsBlocked(authUserId, listsRequest.getUserId());
        User user = userClient.getValidUser(listsRequest.getUserId(), authUserId)
                .orElseThrow(() -> new ApiRequestException("User not found", HttpStatus.NOT_FOUND));
        checkUserIsBlocked(listsRequest.getUserId(), authUserId);
        listsRequest.getLists().forEach(listRequest -> {
            checkIsListExist(listRequest.getListId(), authUserId);
            Lists list = listsRepository.getOne(listRequest.getListId());

            if (listRequest.getIsMemberInList()) {
                boolean isMemberInList = list.getMembers().stream()
                        .filter(member -> member.getId().equals(user.getId()))
                        .findFirst()
                        .isEmpty();
                if (isMemberInList) {
                    list.getMembers().add(user);
                }
            } else {
                list.getMembers().remove(user);
            }
        });
        return "User added to lists success.";
    }

    @Override
    @Transactional
    public Map<String, Object> addUserToList(Long userId, Long listId) {
        Long authUserId = authenticationClient.getAuthenticatedUserId();
        checkUserIsBlocked(authUserId, userId);
        User user = userClient.getValidUser(userId, authUserId)
                .orElseThrow(() -> new ApiRequestException("User not found", HttpStatus.NOT_FOUND));
        checkUserIsBlocked(user.getId(), authUserId);
        Lists list = listsRepository.findById(listId)
                .orElseThrow(() -> new ApiRequestException("List not found", HttpStatus.NOT_FOUND));
        Optional<User> listMember = list.getMembers().stream()
                .filter(member -> member.getId().equals(user.getId()))
                .findFirst();
        boolean isAddedToList;

        if (listMember.isPresent()) {
            list.getMembers().remove(user);
            isAddedToList = false;
        } else {
            list.getMembers().add(user);
            isAddedToList = true;
        }

        Notification notification = new Notification();
        notification.setNotificationType(NotificationType.LISTS);
        notification.setNotifiedUser(user);
        notification.setUser(user);
        notification.setList(list);

        if (!user.getId().equals(authUserId)) {  // TODO check is private list
            Optional<Notification> userNotification = user.getNotifications().stream()
                    .filter(n -> n.getNotificationType().equals(NotificationType.LISTS)
                            && n.getUser().getId().equals(authUserId))
                    .findFirst();

            if (userNotification.isEmpty()) {
                Notification newNotification = notificationRepository.save(notification);
                user.setNotificationsCount(user.getNotificationsCount() + 1);
                List<Notification> notifications = user.getNotifications();
                notifications.add(newNotification);
                return Map.of("notification", newNotification, "isAddedToList", isAddedToList);
            }
        }
        return Map.of("notification", notification, "isAddedToList", isAddedToList);
    }

    @Override
    public Page<TweetProjection> getTweetsByListId(Long listId, Pageable pageable) {
        Long authUserId = authenticationClient.getAuthenticatedUserId();
        List<Long> listMembersIds = listsRepository.getListMembersIds(listId, authUserId); // TODO check if list exist
        return tweetClient.getTweetsByUserIds(new TweetUserIdsRequest(listMembersIds, pageable));
    }

    @Override
    public BaseListProjection getListDetails(Long listId) {
        Long authUserId = authenticationClient.getAuthenticatedUserId();
        return listsRepository.getListDetails(listId, authUserId)
                .orElseThrow(() -> new ApiRequestException("List not found", HttpStatus.NOT_FOUND));
    }

    @Override
    public List<ListMemberProjection> getListFollowers(Long listId, Long listOwnerId) {
        Long authUserId = authenticationClient.getAuthenticatedUserId();

        if (!Objects.equals(listOwnerId, authUserId)) {
            checkUserIsBlocked(listOwnerId, authUserId);
            checkIsListExist(listId, listOwnerId);
            checkIsListPrivate(listId);
        }
        checkIsListExist(listId, authUserId);
        return listsRepository.getListFollowers(listId, listOwnerId);
    }

    @Override
    public Map<String, Object> getListMembers(Long listId, Long listOwnerId) {
        Long authUserId = authenticationClient.getAuthenticatedUserId();

        if (!listOwnerId.equals(authUserId)) {
            checkUserIsBlocked(listOwnerId, authUserId);
            checkIsListExist(listId, listOwnerId);
            checkIsListPrivate(listId);
            List<ListMemberProjection> listMembers = listsRepository.getListMembers(listId);
            return Map.of("userMembers", listMembers);
        } else {
            checkIsListExist(listId, authUserId);
            List<ListsOwnerMemberProjection> listMembers = listsRepository.getListOwnerMembers(listId);
            return Map.of("authUserMembers", listMembers);
        }
    }

    @Override
    public List<Map<String, Object>> searchListMembersByUsername(Long listId, String username) {
        List<Map<String, Object>> members = new ArrayList<>();
        listsRepository.searchListMembersByUsername(username)
                .forEach(member ->
                        members.add(Map.of(
                                "member", member.getMember(),
                                "isMemberInList", isListIncludeUser(listId, member.getMember().getId()))
                        ));
        return members;
    }

    public boolean isMyProfileFollowList(Long listId) {
        Long authUserId = authenticationClient.getAuthenticatedUserId();
        return listsRepository.isMyProfileFollowList(listId, authUserId);
    }

    public boolean isListIncludeUser(Long listId, Long memberId) {
        Long authUserId = authenticationClient.getAuthenticatedUserId();
        return listsRepository.isListIncludeUser(listId, authUserId, memberId);
    }

    private void checkUserIsBlocked(Long userId, Long supposedBlockedUserId) {
        boolean isPresent = userClient.isUserBlocked(userId, supposedBlockedUserId);

        if (isPresent) {
            throw new ApiRequestException("User with ID:" + supposedBlockedUserId + " is blocked", HttpStatus.BAD_REQUEST);
        }
    }

    private void checkIsListPrivate(Long listId) {
        Long authUserId = authenticationClient.getAuthenticatedUserId();
        boolean isPrivate = listsRepository.isListPrivate(listId, authUserId);

        if (isPrivate && !isMyProfileFollowList(listId)) {
            throw new ApiRequestException("List not found", HttpStatus.NOT_FOUND);
        }
    }

    private void checkIsListExist(Long listId, Long listOwnerId) {
        boolean isListExist = listsRepository.isListExist(listId, listOwnerId);

        if (!isListExist) {
            throw new ApiRequestException("List not found", HttpStatus.NOT_FOUND);
        }
    }
}
