package com.gmail.merikbest2015.controller.api;

import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.request.IdsRequest;
import com.gmail.merikbest2015.dto.response.chat.ChatTweetUserResponse;
import com.gmail.merikbest2015.dto.response.chat.ChatUserParticipantResponse;
import com.gmail.merikbest2015.dto.response.user.CommonUserResponse;
import com.gmail.merikbest2015.dto.response.lists.ListMemberResponse;
import com.gmail.merikbest2015.dto.response.notification.NotificationUserResponse;
import com.gmail.merikbest2015.dto.response.tweet.TweetAdditionalInfoUserResponse;
import com.gmail.merikbest2015.dto.response.tweet.TweetAuthorResponse;
import com.gmail.merikbest2015.dto.response.user.TaggedUserResponse;
import com.gmail.merikbest2015.dto.response.user.UserChatResponse;
import com.gmail.merikbest2015.dto.response.user.UserResponse;
import com.gmail.merikbest2015.service.UserClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.gmail.merikbest2015.constants.PathConstants.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(API_V1_USER)
public class UserApiController {

    private final UserClientService userService;

    @GetMapping(FOLLOWERS_IDS)
    public List<Long> getUserFollowersIds() {
        return userService.getUserFollowersIds();
    }

    @GetMapping(SEARCH_USERNAME)
    public HeaderResponse<UserChatResponse> searchUsersByUsername(@PathVariable("username") String username,
                                                                  Pageable pageable) {
        return userService.searchUsersByUsername(username, pageable);
    }

    @GetMapping(SUBSCRIBERS_USER_ID)
    public List<Long> getSubscribersByUserId(@PathVariable("userId") Long userId) {
        return userService.getSubscribersByUserId(userId);
    }

    @GetMapping(IS_FOLLOWED_USER_ID)
    public Boolean isUserFollowByOtherUser(@PathVariable("userId") Long userId) {
        return userService.isUserFollowByOtherUser(userId);
    }

    @GetMapping(IS_PRIVATE_USER_ID)
    public Boolean isUserHavePrivateProfile(@PathVariable("userId") Long userId) {
        return userService.isUserHavePrivateProfile(userId);
    }

    @GetMapping(IS_BLOCKED_USER_ID)
    public Boolean isUserBlocked(@PathVariable("userId") Long userId, @PathVariable("blockedUserId") Long blockedUserId) {
        return userService.isUserBlocked(userId, blockedUserId);
    }

    @GetMapping(IS_USER_BLOCKED_USER_ID)
    public Boolean isUserBlockedByMyProfile(@PathVariable("userId") Long userId) {
        return userService.isUserBlockedByMyProfile(userId);
    }

    @GetMapping(IS_MY_PROFILE_BLOCKED_USER_ID)
    public Boolean isMyProfileBlockedByUser(@PathVariable("userId") Long userId) {
        return userService.isMyProfileBlockedByUser(userId);
    }

    @GetMapping(NOTIFICATION_USER_ID)
    public void increaseNotificationsCount(@PathVariable("userId") Long userId) {
        userService.increaseNotificationsCount(userId);
    }

    @GetMapping(MENTION_USER_ID)
    public void increaseMentionsCount(@PathVariable("userId") Long userId) {
        userService.increaseMentionsCount(userId);
    }

    @PutMapping(LIKE_COUNT)
    public void updateLikeCount(@PathVariable("increaseCount") boolean increaseCount) {
        userService.updateLikeCount(increaseCount);
    }

    @PutMapping(TWEET_COUNT)
    public void updateTweetCount(@PathVariable("increaseCount") boolean increaseCount) {
        userService.updateTweetCount(increaseCount);
    }

    @PutMapping(MEDIA_COUNT)
    public void updateMediaTweetCount(@PathVariable("increaseCount") boolean increaseCount) {
        userService.updateMediaTweetCount(increaseCount);
    }

    @GetMapping(LIST_OWNER_USER_ID)
    public CommonUserResponse getListOwnerById(@PathVariable("userId") Long userId) {
        return userService.getListOwnerById(userId);
    }

