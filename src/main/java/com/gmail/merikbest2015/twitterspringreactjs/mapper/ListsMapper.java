package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.ListsRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.UserToListsRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.lists.*;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetHeaderResponse;
import com.gmail.merikbest2015.twitterspringreactjs.model.Lists;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.lists.*;
import com.gmail.merikbest2015.twitterspringreactjs.service.ListsService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ListsMapper {

    private final ModelMapper modelMapper;
    private final TweetMapper tweetMapper;
    private final ListsService listsService;

    private Lists convertToListsEntity(ListsRequest listsRequest) {
        return modelMapper.map(listsRequest, Lists.class);
    }

    private BaseListResponse convertToBaseListsResponse(BaseListProjection list) {
        return modelMapper.map(list, BaseListResponse.class);
    }

    private ListResponse convertToListsResponse(ListProjection list) {
        return modelMapper.map(list, ListResponse.class);
    }

    private List<ListResponse> convertListToResponse(List<ListProjection> lists) {
        return lists.stream()
                .map(this::convertToListsResponse)
                .collect(Collectors.toList());
    }

    private ListUserResponse convertToListsUserResponse(ListUserProjection list) {
        return modelMapper.map(list, ListUserResponse.class);
    }

    private List<ListUserResponse> convertListUserToResponse(List<ListUserProjection> lists) {
        return lists.stream()
                .map(this::convertToListsUserResponse)
                .collect(Collectors.toList());
    }

    private PinnedListResponse convertToPinnedListsResponse(PinnedListProjection list) {
        return modelMapper.map(list, PinnedListResponse.class);
    }

    private List<PinnedListResponse> convertPinnedListToResponse(List<PinnedListProjection> lists) {
        return lists.stream()
                .map(this::convertToPinnedListsResponse)
                .collect(Collectors.toList());
    }

    public List<ListResponse> getAllTweetLists() {
        List<ListProjection> lists = listsService.getAllTweetLists();
        return lists.contains(null) ? new ArrayList<>() : convertListToResponse(lists);
    }

    public List<ListUserResponse> getUserTweetLists() {
        List<ListUserProjection> lists = listsService.getUserTweetLists();
        return lists.contains(null) ? new ArrayList<>() : convertListUserToResponse(lists);
    }

    public List<ListResponse> getUserTweetListsById(Long userId) {
        List<ListProjection> lists = listsService.getUserTweetListsById(userId);
        return lists.contains(null) ? new ArrayList<>() : convertListToResponse(lists);
    }

    public List<ListResponse> getTweetListsWhichUserIn() {
        List<ListProjection> lists = listsService.getTweetListsWhichUserIn();
        return lists.contains(null) ? new ArrayList<>() : convertListToResponse(lists);
    }

    public List<PinnedListResponse> getUserPinnedLists() {
        List<PinnedListProjection> userPinnedLists = listsService.getUserPinnedLists();
        return userPinnedLists.contains(null) ? new ArrayList<>() : convertPinnedListToResponse(userPinnedLists);
    }

    public BaseListResponse getListById(Long listId) {
        return convertToBaseListsResponse(listsService.getListById(listId));
    }

    public ListUserResponse createTweetList(ListsRequest listsRequest) {
        return convertToListsUserResponse(listsService.createTweetList(convertToListsEntity(listsRequest)));
    }

    public BaseListResponse editTweetList(ListsRequest listsRequest) {
        return convertToBaseListsResponse(listsService.editTweetList(convertToListsEntity(listsRequest)));
    }

    public String deleteList(Long listId) {
        return listsService.deleteList(listId);
    }

    public ListUserResponse followList(Long listId) {
        return convertToListsUserResponse(listsService.followList(listId));
    }

    public PinnedListResponse pinList(Long listId) {
        return convertToPinnedListsResponse(listsService.pinList(listId));
    }

    public List<Long> addUserToLists(UserToListsRequest userToListsRequest) {
        return listsService.addUserToLists(userToListsRequest.getUserId(),
                userToListsRequest.getLists().stream()
                        .map(UserToListsRequest.ListsRequest::getId)
                        .collect(Collectors.toList()));
    }

    public Boolean addUserToList(Long userId, Long listId) {
        return listsService.addUserToList(userId, listId);
    }

    public TweetHeaderResponse getTweetsByListId(Long listId, Pageable pageable) {
        return tweetMapper.getTweetHeaderProjectionResponse(listsService.getTweetsByListId(listId, pageable));
    }

    public BaseListResponse getListDetails(Long listId) {
        return convertToBaseListsResponse(listsService.getListDetails(listId));
    }

    public List<?> getListMembers(Long listId, Long listOwnerId) {
        Map<String, Object> listMembers = listsService.getListMembers(listId, listOwnerId);

        if (listMembers.get("userMembers") != null) {
            List<ListsMemberProjection> userMembers = (List<ListsMemberProjection>) listMembers.get("userMembers");
            return userMembers.contains(null) ? new ArrayList<>() : userMembers.stream()
                    .map(list -> modelMapper.map(list.getMember(), ListMemberResponse.class))
                    .collect(Collectors.toList());
        } else {
            List<ListsOwnerMemberProjection> userMembers = (List<ListsOwnerMemberProjection>) listMembers.get("authUserMembers");

            if (userMembers.get(0).getMember() == null) {
                return new ArrayList<>();
            } else {
                List<ListsOwnerMemberResponse> members = new ArrayList<>();
                userMembers.forEach(listsMemberProjection -> {
                    ListsOwnerMemberResponse member = modelMapper.map(listsMemberProjection.getMember(), ListsOwnerMemberResponse.class);
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
                    ListsOwnerMemberResponse member = modelMapper.map(userMemberMap.get("member"), ListsOwnerMemberResponse.class);
                    member.setMemberInList((Boolean) userMemberMap.get("isMemberInList"));
                    return member;
                })
                .collect(Collectors.toList());
    }
}
