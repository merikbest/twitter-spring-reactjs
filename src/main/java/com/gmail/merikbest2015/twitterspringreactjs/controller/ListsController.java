package com.gmail.merikbest2015.twitterspringreactjs.controller;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.ListsRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.UserToListsRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ListsResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.projection.lists.BaseListProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.projection.lists.ListProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.projection.lists.ListUserProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.projection.lists.PinnedListProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.mapper.ListsMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/lists")
public class ListsController {

    private final ListsMapper listsMapper;

    @GetMapping
    public ResponseEntity<List<ListProjectionResponse>> getAllTweetLists() {
        return ResponseEntity.ok(listsMapper.getAllTweetLists());
    }

    @GetMapping("/user")
    public ResponseEntity<List<ListUserProjectionResponse>> getUserTweetLists() {
        return ResponseEntity.ok(listsMapper.getUserTweetLists());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ListProjectionResponse>> getUserTweetListsById(@PathVariable Long userId) {
        return ResponseEntity.ok(listsMapper.getUserTweetListsById(userId));
    }

    @GetMapping("/user/consist")
    public ResponseEntity<List<ListProjectionResponse>> getTweetListsWhichUserIn() {
        return ResponseEntity.ok(listsMapper.getTweetListsWhichUserIn());
    }

    @GetMapping("/pined")
    public ResponseEntity<List<PinnedListProjectionResponse>> getUserPinnedLists() {
        return ResponseEntity.ok(listsMapper.getUserPinnedLists());
    }

    @GetMapping("/{listId}")
    public ResponseEntity<BaseListProjectionResponse> getListById(@PathVariable Long listId) {
        return ResponseEntity.ok(listsMapper.getListById(listId));
    }

    @PostMapping
    public ResponseEntity<ListUserProjectionResponse> createTweetList(@RequestBody ListsRequest listsRequest) {
        return ResponseEntity.ok(listsMapper.createTweetList(listsRequest));
    }

    @PutMapping
    public ResponseEntity<ListsResponse> editTweetList(@RequestBody ListsRequest listsRequest) {
        return ResponseEntity.ok(listsMapper.editTweetList(listsRequest));
    }

    @DeleteMapping("/{listId}")
    public ResponseEntity<String> deleteList(@PathVariable Long listId) {
        return ResponseEntity.ok(listsMapper.deleteList(listId));
    }

    @GetMapping("/follow/{listId}")
    public ResponseEntity<ListsResponse> followList(@PathVariable Long listId) {
        return ResponseEntity.ok(listsMapper.followList(listId));
    }

    @GetMapping("/pin/{listId}")
    public ResponseEntity<ListsResponse> pinList(@PathVariable Long listId) {
        return ResponseEntity.ok(listsMapper.pinList(listId));
    }

    @PostMapping("/add/user")
    public ResponseEntity<List<ListsResponse>> addUserToLists(@RequestBody UserToListsRequest userToListsRequest) {
        return ResponseEntity.ok(listsMapper.addUserToLists(userToListsRequest));
    }

    @GetMapping("/add/user/{userId}/{listId}")
    public ResponseEntity<ListsResponse> addUserToList(@PathVariable Long userId, @PathVariable Long listId) {
        return ResponseEntity.ok(listsMapper.addUserToList(userId, listId));
    }

    // TODO add Lists Details endpoint
    // TODO add Get tweets by list id endpoint
}
