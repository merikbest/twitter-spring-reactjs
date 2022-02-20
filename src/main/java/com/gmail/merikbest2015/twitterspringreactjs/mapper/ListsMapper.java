package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.ListsRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.UserToListsRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ListsResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.lists.*;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetHeaderProjectionResponse;
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

    private List<Lists> convertListsResponseToEntity(List<ListsResponse> listsResponse) {
        return listsResponse.stream()
                .map(list -> modelMapper.map(list, Lists.class))
                .collect(Collectors.toList());
    }

    private BaseListProjectionResponse convertToBaseListsResponse(BaseListProjection list) {
        return modelMapper.map(list, BaseListProjectionResponse.class);
    }

    private ListProjectionResponse convertToListsResponse(ListProjection list) {
        return modelMapper.map(list, ListProjectionResponse.class);
    }

    private List<ListProjectionResponse> convertListToResponse(List<ListsProjection> lists) {
        return lists.stream()
                .map(listsProjection -> convertToListsResponse(listsProjection.getList()))
                .collect(Collectors.toList());
    }

    private ListUserProjectionResponse convertToListsUserResponse(ListUserProjection list) {
        return modelMapper.map(list, ListUserProjectionResponse.class);
    }

    private List<ListUserProjectionResponse> convertListUserToResponse(List<ListsUserProjection> lists) {
        return lists.stream()
                .map(listsProjection -> convertToListsUserResponse(listsProjection.getList()))
                .collect(Collectors.toList());
    }

    public List<ListProjectionResponse> getAllTweetLists() {
        return convertListToResponse(listsService.getAllTweetLists());
    }

    public List<ListUserProjectionResponse> getUserTweetLists() {
        return convertListUserToResponse(listsService.getUserTweetLists());
    }

    public List<ListProjectionResponse> getUserTweetListsById(Long userId) {
        return convertListToResponse(listsService.getUserTweetListsById(userId));
    }

    public List<ListProjectionResponse> getTweetListsWhichUserIn() {
        return convertListToResponse(listsService.getTweetListsWhichUserIn());
    }

    public List<PinnedListProjectionResponse> getUserPinnedLists() {
        return listsService.getUserPinnedLists().stream()
                .map(list -> modelMapper.map(list.getList(), PinnedListProjectionResponse.class))
                .collect(Collectors.toList());
    }

    public BaseListProjectionResponse getListById(Long listId) {
        return convertToBaseListsResponse(listsService.getListById(listId));
    }

    public ListUserProjectionResponse createTweetList(ListsRequest listsRequest) {
        return convertToListsUserResponse(listsService.createTweetList(convertToListsEntity(listsRequest)));
    }

    public BaseListProjectionResponse editTweetList(ListsRequest listsRequest) {
        return convertToBaseListsResponse(listsService.editTweetList(convertToListsEntity(listsRequest)));
    }

    public String deleteList(Long listId) {
        return listsService.deleteList(listId);
    }

    public Boolean followList(Long listId) {
        return listsService.followList(listId);
    }

    public Boolean pinList(Long listId) {
        return listsService.pinList(listId);
    }

    public List<Long> addUserToLists(UserToListsRequest userToListsRequest) {
        return listsService.addUserToLists(userToListsRequest.getUserId(),
                convertListsResponseToEntity(userToListsRequest.getLists()));
    }

    public Boolean addUserToList(Long userId, Long listId) {
        return listsService.addUserToList(userId, listId);
    }

    public TweetHeaderProjectionResponse getTweetsByListId(Long listId, Pageable pageable) {
        return tweetMapper.getTweetHeaderProjectionResponse(listsService.getTweetsByListId(listId, pageable));
    }

    public BaseListProjectionResponse getListDetails(Long listId) {
        return convertToBaseListsResponse(listsService.getListDetails(listId));
    }

    public List<?> getListMembers(Long listId, Long listOwnerId) {
        Map<String, Object> listMembers = listsService.getListMembers(listId, listOwnerId);

        if (listMembers.get("userMembers") != null) {
            List<ListsMemberProjection> userMembers = (List<ListsMemberProjection>) listMembers.get("userMembers");
            return userMembers.contains(null) ? new ArrayList<>() : userMembers.stream()
                    .map(list -> modelMapper.map(list.getMember(), ListMemberProjectionResponse.class))
                    .collect(Collectors.toList());
        } else {
            List<ListsOwnerMemberProjection> userMembers = (List<ListsOwnerMemberProjection>) listMembers.get("authUserMembers");

            if (userMembers.get(0).getMember() == null) {
                return new ArrayList<>();
            } else {
                List<ListsOwnerMemberProjectionResponse> members = new ArrayList<>();
                userMembers.forEach(listsMemberProjection -> {
                    ListsOwnerMemberProjectionResponse member = modelMapper.map(listsMemberProjection.getMember(), ListsOwnerMemberProjectionResponse.class);
                    member.setMemberInList(listsMemberProjection.getIsMemberInList());
                    members.add(member);
                });
                return members;
            }
        }
    }

    public List<ListsOwnerMemberProjectionResponse> searchListMembersByUsername(Long listId, String username) {
        List<Map<String, Object>> userMembers = listsService.searchListMembersByUsername(listId, username);
        return userMembers.stream()
                .map(userMemberMap -> {
                    ListsOwnerMemberProjectionResponse member = modelMapper.map(userMemberMap.get("member"), ListsOwnerMemberProjectionResponse.class);
                    member.setMemberInList((Boolean) userMemberMap.get("isMemberInList"));
                    return member;
                })
                .collect(Collectors.toList());
    }
}
