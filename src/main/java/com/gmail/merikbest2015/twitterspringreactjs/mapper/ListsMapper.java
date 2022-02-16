package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.ListsRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.UserToListsRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ListsResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.projection.TweetProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.projection.lists.*;
import com.gmail.merikbest2015.twitterspringreactjs.model.Lists;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.TweetProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.lists.*;
import com.gmail.merikbest2015.twitterspringreactjs.service.ListsService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ListsMapper {

    private final ModelMapper modelMapper;
    private final ListsService listsService;

    private Lists convertToListsEntity(ListsRequest listsRequest) {
        return modelMapper.map(listsRequest, Lists.class);
    }

    private List<Lists> convertListsResponseToEntity(List<ListsResponse> listsResponse) {
        return listsResponse.stream()
                .map(list -> modelMapper.map(list, Lists.class))
                .collect(Collectors.toList());
    }

    public List<ListProjectionResponse> getAllTweetLists() {
        List<ListProjection> lists = listsService.getAllTweetLists();
        return lists.contains(null) ? new ArrayList<>() : lists.stream()
                .map(list -> modelMapper.map(list, ListProjectionResponse.class))
                .collect(Collectors.toList());
    }

    public List<ListUserProjectionResponse> getUserTweetLists() {
        List<ListUserProjection> lists = listsService.getUserTweetLists();
        return lists.contains(null) ? new ArrayList<>() : lists.stream()
                .map(list -> modelMapper.map(list, ListUserProjectionResponse.class))
                .collect(Collectors.toList());
    }

    public List<ListProjectionResponse> getUserTweetListsById(Long userId) {
        List<ListProjection> lists = listsService.getUserTweetListsById(userId);
        return lists.contains(null) ? new ArrayList<>() : lists.stream()
                .map(list -> modelMapper.map(list, ListProjectionResponse.class))
                .collect(Collectors.toList());
    }

    public List<ListProjectionResponse> getTweetListsWhichUserIn() {
        List<ListProjection> lists = listsService.getTweetListsWhichUserIn();
        return lists.contains(null) ? new ArrayList<>() : lists.stream()
                .map(list -> modelMapper.map(list, ListProjectionResponse.class))
                .collect(Collectors.toList());
    }

    public List<PinnedListProjectionResponse> getUserPinnedLists() {
        List<PinnedListProjection> lists = listsService.getUserPinnedLists();
        return lists.contains(null) ? new ArrayList<>() : lists.stream()
                .map(list -> modelMapper.map(list, PinnedListProjectionResponse.class))
                .collect(Collectors.toList());
    }

    public BaseListProjectionResponse getListById(Long listId) {
        BaseListProjection list = listsService.getListById(listId);
        return modelMapper.map(list, BaseListProjectionResponse.class);
    }

    public ListUserProjectionResponse createTweetList(ListsRequest listsRequest) {
        ListUserProjection list = listsService.createTweetList(convertToListsEntity(listsRequest));
        return modelMapper.map(list, ListUserProjectionResponse.class);
    }

    public BaseListProjectionResponse editTweetList(ListsRequest listsRequest) {
        BaseListProjection list = listsService.editTweetList(convertToListsEntity(listsRequest));
        return modelMapper.map(list, BaseListProjectionResponse.class);
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

    public List<TweetProjectionResponse> getTweetsByListId(Long listId) {
        List<TweetProjection> tweets = listsService.getTweetsByListId(listId);
        return tweets.stream()
                .map(tweet -> modelMapper.map(tweet, TweetProjectionResponse.class))
                .collect(Collectors.toList());
    }

    public BaseListProjectionResponse getListDetails(Long listId) {
        BaseListProjection list = listsService.getListDetails(listId);
        return modelMapper.map(list, BaseListProjectionResponse.class);
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
                return getListsOwnerMemberProjectionResponses(userMembers);
            }
        }
    }

    public List<ListsOwnerMemberProjectionResponse> searchListMembersByUsername(Long listId, String username) {
        List<ListsOwnerMemberProjection> userMembers = listsService.searchListMembersByUsername(listId, username);

        if (userMembers.get(0).getMember() == null) {
            return new ArrayList<>();
        } else {
            return getListsOwnerMemberProjectionResponses(userMembers);
        }
    }

    private List<ListsOwnerMemberProjectionResponse> getListsOwnerMemberProjectionResponses(List<ListsOwnerMemberProjection> userMembers) {
        List<ListsOwnerMemberProjectionResponse> members = new ArrayList<>();
        userMembers.forEach(listsMemberProjection -> {
            ListsOwnerMemberProjectionResponse member = modelMapper.map(listsMemberProjection.getMember(), ListsOwnerMemberProjectionResponse.class);
            member.setMemberInList(listsMemberProjection.getIsMemberInList());
            members.add(member);
        });
        return members;
    }
}
