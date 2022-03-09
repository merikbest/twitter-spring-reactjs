package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.ListsRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.UserToListsRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.lists.*;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetHeaderResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.twitterspringreactjs.model.Lists;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.lists.*;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.tweet.TweetProjection;
import com.gmail.merikbest2015.twitterspringreactjs.service.ListsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ListsMapper {

    private final BasicMapper basicMapper;
    private final TweetMapper tweetMapper;
    private final ListsService listsService;

    public List<ListResponse> getAllTweetLists() {
        List<ListProjection> lists = listsService.getAllTweetLists();
        return basicMapper.convertToResponseList(lists, ListResponse.class);
    }

    public List<ListUserResponse> getUserTweetLists() {
        List<ListUserProjection> lists = listsService.getUserTweetLists();
        return basicMapper.convertToResponseList(lists, ListUserResponse.class);
    }

    public List<ListResponse> getUserTweetListsById(Long userId) {
        List<ListProjection> lists = listsService.getUserTweetListsById(userId);
        return basicMapper.convertToResponseList(lists, ListResponse.class);
    }

    public List<ListResponse> getTweetListsWhichUserIn() {
        List<ListProjection> lists = listsService.getTweetListsWhichUserIn();
        return basicMapper.convertToResponseList(lists, ListResponse.class);
    }

    public List<PinnedListResponse> getUserPinnedLists() {
        List<PinnedListProjection> userPinnedLists = listsService.getUserPinnedLists();
        return basicMapper.convertToResponseList(userPinnedLists, PinnedListResponse.class);
    }

    public BaseListResponse getListById(Long listId) {
        BaseListProjection list = listsService.getListById(listId);
        return basicMapper.convertToResponse(list, BaseListResponse.class);
    }

    public ListUserResponse createTweetList(ListsRequest listsRequest) {
        ListUserProjection list = listsService.createTweetList(basicMapper.convertToEntity(listsRequest, Lists.class));
        return basicMapper.convertToResponse(list, ListUserResponse.class);
    }

    public BaseListResponse editTweetList(ListsRequest listsRequest) {
        BaseListProjection list = listsService.editTweetList(basicMapper.convertToEntity(listsRequest, Lists.class));
        return basicMapper.convertToResponse(list, BaseListResponse.class);
    }

    public String deleteList(Long listId) {
        return listsService.deleteList(listId);
    }

    public ListUserResponse followList(Long listId) {
        ListUserProjection list = listsService.followList(listId);
        return basicMapper.convertToResponse(list, ListUserResponse.class);
    }

    public PinnedListResponse pinList(Long listId) {
        PinnedListProjection list = listsService.pinList(listId);
        return basicMapper.convertToResponse(list, PinnedListResponse.class);
    }

    public List<SimpleListResponse> getListsToAddUser(Long userId) {
        List<Map<String, Object>> userLists = listsService.getListsToAddUser(userId);
        return userLists.stream()
                .map(list -> {
                    SimpleListResponse simpleListResponse = basicMapper.convertToResponse(list.get("list"), SimpleListResponse.class);
                    simpleListResponse.setMemberInList((Boolean) list.get("isMemberInList"));
                    return simpleListResponse;
                })
                .collect(Collectors.toList());
    }

    public String addUserToLists(UserToListsRequest userToListsRequest) {
        return listsService.addUserToLists(userToListsRequest);
    }

    public Boolean addUserToList(Long userId, Long listId) {
        return listsService.addUserToList(userId, listId);
    }

    public TweetHeaderResponse<TweetResponse> getTweetsByListId(Long listId, Pageable pageable) {
        Page<TweetProjection> tweets = listsService.getTweetsByListId(listId, pageable);
        return tweetMapper.getTweetHeaderResponse(tweets, TweetResponse.class);
    }

    public BaseListResponse getListDetails(Long listId) {
        BaseListProjection list = listsService.getListDetails(listId);
        return basicMapper.convertToResponse(list, BaseListResponse.class);
    }

    public List<ListMemberResponse> getListFollowers(Long listId, Long listOwnerId) {
        List<ListMemberProjection> followers = listsService.getListFollowers(listId, listOwnerId);
        return basicMapper.convertToResponseList(followers, ListMemberResponse.class);
    }

    public List<?> getListMembers(Long listId, Long listOwnerId) {
        Map<String, Object> listMembers = listsService.getListMembers(listId, listOwnerId);

        if (listMembers.get("userMembers") != null) {
            List<ListMemberProjection> userMembers = (List<ListMemberProjection>) listMembers.get("userMembers");
            return basicMapper.convertToResponseList(userMembers, ListMemberResponse.class);
        } else {
            List<ListsOwnerMemberProjection> userMembers = (List<ListsOwnerMemberProjection>) listMembers.get("authUserMembers");

            if (userMembers.get(0).getMember() == null) {
                return new ArrayList<>();
            } else {
                List<ListsOwnerMemberResponse> members = new ArrayList<>();
                userMembers.forEach(listsMemberProjection -> {
                    ListsOwnerMemberResponse member = basicMapper.convertToResponse(listsMemberProjection.getMember(), ListsOwnerMemberResponse.class);
                    member.setMemberInList(listsMemberProjection.getIsMemberInList());
                    members.add(member);
                });
                return members;
            }
        }
    }

    public List<ListsOwnerMemberResponse> searchListMembersByUsername(Long listId, String username) {
        List<Map<String, Object>> userMembers = listsService.searchListMembersByUsername(listId, username);
        return userMembers.stream()
                .map(userMemberMap -> {
                    ListsOwnerMemberResponse member = basicMapper.convertToResponse(userMemberMap.get("member"), ListsOwnerMemberResponse.class);
                    member.setMemberInList((Boolean) userMemberMap.get("isMemberInList"));
                    return member;
                })
                .collect(Collectors.toList());
    }
}
