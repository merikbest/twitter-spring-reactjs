package com.gmail.merikbest2015.twitterspringreactjs.controller;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.ListsRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.UserToListsRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ListsResponse;
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
    public ResponseEntity<List<ListsResponse>> getAllTweetLists() {
        return ResponseEntity.ok(listsMapper.getAllTweetLists());
    }

    @GetMapping("/user")
    public ResponseEntity<List<ListsResponse>> getUserTweetLists() {
        return ResponseEntity.ok(listsMapper.getUserTweetLists());
    }

    @GetMapping("/pined")
    public ResponseEntity<List<ListsResponse>> getUserPinnedLists() {
        return ResponseEntity.ok(listsMapper.getUserPinnedLists());
    }

    @GetMapping("/{listId}")
    public ResponseEntity<ListsResponse> getListById(@PathVariable Long listId) {
        return ResponseEntity.ok(listsMapper.getListById(listId));
    }

    @PostMapping
    public ResponseEntity<ListsResponse> createTweetList(@RequestBody ListsRequest listsRequest) {
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
}
