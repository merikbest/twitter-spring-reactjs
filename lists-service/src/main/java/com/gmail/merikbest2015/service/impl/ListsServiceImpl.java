package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.NotificationRequest;
import com.gmail.merikbest2015.dto.TweetResponse;
import com.gmail.merikbest2015.dto.lists.ListMemberResponse;
import com.gmail.merikbest2015.dto.lists.ListOwnerResponse;
import com.gmail.merikbest2015.dto.IdsRequest;
import com.gmail.merikbest2015.dto.request.UserToListsRequest;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.NotificationClient;
import com.gmail.merikbest2015.feign.TweetClient;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.model.Lists;
import com.gmail.merikbest2015.model.ListsFollowers;
import com.gmail.merikbest2015.model.ListsMembers;
import com.gmail.merikbest2015.model.PinnedLists;
import com.gmail.merikbest2015.repository.ListsFollowersRepository;
import com.gmail.merikbest2015.repository.ListsMembersRepository;
import com.gmail.merikbest2015.repository.ListsRepository;
import com.gmail.merikbest2015.repository.PinnedListsRepository;
import com.gmail.merikbest2015.repository.projection.BaseListProjection;
import com.gmail.merikbest2015.repository.projection.ListProjection;
import com.gmail.merikbest2015.repository.projection.ListUserProjection;
import com.gmail.merikbest2015.repository.projection.PinnedListProjection;
import com.gmail.merikbest2015.service.ListsService;
import com.gmail.merikbest2015.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ListsServiceImpl implements ListsService {

    private final ListsRepository listsRepository;
    private final ListsFollowersRepository listsFollowersRepository;
    private final ListsMembersRepository listsMembersRepository;
    private final PinnedListsRepository pinnedListsRepository;
    private final NotificationClient notificationClient;
    private final UserClient userClient;
    private final TweetClient tweetClient;

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
    public ListUserProjection createTweetList(Lists list) { // TODO pass listOwner (User) from front-end
        Long userId = AuthUtil.getAuthenticatedUserId();
        validateListNameLength(list.getName());
        validateListOwner(list.getListOwnerId(), userId);
        listsRepository.save(list);
        return listsRepository.getUserTweetListById(list.getId());
    }

    @Override
    public List<ListProjection> getUserTweetListsById(Long userId) {
        // TODO check isMyProfileBlocked
        return listsRepository.getUserTweetListsById(userId);
    }

    @Override
    public List<ListProjection> getTweetListsWhichUserIn() {
        Long userId = AuthUtil.getAuthenticatedUserId();
        List<Long> listIds = listsMembersRepository.getListIds(userId);
        return listsRepository.getTweetListsByIds(listIds);
    }

    @Override
    @Transactional
    public BaseListProjection editTweetList(Lists listInfo) {
        Lists list = listsRepository.findById(listInfo.getId())
                .orElseThrow(() -> new ApiRequestException("List not found", HttpStatus.NOT_FOUND));
        Long userId = AuthUtil.getAuthenticatedUserId();
        validateListNameLength(listInfo.getName());
        validateListOwner(listInfo.getListOwnerId(), userId);
        list.setName(listInfo.getName());
        list.setDescription(listInfo.getDescription());
        list.setWallpaper(listInfo.getWallpaper());
        list.setPrivate(listInfo.isPrivate());
        List<Long> listIds = listsFollowersRepository.getListIds(userId);
        return listsRepository.getListById(listIds, list.getId(), userId).get();
    }

    @Override
    @Transactional
    public String deleteList(Long listId) {
        Lists list = listsRepository.findById(listId)
                .orElseThrow(() -> new ApiRequestException("List not found", HttpStatus.NOT_FOUND));
        Long userId = AuthUtil.getAuthenticatedUserId();
        validateListOwner(list.getListOwnerId(), userId);
        pinnedListsRepository.deletePinnedList(listId);
        listsRepository.delete(list);
        return "List id:" + list.getId() + " deleted.";
    }

    @Override
    @Transactional
    public ListUserProjection followList(Long listId) {
        // TODO if user blocked by other user, can the user follow list???
        // mb better listsRepository.isListExist ???
        boolean isListExist = listsRepository.findByIdAndIsPrivateFalse(listId);

        if (!isListExist) {
            throw new ApiRequestException("List not found", HttpStatus.NOT_FOUND);
        }
        Long userId = AuthUtil.getAuthenticatedUserId();
        ListsFollowers follower = listsFollowersRepository.getListFollower(userId, listId);

        if (follower != null) {
            listsFollowersRepository.delete(follower);
            pinnedListsRepository.removePinnedList(listId, userId);
        } else {
            ListsFollowers bewFollower = new ListsFollowers(listId, userId);
            listsFollowersRepository.save(bewFollower);
        }
        return listsRepository.getUserTweetListById(listId);
    }

    @Override
    @Transactional
    public PinnedListProjection pinList(Long listId) {
        Long userId = AuthUtil.getAuthenticatedUserId();
        List<Long> listIds = listsFollowersRepository.getListIds(userId);
        Lists list = listsRepository.getListWhereUserConsist(listIds, listId, userId)
                .orElseThrow(() -> new ApiRequestException("List not found", HttpStatus.NOT_FOUND));
        PinnedLists pinnedLists = pinnedListsRepository.getPinnedByUserIdAndListId(listId, userId);

        if (pinnedLists != null) {
            pinnedListsRepository.delete(pinnedLists);
        } else {
            PinnedLists newPinnedLists = new PinnedLists(list, userId);
            pinnedListsRepository.save(newPinnedLists);
        }
        return listsRepository.getUserPinnedListById(listId);
        // TODO or return true/false if lists pinned
    }

    @Override
    public List<Map<String, Object>> getListsToAddUser(Long userId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        List<Map<String, Object>> lists = new ArrayList<>();
        listsRepository.getUserOwnerLists(authUserId)
                .forEach(list -> lists.add(Map.of(
                        "list", list,
                        "isMemberInList", isListIncludeUser(list.getId(), userId))
                ));
        return lists;
    }

    @Override
    @Transactional
    public String addUserToLists(UserToListsRequest listsRequest) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        checkUserIsBlocked(authUserId, listsRequest.getUserId());
        checkUserIsBlocked(listsRequest.getUserId(), authUserId);
        checkIsPrivateUserProfile(listsRequest.getUserId());
        listsRequest.getLists().forEach(list -> {
            checkIsListExist(list.getListId(), authUserId);
            ListsMembers member = listsMembersRepository.getListMember(list.getListId(), listsRequest.getUserId());

            if (list.getIsMemberInList()) {
                listsMembersRepository.delete(member);
            } else {
                if (member == null) {
                    ListsMembers newMember = new ListsMembers(list.getListId(), listsRequest.getUserId());
                    listsMembersRepository.save(newMember);
                    notificationClient.sendListNotification(new NotificationRequest(
                            true, listsRequest.getUserId(), authUserId, list.getListId()));
                }
            }
        });
        return "User added to lists success.";
    }

    @Override
    @Transactional
    public Boolean addUserToList(Long userId, Long listId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        checkUserIsBlocked(authUserId, userId);
        checkUserIsBlocked(userId, authUserId);
        checkIsPrivateUserProfile(userId);
        checkIsListExist(listId, authUserId);
        ListsMembers member = listsMembersRepository.getListMember(listId, userId);
        boolean isAddedToList;

        if (member != null) {
            listsMembersRepository.delete(member);
            isAddedToList = false;
        } else {
            ListsMembers newMember = new ListsMembers(listId, userId);
            listsMembersRepository.save(newMember);
            isAddedToList = true;
            notificationClient.sendListNotification(new NotificationRequest(true, userId, authUserId, listId));
        }
        return isAddedToList;
    }

    @Override
    public HeaderResponse<TweetResponse> getTweetsByListId(Long listId, Pageable pageable) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        List<Long> listIds = listsFollowersRepository.getListIds(authUserId);
        boolean isListNotPrivate = listsRepository.isListNotPrivate(listIds, listId, authUserId);

        if (!isListNotPrivate) {
            throw new ApiRequestException("List not found", HttpStatus.NOT_FOUND);
        }
        List<Long> membersIds = listsMembersRepository.getMembersIds(listId);
        return tweetClient.getTweetsByUserIds(new IdsRequest(membersIds), pageable);
    }

    @Override
    public BaseListProjection getListDetails(Long listId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return listsRepository.getListDetails(listId, authUserId)
                .orElseThrow(() -> new ApiRequestException("List not found", HttpStatus.NOT_FOUND));
    }

    @Override
    public List<ListMemberResponse> getListFollowers(Long listId, Long listOwnerId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();

        if (!listOwnerId.equals(authUserId)) {
            checkUserIsBlocked(listOwnerId, authUserId);
            checkIsListExist(listId, listOwnerId);
            checkIsListPrivate(listId);
            List<Long> followersIds = listsFollowersRepository.getFollowersIds(listId);
            return userClient.getListParticipantsByIds(new IdsRequest(followersIds));
        } else {
            checkIsListExist(listId, authUserId);
            List<Long> followersIds = listsFollowersRepository.getFollowersIds(listId);
            return userClient.getListParticipantsByIds(new IdsRequest(followersIds));
        }
    }

    @Override
    public List<ListMemberResponse> getListMembers(Long listId, Long listOwnerId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();

        if (!listOwnerId.equals(authUserId)) {
            checkUserIsBlocked(listOwnerId, authUserId);
            checkIsListExist(listId, listOwnerId);
            checkIsListPrivate(listId);
            return getListMemberResponses(listId);
        } else {
            checkIsListExist(listId, authUserId);
            return getListMemberResponses(listId).stream()
                    .map(member -> new ListMemberResponse(isListIncludeUser(listId, member.getId())))
                    .toList();
        }
    }

    @Override
    public List<ListMemberResponse> searchListMembersByUsername(Long listId, String username) {
        return userClient.searchListMembersByUsername(username).stream()
                .map(member -> new ListMemberResponse(isListIncludeUser(listId, member.getId())))
                .toList();
    }

    private List<ListMemberResponse> getListMemberResponses(Long listId) {
        List<Long> membersIds = listsMembersRepository.getMembersIds(listId);
        return userClient.getListParticipantsByIds(new IdsRequest(membersIds));
    }

    public boolean isMyProfileFollowList(Long listId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return listsFollowersRepository.isListFollowed(authUserId, listId);
    }

    public boolean isListIncludeUser(Long listId, Long memberId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        List<Long> listIds = listsMembersRepository.getListIds(memberId);
        return listsRepository.isListIncludeUser(listIds, listId, authUserId);
    }

    private void checkUserIsBlocked(Long userId, Long supposedBlockedUserId) {
        boolean isPresent = userClient.isUserBlocked(userId, supposedBlockedUserId);

        if (isPresent) {
            throw new ApiRequestException("User with ID:" + supposedBlockedUserId + " is blocked", HttpStatus.BAD_REQUEST);
        }
    }

    private void checkIsPrivateUserProfile(Long userId) {
        boolean isPrivateUserProfile = userClient.isUserHavePrivateProfile(userId);

        if (isPrivateUserProfile) {
            throw new ApiRequestException("User not found", HttpStatus.NOT_FOUND);
        }
    }

    private void checkIsListPrivate(Long listId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        boolean isPrivate = listsRepository.isListPrivate(listId, authUserId);

        if (isPrivate && !isMyProfileFollowList(listId)) {
            throw new ApiRequestException("List not found", HttpStatus.NOT_FOUND);
        }
    }

    private void checkIsListExist(Long listId, Long listOwnerId) {
        List<Long> listIds = listsFollowersRepository.getListIds(listOwnerId);
        boolean isListExist = listsRepository.isListExist(listIds, listId, listOwnerId);

        if (!isListExist) {
            throw new ApiRequestException("List not found", HttpStatus.NOT_FOUND);
        }
    }

    public ListOwnerResponse getListOwnerById(Long userId) {
        return userClient.getListOwnerById(userId);
    }

    private void validateListNameLength(String listName) {
        if (listName.length() == 0 || listName.length() > 25) {
            throw new ApiRequestException("Incorrect list name length", HttpStatus.BAD_REQUEST);
        }
    }

    private void validateListOwner(Long listOwnerId, Long authUserId) {
        if (!listOwnerId.equals(authUserId)) {
            throw new ApiRequestException("List owner not found", HttpStatus.NOT_FOUND);
        }
    }
}
