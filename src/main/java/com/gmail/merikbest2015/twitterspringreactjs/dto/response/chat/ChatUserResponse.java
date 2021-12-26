package com.gmail.merikbest2015.twitterspringreactjs.dto.response.chat;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.BlockedUserResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.FollowerResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ImageResponse;
import lombok.Data;

import java.util.List;

@Data
public class ChatUserResponse {
    private Long id;
    private String email;
    private String fullName;
    private String username;
    private String about;
    private ImageResponse avatar;
    private boolean privateProfile;
    private List<BlockedUserResponse> userBlockedList;
    private List<FollowerResponse> followers;
    private List<FollowerResponse> following;
    private List<FollowerResponse> followerRequests;
}
