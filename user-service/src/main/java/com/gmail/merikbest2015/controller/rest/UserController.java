package com.gmail.merikbest2015.controller.rest;

import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.request.SearchTermsRequest;
import com.gmail.merikbest2015.dto.response.user.CommonUserResponse;
import com.gmail.merikbest2015.dto.response.user.UserResponse;
import com.gmail.merikbest2015.dto.request.UserRequest;
import com.gmail.merikbest2015.dto.response.*;
import com.gmail.merikbest2015.mapper.AuthenticationMapper;
import com.gmail.merikbest2015.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.gmail.merikbest2015.constants.PathConstants.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(UI_V1_USER)
public class UserController {

    private final UserMapper userMapper;
    private final AuthenticationMapper authenticationMapper;

    @GetMapping(TOKEN)
    public ResponseEntity<AuthenticationResponse> getUserByToken() {
        return ResponseEntity.ok(authenticationMapper.getUserByToken());
    }

    @GetMapping(USER_ID)
    public ResponseEntity<UserProfileResponse> getUserById(@PathVariable("userId") Long userId) {
        return ResponseEntity.ok(userMapper.getUserById(userId));
    }

    @GetMapping(ALL)
    public ResponseEntity<List<UserResponse>> getUsers(@PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<UserResponse> response = userMapper.getUsers(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping(RELEVANT)
    public ResponseEntity<List<UserResponse>> getRelevantUsers() {
        return ResponseEntity.ok(userMapper.getRelevantUsers());
    }

    @GetMapping(SEARCH_USERNAME)
    public ResponseEntity<List<UserResponse>> searchUsersByUsername(@PathVariable("username") String username,
                                                                    @PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<UserResponse> response = userMapper.searchUsersByUsername(username, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping(SEARCH_TEXT)
    public ResponseEntity<SearchResultResponse> searchByText(@PathVariable("text") String text) {
        return ResponseEntity.ok(userMapper.searchByText(text));
    }

    @PostMapping(SEARCH_RESULTS)
    public ResponseEntity<List<CommonUserResponse>> getSearchResults(@RequestBody SearchTermsRequest request) {
        return ResponseEntity.ok(userMapper.getSearchResults(request));
    }

    @GetMapping(START)
    public ResponseEntity<Boolean> startUseTwitter() {
        return ResponseEntity.ok(userMapper.startUseTwitter());
    }

    @PutMapping
    public ResponseEntity<AuthUserResponse> updateUserProfile(@RequestBody UserRequest userRequest) {
        return ResponseEntity.ok(userMapper.updateUserProfile(userRequest));
    }

    @GetMapping(SUBSCRIBE_USER_ID)
    public ResponseEntity<Boolean> processSubscribeToNotifications(@PathVariable("userId") Long userId) {
        return ResponseEntity.ok(userMapper.processSubscribeToNotifications(userId));
    }

    @GetMapping(PIN_TWEET_ID)
    public ResponseEntity<Long> processPinTweet(@PathVariable("tweetId") Long tweetId) {
        return ResponseEntity.ok(userMapper.processPinTweet(tweetId));
    }

    @GetMapping(DETAILS_USER_ID)
    public ResponseEntity<UserDetailResponse> getUserDetails(@PathVariable("userId") Long userId) {
        return ResponseEntity.ok(userMapper.getUserDetails(userId));
    }
}
