package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.commons.dto.HeaderResponse;
import com.gmail.merikbest2015.commons.dto.NotificationUserResponse;
import com.gmail.merikbest2015.commons.dto.UserResponse;
import com.gmail.merikbest2015.commons.dto.commons_new.*;
import com.gmail.merikbest2015.commons.models.User;
import com.gmail.merikbest2015.repository.projection.UserChatProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface UserClientService {

    Optional<User> getUserById(Long userId);

    List<User> getUsersByIds(UserIdsRequest request);

    List<Long> getUserFollowersIds();

    Page<UserChatProjection> searchUsersByUsername(String username, Pageable pageable);

    User getValidUser(Long userId, Long authUserId);

    User getAuthNotificationUser(Long authUserId);

    List<Long> getSubscribersByUserId(Long userId);

    Boolean isUserFollowByOtherUser(Long userId);

    Boolean isUserHavePrivateProfile(Long userId);

    Boolean isUserMutedByMyProfile(Long userId);

    Boolean isUserBlocked(Long userId, Long supposedBlockedUserId);

    Boolean isUserBlockedByMyProfile(Long userId);

    Boolean isMyProfileBlockedByUser(Long userId);

    Boolean isMyProfileWaitingForApprove(Long userId);

    void increaseNotificationsCount(Long userId);

    void updateLikeCount(boolean increase);

    void updateTweetCount(boolean increaseCount);

    void updateMediaTweetCount(boolean increaseCount);

    void saveUser(User user);
    // NEW
    ListOwnerResponse getListOwnerById(Long userId);

    List<ListMemberResponse> getListParticipantsByIds(UserIdsRequest request);

    List<ListMemberResponse> searchListMembersByUsername(String username);

    NotificationUserResponse getNotificationUser(Long userId);

    TweetAuthorResponse getTweetAuthor(Long userId);

    TweetAdditionalInfoUserResponse getTweetAdditionalInfoUser(Long userId);

    HeaderResponse<UserResponse> getTweetLikedUsersByIds(UserIdsRequest request, Pageable pageable);

    HeaderResponse<UserResponse> getRetweetedUsersByTweetId(UserIdsRequest request, Pageable pageable);

    void updatePinnedTweetId(Long tweetId);

    List<Long> getValidUserIds(UserIdsRequest request, String text);
}
