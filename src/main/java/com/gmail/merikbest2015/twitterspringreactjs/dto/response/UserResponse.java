package com.gmail.merikbest2015.twitterspringreactjs.dto.response;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.chat.ChatMessageResponse;
import com.gmail.merikbest2015.twitterspringreactjs.model.BackgroundColorType;
import com.gmail.merikbest2015.twitterspringreactjs.model.ColorSchemeType;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class UserResponse {
    private Long id;
    private String email;
    private String fullName;
    private String username;
    private String location;
    private String about;
    private String website;
    private String birthday;
    private String countryCode;
    private Long phone;
    private String country;
    private String gender;
    private String language;
    private LocalDateTime registrationDate;
    private Long tweetCount;
    private Long mediaTweetCount;
    private Long likeCount;
    private Long notificationsCount;
    private CommonTweetResponse pinnedTweet;
    private List<BookmarkResponse> bookmarks;
    private ImageResponse avatar;
    private ImageResponse wallpaper;
    private boolean mutedDirectMessages;
    private boolean privateProfile;
    private boolean profileCustomized;
    private boolean profileStarted;
    private BackgroundColorType BackgroundColor;
    private ColorSchemeType colorScheme;
    private List<ChatMessageResponse> unreadMessages;
    private List<BlockedUserResponse> userMutedList;
    private List<BlockedUserResponse> userBlockedList;
    private List<FollowerResponse> followers;
    private List<FollowerResponse> following;
    private List<FollowerResponse> subscribers;
}
