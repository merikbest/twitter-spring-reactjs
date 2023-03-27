package com.gmail.merikbest2015.controller.rest;

import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.response.user.UserResponse;
import com.gmail.merikbest2015.dto.response.FollowerUserResponse;
import com.gmail.merikbest2015.dto.response.UserProfileResponse;
import com.gmail.merikbest2015.mapper.FollowerUserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.gmail.merikbest2015.constants.PathConstants.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(UI_V1_USER)
public class FollowerUserController {

    private final FollowerUserMapper followerUserMapper;

    @GetMapping(FOLLOWERS_USER_ID)
    public ResponseEntity<List<UserResponse>> getFollowers(@PathVariable("userId") Long userId,
                                                           @PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<UserResponse> response = followerUserMapper.getFollowers(userId, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping(FOLLOWING_USER_ID)
    public ResponseEntity<List<UserResponse>> getFollowing(@PathVariable("userId") Long userId,
                                                           @PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<UserResponse> response = followerUserMapper.getFollowing(userId, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping(FOLLOWER_REQUESTS)
    public ResponseEntity<List<FollowerUserResponse>> getFollowerRequests(@PageableDefault(size = 10) Pageable pageable) {
        HeaderResponse<FollowerUserResponse> response = followerUserMapper.getFollowerRequests(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping(FOLLOW_USER_ID)
    public ResponseEntity<Boolean> processFollow(@PathVariable("userId") Long userId) {
        return ResponseEntity.ok(followerUserMapper.processFollow(userId));
    }

    @GetMapping(FOLLOW_OVERALL) // TODO add pagination
    public ResponseEntity<List<UserResponse>> overallFollowers(@PathVariable("userId") Long userId) {
        return ResponseEntity.ok(followerUserMapper.overallFollowers(userId));
    }

    @GetMapping(FOLLOW_PRIVATE)
    public ResponseEntity<UserProfileResponse> processFollowRequestToPrivateProfile(@PathVariable("userId") Long userId) {
        return ResponseEntity.ok(followerUserMapper.processFollowRequestToPrivateProfile(userId));
    }

    @GetMapping(FOLLOW_ACCEPT)
    public ResponseEntity<String> acceptFollowRequest(@PathVariable("userId") Long userId) {
        return ResponseEntity.ok(followerUserMapper.acceptFollowRequest(userId));
    }

    @GetMapping(FOLLOW_DECLINE)
    public ResponseEntity<String> declineFollowRequest(@PathVariable("userId") Long userId) {
        return ResponseEntity.ok(followerUserMapper.declineFollowRequest(userId));
    }
}
