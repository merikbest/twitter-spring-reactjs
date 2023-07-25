package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.request.IdsRequest;
import com.gmail.merikbest2015.dto.request.UserToListsRequest;
import com.gmail.merikbest2015.dto.response.lists.ListMemberResponse;
import com.gmail.merikbest2015.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.exception.ApiRequestException;
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

import static com.gmail.merikbest2015.constants.ErrorMessage.LIST_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class ListsServiceImpl implements ListsService {

    private final ListsRepository listsRepository;
    private final ListsFollowersRepository listsFollowersRepository;
    private final ListsMembersRepository listsMembersRepository;
    private final PinnedListsRepository pinnedListsRepository;
    private final ListsServiceHelper listsServiceHelper;
    private final UserClient userClient;
    private final TweetClient tweetClient;

    @Override
    @Transactional(readOnly = true)
    public List<ListProjection> getAllTweetLists() {
        List<Long> listOwnerIds = listsRepository.getListOwnerIds();
        List<Long> validListUserIds = userClient.getValidUserIds(new IdsRequest(listOwnerIds));
        return listsRepository.getAllTweetLists(validListUserIds);
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
        if (!authUserId.equals(list.getListOwnerId())) {
            listsServiceHelper.checkIsPrivateUserProfile(list.getListOwnerId());
        }
        listsServiceHelper.checkUserIsBlocked(list.getListOwnerId(), authUserId);
        return list;
    }

    @Override
    @Transactional
    public ListUserProjection createTweetList(Lists list) { // TODO pass listOwner (User) from front-end
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        listsServiceHelper.validateListNameLength(list.getName());
        listsServiceHelper.validateListOwner(list.getListOwnerId(), authUserId);
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
        if (userClient.isUserBlocked(authUserId, userId) || userClient.isUserHavePrivateProfile(userId)) {
            return new ArrayList<>();
        }
        return listsRepository.getUserTweetListsById(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ListProjection> getTweetListsWhichUserIn() {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return listsRepository.getTweetListsByIds(authUserId);
    }

    @Override
    @Transactional
    public BaseListProjection editTweetList(Lists listInfo) {
        Lists list = listsRepository.findById(listInfo.getId())
                .orElseThrow(() -> new ApiRequestException(LIST_NOT_FOUND, HttpStatus.NOT_FOUND));
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        listsServiceHelper.validateListNameLength(listInfo.getName());
        listsServiceHelper.validateListOwner(listInfo.getListOwnerId(), authUserId);
        list.setName(listInfo.getName());
        list.setDescription(listInfo.getDescription());
        list.setWallpaper(listInfo.getWallpaper());
        list.setPrivate(listInfo.isPrivate());
        return listsRepository.getListById(list.getId(), authUserId, BaseListProjection.class).get();
    }

    @Override
    @Transactional
    public String deleteList(Long listId) {
        Lists list = listsRepository.findById(listId)
                .orElseThrow(() -> new ApiRequestException(LIST_NOT_FOUND, HttpStatus.NOT_FOUND));
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        listsServiceHelper.validateListOwner(list.getListOwnerId(), authUserId);
        pinnedListsRepository.deletePinnedList(listId);
        listsRepository.delete(list);
        return String.format("List id:%s deleted.", listId);
    }

    @Override
    @Transactional
    public ListUserProjection followList(Long listId) {
        if (!listsRepository.findByIdAndIsPrivateFalse(listId)) {
            throw new ApiRequestException(LIST_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        ListsFollowers follower = listsFollowersRepository.getListFollower(listId, authUserId);

        if (follower != null) {
            listsFollowersRepository.delete(follower);
            pinnedListsRepository.removePinnedList(listId, authUserId);
        } else {
            ListsFollowers newFollower = new ListsFollowers(listId, authUserId);
            listsFollowersRepository.save(newFollower);
        }
        return listsRepository.getListById(listId, ListUserProjection.class);
    }

    @Override
    @Transactional
    public PinnedListProjection pinList(Long listId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        Lists list = listsRepository.getListWhereUserConsist(listId, authUserId)
                .orElseThrow(() -> new ApiRequestException(LIST_NOT_FOUND, HttpStatus.NOT_FOUND));
        PinnedLists pinnedLists = pinnedListsRepository.getPinnedByUserIdAndListId(listId, authUserId);

        if (pinnedLists != null) {
            pinnedListsRepository.delete(pinnedLists);
        } else {
            PinnedLists newPinnedLists = new PinnedLists(list, authUserId);
            pinnedListsRepository.save(newPinnedLists);
        }
        return listsRepository.getListById(listId, PinnedListProjection.class);
        // TODO or return true/false if lists pinned
    }

    @Override
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getListsToAddUser(Long userId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        List<Map<String, Object>> lists = new ArrayList<>();
        listsRepository.getUserOwnerLists(authUserId)
                .forEach(list -> lists.add(Map.of(
                        "list", list,
                        "isMemberInList", listsServiceHelper.isListIncludeUser(list.getId(), userId))
                ));
        return lists;
    }

    @Override
    @Transactional
    public String addUserToLists(UserToListsRequest listsRequest) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        listsServiceHelper.checkUserIsBlocked(authUserId, listsRequest.getUserId());
        listsServiceHelper.checkUserIsBlocked(listsRequest.getUserId(), authUserId);
        listsServiceHelper.checkIsPrivateUserProfile(listsRequest.getUserId());
        listsRequest.getLists().forEach(list -> {
            listsServiceHelper.checkIsListExist(list.getListId(), authUserId);
            ListsMembers member = listsMembersRepository.getListMember(list.getListId(), listsRequest.getUserId());

            if (list.getIsMemberInList() && member != null) {
                listsMembersRepository.delete(member);
            } else {
                if (member == null) {
                    ListsMembers newMember = new ListsMembers(list.getListId(), listsRequest.getUserId());
                    listsMembersRepository.save(newMember);
                    listsServiceHelper.sendNotification(listsRequest.getUserId(), authUserId, list.getListId());
                }
            }
        });
        return "User added to lists success.";
    }

    @Override
    @Transactional
    public Boolean addUserToList(Long userId, Long listId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        listsServiceHelper.checkUserIsBlocked(authUserId, userId);
        listsServiceHelper.checkUserIsBlocked(userId, authUserId);
        listsServiceHelper.checkIsPrivateUserProfile(userId);
        listsServiceHelper.checkIsListExist(listId, authUserId);
        ListsMembers member = listsMembersRepository.getListMember(listId, userId);
        boolean isAddedToList;

        if (member != null) {
            listsMembersRepository.delete(member);
            isAddedToList = false;
        } else {
            ListsMembers newMember = new ListsMembers(listId, userId);
            listsMembersRepository.save(newMember);
            isAddedToList = true;
            listsServiceHelper.sendNotification(userId, authUserId, listId);
        }
        return isAddedToList;
    }

    @Override
    @Transactional(readOnly = true)
    public HeaderResponse<TweetResponse> getTweetsByListId(Long listId, Pageable pageable) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        if (!listsRepository.isListNotPrivate(listId, authUserId)) {
            throw new ApiRequestException(LIST_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        List<Long> membersIds = listsMembersRepository.getMembersIds(listId);
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
    public List<ListMemberResponse> getListFollowers(Long listId, Long listOwnerId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();

        if (!listOwnerId.equals(authUserId)) {
            listsServiceHelper.checkUserIsBlocked(listOwnerId, authUserId);
            listsServiceHelper.checkIsListExist(listId, listOwnerId);
            listsServiceHelper.checkIsListPrivate(listId);
        } else {
            listsServiceHelper.checkIsListExist(listId, authUserId);
        }
        List<Long> followersIds = listsFollowersRepository.getFollowersIds(listId);
        return userClient.getListParticipantsByIds(new IdsRequest(followersIds));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ListMemberResponse> getListMembers(Long listId, Long listOwnerId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();

        if (!listOwnerId.equals(authUserId)) {
            listsServiceHelper.checkUserIsBlocked(listOwnerId, authUserId);
            listsServiceHelper.checkIsListExist(listId, listOwnerId);
            listsServiceHelper.checkIsListPrivate(listId);
            return listsServiceHelper.getListMemberResponses(listId);
        } else {
            listsServiceHelper.checkIsListExist(listId, authUserId);
            return listsServiceHelper.getListMemberResponses(listId).stream()
                    .peek(member -> member.setMemberInList(listsServiceHelper.isListIncludeUser(listId, member.getId())))
                    .toList();
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<ListMemberResponse> searchListMembersByUsername(Long listId, String username) {
        return userClient.searchListMembersByUsername(username).stream()
                .peek(member -> member.setMemberInList(listsServiceHelper.isListIncludeUser(listId, member.getId())))
                .toList();
    }
}
