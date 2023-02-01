package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.dto.notification.NotificationUserResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface UserClientService {

//    Optional<User> getUserById(Long userId);
//
//    List<User> getUsersByIds(UserIdsRequest request);
//
//    List<Long> getUserFollowersIds();
//
//    HeaderResponse<UserChatResponse> searchUsersByUsername(String username, Pageable pageable);
//
//    User getValidUser(Long userId, Long authUserId);
//
//    User getAuthNotificationUser(Long authUserId);
//
//    List<Long> getSubscribersByUserId(Long userId);
//
//    Boolean isUserFollowByOtherUser(Long userId);
//
//    Boolean isUserHavePrivateProfile(Long userId);
//
//    Boolean isUserMutedByMyProfile(Long userId);
//
//    Boolean isUserBlocked(Long userId, Long supposedBlockedUserId);
//
//    Boolean isUserBlockedByMyProfile(Long userId);
//
//    Boolean isMyProfileBlockedByUser(Long userId);
//
//    Boolean isMyProfileWaitingForApprove(Long userId);
//
//    void increaseNotificationsCount(Long userId);
//
//    void updateLikeCount(boolean increase);
//
//    void updateTweetCount(boolean increaseCount);
//
//    void updateMediaTweetCount(boolean increaseCount);
//
//    void saveUser(User user);
//    // NEW
//    ListOwnerResponse getListOwnerById(Long userId);
//
//    List<ListMemberResponse> getListParticipantsByIds(UserIdsRequest request);
//
//    List<ListMemberResponse> searchListMembersByUsername(String username);

    NotificationUserResponse getNotificationUser(Long userId);

//    TweetAuthorResponse getTweetAuthor(Long userId);
//
//    TweetAdditionalInfoUserResponse getTweetAdditionalInfoUser(Long userId);
//
//    HeaderResponse<UserResponse> getTweetLikedUsersByIds(UserIdsRequest request, Pageable pageable);
//
//    HeaderResponse<UserResponse> getRetweetedUsersByTweetId(UserIdsRequest request, Pageable pageable);
//
//    void updatePinnedTweetId(Long tweetId);
//
//    List<Long> getValidUserIds(UserIdsRequest request, String text);
//
//    ChatUserParticipantResponse getChatParticipant(Long userId);
//
//    Boolean isUserExists(Long userId);
//
//    UserResponse getUserResponseById(Long userId);
//
//    ChatTweetUserResponse getChatTweetUser(Long userId);
//
//    List<Long> validateChatUsersIds(UserIdsRequest request);

    // NEW
    List<NotificationUserResponse> getUsersWhichUserSubscribed();

    List<Long> getUserIdsWhichUserSubscribed();

    void resetNotificationCount();
}
