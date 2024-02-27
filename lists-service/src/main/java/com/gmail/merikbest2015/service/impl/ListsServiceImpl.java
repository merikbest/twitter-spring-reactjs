package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.request.IdsRequest;
import com.gmail.merikbest2015.dto.request.ListsRequest;
import com.gmail.merikbest2015.dto.request.UserToListsRequest;
import com.gmail.merikbest2015.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.TweetClient;
import com.gmail.merikbest2015.model.Lists;
import com.gmail.merikbest2015.model.PinnedList;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.ListsRepository;
import com.gmail.merikbest2015.repository.projection.BaseListProjection;
import com.gmail.merikbest2015.repository.projection.ListProjection;
import com.gmail.merikbest2015.repository.projection.ListUserProjection;
import com.gmail.merikbest2015.repository.projection.PinnedListProjection;
import com.gmail.merikbest2015.service.ListsService;
import com.gmail.merikbest2015.service.UserService;
import com.gmail.merikbest2015.service.util.ListsServiceHelper;
import com.gmail.merikbest2015.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.gmail.merikbest2015.constants.ErrorMessage.LIST_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class ListsServiceImpl implements ListsService {

    private final ListsRepository listsRepository;
    private final ListsServiceHelper listsServiceHelper;
    private final UserService userService;
    private final TweetClient tweetClient;

    @Override
    @Transactional(readOnly = true)
    public List<ListProjection> getAllTweetLists() {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return listsRepository.getAllTweetLists(authUserId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ListUserProjection> getUserTweetLists() {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return listsRepository.getUserTweetLists(authUserId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PinnedListProjection> getUserPinnedLists() {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return listsRepository.getUserPinnedLists(authUserId);
    }

    @Override
    @Transactional(readOnly = true)
    public BaseListProjection getListById(Long listId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        BaseListProjection list = listsRepository.getListById(listId, authUserId, BaseListProjection.class)
                .orElseThrow(() -> new ApiRequestException(LIST_NOT_FOUND, HttpStatus.NOT_FOUND));
        if (!authUserId.equals(list.getListOwner().getId())) {
            userService.checkIsPrivateUserProfile(list.getListOwner().getId(), authUserId);
        }
        userService.checkUserIsBlocked(list.getListOwner().getId(), authUserId);
        return list;
    }

    @Override
    @Transactional
    public ListUserProjection createTweetList(ListsRequest listsRequest) {
        listsServiceHelper.validateListNameLength(listsRequest.getListName());
        User authUser = userService.getAuthUser();
        Lists list = new Lists();
        list.setListName(listsRequest.getListName());
        list.setDescription(listsRequest.getDescription());
        list.setPrivate(listsRequest.getIsPrivate());
        list.setAltWallpaper(listsRequest.getAltWallpaper());
        list.setWallpaper(listsRequest.getWallpaper());
        list.setListOwner(authUser);
        listsRepository.save(list);
        return listsRepository.getListById(list.getId(), ListUserProjection.class);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ListProjection> getUserTweetListsById(Long userId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();

        if (authUserId.equals(userId)) {
            return listsRepository.getUserTweetListsById(userId);
        }
        if (userService.isUserBlocked(authUserId, userId) || userService.isUserHavePrivateProfile(userId, authUserId)) {
            return new ArrayList<>();
        }
        return listsRepository.getUserTweetListsById(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ListProjection> getTweetListsWhichUserIn() {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return listsRepository.getTweetListsWhichUserIn(authUserId);
    }

    @Override
    @Transactional
    public BaseListProjection editTweetList(ListsRequest listsRequest) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        Lists list = listsRepository.getListByIdAndUserId(listsRequest.getId(), authUserId)
                .orElseThrow(() -> new ApiRequestException(LIST_NOT_FOUND, HttpStatus.NOT_FOUND));
        listsServiceHelper.validateListNameLength(listsRequest.getListName());
        list.setListName(listsRequest.getListName());
        list.setDescription(listsRequest.getDescription());
        list.setWallpaper(listsRequest.getWallpaper());
        list.setPrivate(listsRequest.getIsPrivate());
        return listsRepository.getListById(list.getId(), authUserId, BaseListProjection.class).get();
    }

    @Override
    @Transactional
    public String deleteList(Long listId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        Lists list = listsRepository.getListByIdAndUserId(listId, authUserId)
                .orElseThrow(() -> new ApiRequestException(LIST_NOT_FOUND, HttpStatus.NOT_FOUND));
        listsRepository.delete(list);
        return String.format("List id:%s deleted.", listId);
    }

    @Override
    @Transactional
    public ListUserProjection followList(Long listId) {
        Lists list = listsRepository.getListByIdAndIsPrivateFalse(listId)
                .orElseThrow(() -> new ApiRequestException(LIST_NOT_FOUND, HttpStatus.NOT_FOUND));
        User authUser = userService.getAuthUser();

        if (list.getListsFollowers().contains(authUser)) {
            list.getListsFollowers().remove(authUser);
            list.getPinnedLists().removeIf(pl -> pl.getPinnedUser().equals(authUser) && pl.getLists().equals(list));
        } else {
            list.getListsFollowers().add(authUser);
        }
        return listsRepository.getListById(listId, ListUserProjection.class);
    }

    @Override
    @Transactional
    public PinnedListProjection pinList(Long listId) {
        User authUser = userService.getAuthUser();
        Lists list = listsRepository.getListWhereUserConsist(listId, authUser.getId())
                .orElseThrow(() -> new ApiRequestException(LIST_NOT_FOUND, HttpStatus.NOT_FOUND));
        Optional<PinnedList> pinnedList = list.getPinnedLists().stream()
                .filter(pl -> pl.getPinnedUser().equals(authUser) && pl.getLists().equals(list))
                .findFirst();

        if (pinnedList.isPresent()) {
            list.getPinnedLists().remove(pinnedList.get());
        } else {
            list.getPinnedLists().add(new PinnedList(list, authUser));
        }
        return listsRepository.getListById(listId, PinnedListProjection.class);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getListsToAddUser(Long userId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return listsRepository.getUserOwnerLists(authUserId).stream()
                .map(list -> Map.of(
                        "list", list,
                        "isMemberInList", listsServiceHelper.isListIncludeUser(list.getId(), userId))
                )
                .toList();
    }

    @Override
    @Transactional
    public String addUserToLists(UserToListsRequest request) {
        User authUser = userService.getAuthUser();
        User user = userService.getUserById(request.getUserId());
        userService.checkUserIsBlocked(authUser.getId(), user.getId());
        userService.checkUserIsBlocked(user.getId(), authUser.getId());
        userService.checkIsPrivateUserProfile(user.getId(), authUser.getId());
        request.getLists().forEach(listsRequest -> {
            Lists list = listsRepository.getListWhereUserConsist(listsRequest.getListId(), authUser.getId())
                    .orElseThrow(() -> new ApiRequestException(LIST_NOT_FOUND, HttpStatus.NOT_FOUND));

            if (listsRequest.getIsMemberInList() && list.getListsMembers().contains(user)) {
                list.getListsMembers().remove(user);
            } else {
                if (!list.getListsMembers().contains(user)) {
                    list.getListsMembers().add(user);
                    listsServiceHelper.sendNotification(user.getId(), authUser.getId(), list.getId());
                }
            }
        });
        return "User added to lists success.";
    }

    @Override
    @Transactional
    public Boolean addUserToList(Long userId, Long listId) {
        User authUser = userService.getAuthUser();
        User user = userService.getUserById(userId);
        userService.checkUserIsBlocked(authUser.getId(), userId);
        userService.checkUserIsBlocked(userId, authUser.getId());
        userService.checkIsPrivateUserProfile(userId, authUser.getId());
        Lists list = listsRepository.getListWhereUserConsist(listId, authUser.getId())
                .orElseThrow(() -> new ApiRequestException(LIST_NOT_FOUND, HttpStatus.NOT_FOUND));

        if (list.getListsMembers().contains(user)) {
            list.getListsMembers().remove(user);
            return false;
        }
        list.getListsMembers().add(user);
        listsServiceHelper.sendNotification(userId, authUser.getId(), listId);
        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public HeaderResponse<TweetResponse> getTweetsByListId(Long listId, Pageable pageable) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        Lists lists = listsRepository.getNotPrivateList(listId, authUserId)
                .orElseThrow(() -> new ApiRequestException(LIST_NOT_FOUND, HttpStatus.NOT_FOUND));
        List<Long> membersIds = lists.getListsMembers().stream().map(User::getId).toList();
        return tweetClient.getTweetsByUserIds(new IdsRequest(membersIds), pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public BaseListProjection getListDetails(Long listId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return listsRepository.getListDetails(listId, authUserId)
                .orElseThrow(() -> new ApiRequestException(LIST_NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> getListFollowers(Long listId, Long listOwnerId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();

        if (!listOwnerId.equals(authUserId)) {
            userService.checkUserIsBlocked(listOwnerId, authUserId);
            listsServiceHelper.checkIsListExist(listId, listOwnerId);
            listsServiceHelper.checkIsListPrivate(listId);
        } else {
            listsServiceHelper.checkIsListExist(listId, authUserId);
        }
        return listsRepository.getFollowersByListId(listId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getListMembers(Long listId, Long listOwnerId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();

        if (!listOwnerId.equals(authUserId)) {
            userService.checkUserIsBlocked(listOwnerId, authUserId);
            listsServiceHelper.checkIsListExist(listId, listOwnerId);
            listsServiceHelper.checkIsListPrivate(listId);
            return listsRepository.getMembersByListId(listId).stream()
                    .map(user -> Map.of("user", user, "isMemberInList", false))
                    .toList();
        }
        listsServiceHelper.checkIsListExist(listId, authUserId);
        return getListMembers(listId, listsRepository.getMembersByListId(listId));
    }

    @Override
    @Transactional(readOnly = true)
    public List<Map<String, Object>> searchListMembersByUsername(Long listId, String username) {
        return getListMembers(listId, userService.searchListMembersByUsername(username));
    }

    private List<Map<String, Object>> getListMembers(Long listId, List<User> users) {
        return users.stream()
                .map(user -> Map.of(
                        "user", user,
                        "isMemberInList", listsServiceHelper.isListIncludeUser(listId, user.getId())))
                .toList();
    }
}