    @PostMapping(LIST_PARTICIPANTS)
    public List<ListMemberResponse> getListParticipantsByIds(@RequestBody IdsRequest request) {
        return userService.getListParticipantsByIds(request);
    }

    @GetMapping(LIST_PARTICIPANTS_USERNAME)
    public List<ListMemberResponse> searchListMembersByUsername(@PathVariable("username") String username) {
        return userService.searchListMembersByUsername(username);
    }

    @GetMapping(NOTIFICATION_USER_USER_ID)
    public NotificationUserResponse getNotificationUser(@PathVariable("userId") Long userId) {
        return userService.getNotificationUser(userId);
    }

    @GetMapping(TWEET_AUTHOR_USER_ID)
    public TweetAuthorResponse getTweetAuthor(@PathVariable("userId") Long userId) {
        return userService.getTweetAuthor(userId);
    }

    @GetMapping(TWEET_ADDITIONAL_INFO_USER_ID)
    public TweetAdditionalInfoUserResponse getTweetAdditionalInfoUser(@PathVariable("userId") Long userId) {
        return userService.getTweetAdditionalInfoUser(userId);
    }

    @PostMapping(IDS)
    public HeaderResponse<UserResponse> getUsersByIds(@RequestBody IdsRequest request,
                                                      @SpringQueryMap Pageable pageable) {
        return userService.getUsersByIds(request, pageable);
    }

    @PostMapping(TAGGED_IMAGE)
    public List<TaggedUserResponse> getTaggedImageUsers(@RequestBody IdsRequest request) {
        return userService.getTaggedImageUsers(request);
    }

    @PutMapping(TWEET_PINNED_TWEET_ID)
    public void updatePinnedTweetId(@PathVariable("tweetId") Long tweetId) {
        userService.updatePinnedTweetId(tweetId);
    }

    @GetMapping(TWEET_PINNED_USER_ID)
    public Long getUserPinnedTweetId(@PathVariable("userId") Long userId) {
        return userService.getUserPinnedTweetId(userId);
    }

    @PostMapping(TWEET_VALID_IDS)
    public List<Long> getValidTweetUserIds(@RequestBody IdsRequest request, @PathVariable("text") String text) {
        return userService.getValidTweetUserIds(request, text);
    }

    @PostMapping(VALID_IDS)
    public List<Long> getValidUserIds(@RequestBody IdsRequest request) {
        return userService.getValidUserIds(request);
    }

    @GetMapping(CHAT_PARTICIPANT_USER_ID)
    public ChatUserParticipantResponse getChatParticipant(@PathVariable("userId") Long userId) {
        return userService.getChatParticipant(userId);
    }

    @GetMapping(IS_EXISTS_USER_ID)
    public Boolean isUserExists(@PathVariable("userId") Long userId) {
        return userService.isUserExists(userId);
    }

    @GetMapping(USER_ID)
    public UserResponse getUserById(@PathVariable("userId") Long userId) {
        return userService.getUserResponseById(userId);
    }

    @GetMapping(USER_ID_USERNAME)
    public Long getUserIdByUsername(@PathVariable("username") String username) {
        return userService.getUserIdByUsername(username);
    }

    @GetMapping(CHAT_USER_ID)
    public ChatTweetUserResponse getChatTweetUser(@PathVariable("userId") Long userId) {
        return userService.getChatTweetUser(userId);
    }

    @PostMapping(CHAT_VALID_IDS)
    public List<Long> validateChatUsersIds(@RequestBody IdsRequest request) {
        return userService.validateChatUsersIds(request);
    }

    @GetMapping(SUBSCRIBERS)
    public List<NotificationUserResponse> getUsersWhichUserSubscribed() {
        return userService.getUsersWhichUserSubscribed();
    }

    @GetMapping(SUBSCRIBERS_IDS)
    public List<Long> getUserIdsWhichUserSubscribed() {
        return userService.getUserIdsWhichUserSubscribed();
    }

    @GetMapping(NOTIFICATION_RESET)
    public void resetNotificationCount() {
        userService.resetNotificationCount();
    }

    @GetMapping(MENTION_RESET)
    public void resetMentionCount() {
        userService.resetMentionCount();
    }
}
