package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.dto.*;
import com.gmail.merikbest2015.dto.lists.ListMemberResponse;
import com.gmail.merikbest2015.dto.lists.ListOwnerResponse;
import com.gmail.merikbest2015.dto.notification.NotificationUserResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserClientService {

    List<Long> getUserFollowersIds();

    HeaderResponse<UserChatResponse> searchUsersByUsername(String username, Pageable pageable);

    List<Long> getSubscribersByUserId(Long userId);

    Boolean isUserFollowByOtherUser(Long userId);

    Boolean isUserHavePrivateProfile(Long userId);

    Boolean isUserBlocked(Long userId, Long blockedUserId);

    Boolean isUserBlockedByMyProfile(Long userId);

    Boolean isMyProfileBlockedByUser(Long userId);

    void increaseNotificationsCount(Long userId);

    void updateLikeCount(boolean increase);

    void updateTweetCount(boolean increaseCount);

    void updateMediaTweetCount(boolean increaseCount);

    ListOwnerResponse getListOwnerById(Long userId);

    List<ListMemberResponse> getListParticipantsByIds(IdsRequest request);

    List<ListMemberResponse> searchListMembersByUsername(String username);

    NotificationUserResponse getNotificationUser(Long userId);

    TweetAuthorResponse getTweetAuthor(Long userId);

    TweetAdditionalInfoUserResponse getTweetAdditionalInfoUser(Long userId);

    HeaderResponse<UserResponse> getTweetLikedUsersByIds(IdsRequest request, Pageable pageable);

    HeaderResponse<UserResponse> getRetweetedUsersByTweetId(IdsRequest request, Pageable pageable);

    void updatePinnedTweetId(Long tweetId);

    List<Long> getValidUserIds(IdsRequest request, String text);

    ChatUserParticipantResponse getChatParticipant(Long userId);

    Boolean isUserExists(Long userId);

    UserResponse getUserResponseById(Long userId);

    ChatTweetUserResponse getChatTweetUser(Long userId);

    List<Long> validateChatUsersIds(IdsRequest request);

    List<NotificationUserResponse> getUsersWhichUserSubscribed();

    List<Long> getUserIdsWhichUserSubscribed();

    void resetNotificationCount();
}
