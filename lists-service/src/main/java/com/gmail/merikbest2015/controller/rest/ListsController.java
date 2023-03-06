package com.gmail.merikbest2015.controller.rest;

import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.dto.response.lists.ListMemberResponse;
import com.gmail.merikbest2015.dto.request.ListsRequest;
import com.gmail.merikbest2015.dto.request.UserToListsRequest;
import com.gmail.merikbest2015.dto.response.*;
import com.gmail.merikbest2015.mapper.ListsMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.gmail.merikbest2015.constants.PathConstants.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(UI_V1_LISTS)
public class ListsController {

    private final ListsMapper listsMapper;

    @GetMapping
    public ResponseEntity<List<ListResponse>> getAllTweetLists() {
        return ResponseEntity.ok(listsMapper.getAllTweetLists());
    }

    @GetMapping(USER)
    public ResponseEntity<List<ListUserResponse>> getUserTweetLists() {
        return ResponseEntity.ok(listsMapper.getUserTweetLists());
    }

    @GetMapping(USER_USER_ID)
    public ResponseEntity<List<ListResponse>> getUserTweetListsById(@PathVariable("userId") Long userId) {
        return ResponseEntity.ok(listsMapper.getUserTweetListsById(userId));
    }

    @GetMapping(USER_CONSIST)
    public ResponseEntity<List<ListResponse>> getTweetListsWhichUserIn() {
        return ResponseEntity.ok(listsMapper.getTweetListsWhichUserIn());
    }

    @GetMapping(PINED)
    public ResponseEntity<List<PinnedListResponse>> getUserPinnedLists() {
        return ResponseEntity.ok(listsMapper.getUserPinnedLists());
    }

    @GetMapping(LIST_ID)
    public ResponseEntity<BaseListResponse> getListById(@PathVariable("listId") Long listId) {
        return ResponseEntity.ok(listsMapper.getListById(listId));
    }

    @PostMapping
    public ResponseEntity<ListUserResponse> createTweetList(@RequestBody ListsRequest listsRequest) {
        return ResponseEntity.ok(listsMapper.createTweetList(listsRequest));
    }

    @PutMapping
    public ResponseEntity<BaseListResponse> editTweetList(@RequestBody ListsRequest listsRequest) {
        return ResponseEntity.ok(listsMapper.editTweetList(listsRequest));
    }

    @DeleteMapping(LIST_ID)
    public ResponseEntity<String> deleteList(@PathVariable("listId") Long listId) {
        return ResponseEntity.ok(listsMapper.deleteList(listId));
    }

    @GetMapping(FOLLOW_LIST_ID)
    public ResponseEntity<ListUserResponse> followList(@PathVariable("listId") Long listId) {
        return ResponseEntity.ok(listsMapper.followList(listId));
    }

    @GetMapping(PIN_LIST_ID)
    public ResponseEntity<PinnedListResponse> pinList(@PathVariable("listId") Long listId) {
        return ResponseEntity.ok(listsMapper.pinList(listId));
    }

    @GetMapping(ADD_USER_USER_ID)
    public ResponseEntity<List<SimpleListResponse>> getListsToAddUser(@PathVariable("userId") Long userId) {
        return ResponseEntity.ok(listsMapper.getListsToAddUser(userId));
    }

    @PostMapping(ADD_USER)
    public ResponseEntity<String> addUserToLists(@RequestBody UserToListsRequest userToListsRequest) {
        return ResponseEntity.ok(listsMapper.addUserToLists(userToListsRequest));
    }

    @GetMapping(ADD_USER_LIST_ID)
    public ResponseEntity<Boolean> addUserToList(@PathVariable("userId") Long userId, @PathVariable("listId") Long listId) {
        return ResponseEntity.ok(listsMapper.addUserToList(userId, listId));
    }

    @GetMapping(LIST_ID_TWEETS)
    public ResponseEntity<List<TweetResponse>> getTweetsByListId(@PathVariable("listId") Long listId,
                                                                 @PageableDefault(size = 10) Pageable pageable) {
        HeaderResponse<TweetResponse> response = listsMapper.getTweetsByListId(listId, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping(LIST_ID_DETAILS)
    public ResponseEntity<BaseListResponse> getListDetails(@PathVariable("listId") Long listId) {
        return ResponseEntity.ok(listsMapper.getListDetails(listId));
    }

    @GetMapping(LIST_ID_FOLLOWERS)
    public ResponseEntity<List<ListMemberResponse>> getListFollowers(@PathVariable("listId") Long listId,
                                                                     @PathVariable("listOwnerId") Long listOwnerId) {
        return ResponseEntity.ok(listsMapper.getListFollowers(listId, listOwnerId));
    }

    @GetMapping(LIST_ID_MEMBERS)
    public ResponseEntity<List<ListMemberResponse>> getListMembers(@PathVariable("listId") Long listId,
                                                                   @PathVariable("listOwnerId") Long listOwnerId) {
        return ResponseEntity.ok(listsMapper.getListMembers(listId, listOwnerId));
    }

    @GetMapping(SEARCH_LIST_ID)
    public ResponseEntity<List<ListMemberResponse>> searchListMembersByUsername(@PathVariable("listId") Long listId,
                                                                                @PathVariable("username") String username) {
        return ResponseEntity.ok(listsMapper.searchListMembersByUsername(listId, username));
    }
}
