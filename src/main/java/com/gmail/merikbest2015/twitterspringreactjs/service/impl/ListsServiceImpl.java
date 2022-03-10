package com.gmail.merikbest2015.twitterspringreactjs.service.impl;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.UserToListsRequest;
import com.gmail.merikbest2015.twitterspringreactjs.exception.ApiRequestException;
import com.gmail.merikbest2015.twitterspringreactjs.model.Lists;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import com.gmail.merikbest2015.twitterspringreactjs.repository.ImageRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.ListsRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.TweetRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.UserRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.lists.*;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.tweet.TweetProjection;
import com.gmail.merikbest2015.twitterspringreactjs.service.AuthenticationService;
import com.gmail.merikbest2015.twitterspringreactjs.service.ListsService;
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

    private final AuthenticationService authenticationService;
    private final ListsRepository listsRepository;
    private final TweetRepository tweetRepository;
    private final UserRepository userRepository;
    private final ImageRepository imageRepository;

    @Override
    public List<ListProjection> getAllTweetLists() {
        return listsRepository.getAllTweetLists();
    }

    @Override
    public List<ListUserProjection> getUserTweetLists() {
        Long userId = authenticationService.getAuthenticatedUserId();
        return listsRepository.getUserTweetLists(userId);
    }

    @Override
    public List<PinnedListProjection> getUserPinnedLists() {
        Long userId = authenticationService.getAuthenticatedUserId();
        return listsRepository.getUserPinnedLists(userId);
    }

    @Override
    public BaseListProjection getListById(Long listId) {
        Long userId = authenticationService.getAuthenticatedUserId();
        return listsRepository.getListById(listId, userId)
                .orElseThrow(() -> new ApiRequestException("List not found", HttpStatus.NOT_FOUND));
    }

    @Override
    @Transactional
    public ListUserProjection createTweetList(Lists lists) {
        if (lists.getName().length() == 0 || lists.getName().length() > 25) {
            throw new ApiRequestException("Incorrect list name length", HttpStatus.BAD_REQUEST);
        }
        User user = authenticationService.getAuthenticatedUser();
        lists.setListOwner(user);
        Lists userTweetList = listsRepository.save(lists);
        List<Lists> userLists = user.getUserLists();
        userLists.add(userTweetList);
        return listsRepository.getUserTweetListById(userTweetList.getId());
    }

    @Override
    public List<ListProjection> getUserTweetListsById(Long userId) {
        return listsRepository.findByListOwnerIdAndIsPrivateFalse(userId);
    }

    @Override
    public List<ListProjection> getTweetListsWhichUserIn() {
        Long userId = authenticationService.getAuthenticatedUserId();
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
        Long userId = authenticationService.getAuthenticatedUserId();

        if (!listFromDb.getListOwner().getId().equals(userId)) {
            throw new ApiRequestException("List owner not found", HttpStatus.NOT_FOUND);
        }
        listFromDb.setName(listInfo.getName());
        listFromDb.setDescription(listInfo.getDescription());
        listFromDb.setWallpaper(listInfo.getWallpaper());
        listFromDb.setPrivate(listInfo.isPrivate());
        return listsRepository.getListById(listFromDb.getId(), userId).get();
    }

    @Override
    @Transactional(rollbackFor = ApiRequestException.class)
    public String deleteList(Long listId) {
        User user = authenticationService.getAuthenticatedUser();
        Lists list = listsRepository.findById(listId)
                .orElseThrow(() -> new ApiRequestException("List not found", HttpStatus.NOT_FOUND));

        if (!list.getListOwner().getId().equals(user.getId())) {
            throw new ApiRequestException("List owner not found", HttpStatus.BAD_REQUEST);
        }
        user.getUserLists().remove(list);
        list.getTweets().removeAll(list.getTweets());
        list.getMembers().removeAll(list.getMembers());
        list.getFollowers().forEach(follower -> follower.getUserLists().remove(list));
        list.getFollowers().removeAll(list.getFollowers());

        if (list.getWallpaper() != null) {
            imageRepository.delete(list.getWallpaper());
        }
        listsRepository.delete(list);
        return "List id:" + list.getId() + " deleted.";
    }

    @Override
    @Transactional
    public ListUserProjection followList(Long listId) {
        User user = authenticationService.getAuthenticatedUser();
        Lists list = listsRepository.findByIdAndIsPrivateFalse(listId)
                .orElseThrow(() -> new ApiRequestException("List not found", HttpStatus.NOT_FOUND));
        // TODO if user blocked by other user, can the user follow list???
        Optional<User> listFollower = list.getFollowers().stream()
                .filter(follower -> follower.getId().equals(user.getId()))
                .findFirst();
        List<User> listFollowers = list.getFollowers();

        if (listFollower.isPresent()) {
            listFollowers.remove(listFollower.get());
            if (list.getPinnedDate() != null) {
                list.setPinnedDate(null);
            }
            user.getUserLists().remove(list);
        } else {
            listFollowers.add(user);
            user.getUserLists().add(list);
        }
        return listsRepository.getUserTweetListById(list.getId());
    }

    @Override
    @Transactional
    public PinnedListProjection pinList(Long listId) {
        Long userId = authenticationService.getAuthenticatedUserId();
        List<Lists> userLists = listsRepository.findByListOwner_Id(userId);
        Optional<Lists> list = userLists.stream()
                .filter(userList -> userList.getId().equals(listId))
                .findFirst();

        if (list.isPresent()) {
            if (list.get().getPinnedDate() == null) {
                list.get().setPinnedDate(LocalDateTime.now().withNano(0));
            } else {
                list.get().setPinnedDate(null);
            }
            return listsRepository.getUserPinnedListById(list.get().getId());
        } else {
            throw new ApiRequestException("List not found", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public List<Map<String, Object>> getListsToAddUser(Long userId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
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
    public String addUserToLists(UserToListsRequest listsRequest) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        checkUserIsBlocked(authUserId, listsRequest.getUserId());
        User user = userRepository.getValidUser(listsRequest.getUserId(), authUserId)
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
    public Boolean addUserToList(Long userId, Long listId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        checkUserIsBlocked(authUserId, userId);
        User user = userRepository.getValidUser(userId, authUserId)
                .orElseThrow(() -> new ApiRequestException("User not found", HttpStatus.NOT_FOUND));
        checkUserIsBlocked(user.getId(), authUserId);
        Lists list = listsRepository.findById(listId)
                .orElseThrow(() -> new ApiRequestException("List not found", HttpStatus.NOT_FOUND));
        Optional<User> listMember = list.getMembers().stream()
                .filter(member -> member.getId().equals(user.getId()))
                .findFirst();

        if (listMember.isPresent()) {
            list.getMembers().remove(user);
            return false;
        } else {
            list.getMembers().add(user);
            return true;
        }
    }

    @Override
    public Page<TweetProjection> getTweetsByListId(Long listId, Pageable pageable) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        List<Long> listMembersIds = listsRepository.getListMembersIds(listId, authUserId);
        return tweetRepository.findTweetsByUserIds(listMembersIds, pageable);
    }

    @Override
    public BaseListProjection getListDetails(Long listId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return listsRepository.getListDetails(listId, authUserId)
                .orElseThrow(() -> new ApiRequestException("List not found", HttpStatus.NOT_FOUND));
    }

    @Override
    public List<ListMemberProjection> getListFollowers(Long listId, Long listOwnerId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();

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
        Long authUserId = authenticationService.getAuthenticatedUserId();

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
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return listsRepository.isMyProfileFollowList(listId, authUserId);
    }

    public boolean isListIncludeUser(Long listId, Long memberId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return listsRepository.isListIncludeUser(listId, authUserId, memberId);
    }

    private void checkUserIsBlocked(Long userId, Long supposedBlockedUserId) {
        boolean isPresent = userRepository.isUserBlocked(userId, supposedBlockedUserId);

        if (isPresent) {
            throw new ApiRequestException("User with ID:" + supposedBlockedUserId + " is blocked", HttpStatus.BAD_REQUEST);
        }
    }

    private void checkIsListPrivate(Long listId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
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
