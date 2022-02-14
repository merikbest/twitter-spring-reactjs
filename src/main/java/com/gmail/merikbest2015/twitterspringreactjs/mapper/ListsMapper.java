package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.ListsRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.UserToListsRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ListsResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.projection.lists.BaseListProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.projection.lists.ListProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.projection.lists.ListUserProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.projection.lists.PinnedListProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.model.Lists;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.lists.BaseListProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.lists.ListProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.lists.ListUserProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.lists.PinnedListProjection;
import com.gmail.merikbest2015.twitterspringreactjs.service.ListsService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
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

    private ListsResponse convertToListsResponse(Lists lists) {
        return modelMapper.map(lists, ListsResponse.class);
    }

    private List<ListsResponse> convertListToResponse(List<Lists> lists) {
        return lists.stream()
                .map(this::convertToListsResponse)
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

    public ListsResponse editTweetList(ListsRequest listsRequest) {
        return convertToListsResponse(listsService.editTweetList(convertToListsEntity(listsRequest)));
    }

    public String deleteList(Long listId) {
        return listsService.deleteList(listId);
    }

    public ListsResponse followList(Long listId) {
        return convertToListsResponse(listsService.followList(listId));
    }

    public ListsResponse pinList(Long listId) {
        return convertToListsResponse(listsService.pinList(listId));
    }

    public List<ListsResponse> addUserToLists(UserToListsRequest userToListsRequest) {
        return convertListToResponse(listsService.addUserToLists(
                userToListsRequest.getUserId(), convertListsResponseToEntity(userToListsRequest.getLists())));
    }

    public ListsResponse addUserToList(Long userId, Long listId) {
        return convertToListsResponse(listsService.addUserToList(userId, listId));
    }
}
