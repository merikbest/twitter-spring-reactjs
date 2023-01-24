package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.commons.enums.BackgroundColorType;
import com.gmail.merikbest2015.commons.enums.ColorSchemeType;
import com.gmail.merikbest2015.commons.models.User;
import com.gmail.merikbest2015.commons.projection.UserProjection;
import com.gmail.merikbest2015.commons.projection.commons_new.ListOwnerProjection;
import com.gmail.merikbest2015.repository.projection.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<AuthUserProjection> findByPasswordResetCode(String code);

    List<User> findByIdIn(List<Long> ids);

    List<UserProjection> findTop5ByActiveTrue();

    Page<UserProjection> findByActiveTrueAndIdNot(Long id, Pageable pageable);

    @Query("SELECT user FROM User user WHERE user.id = :userId")
    Optional<AuthUserProjection> findAuthUserById(@Param("userId") Long userId);

    @Query("SELECT user FROM User user WHERE user.email = :email")
    <T> Optional<T> getAuthUserByEmail(@Param("email") String email, Class<T> type);

    @Query("SELECT user FROM User user WHERE user.id = :userId")
    Optional<UserProfileProjection> getUserProfileById(@Param("userId") Long userId);

    @Query("SELECT user.password FROM User user WHERE user.id = :userId")
    String getUserPasswordById(@Param("userId") Long userId);

    @Query("SELECT u.id AS id, u.fullName AS fullName, u.username AS username, u.about AS about, u.avatar AS avatar, " +
            "u.privateProfile AS privateProfile, u.mutedDirectMessages AS mutedDirectMessages " +
            "FROM User u " +
            "WHERE UPPER(u.fullName) LIKE UPPER(CONCAT('%',:name,'%')) AND u.active = true " +
            "OR UPPER(u.username) LIKE UPPER(CONCAT('%',:name,'%')) AND u.active = true")
    <T> Page<T> findByFullNameOrUsername(@Param("name") String name, Pageable pageable, Class<T> type);

    @Query("SELECT user FROM User user WHERE user.email = :email")
    Optional<UserCommonProjection> findCommonUserByEmail(@Param("email") String email);

    @Query("SELECT user FROM User user WHERE user.activationCode = :code")
    Optional<UserCommonProjection> findCommonUserByActivationCode(@Param("code") String code);

    @Query("SELECT user FROM User user " +
            "LEFT JOIN user.following following " +
            "WHERE user.id = :userId AND user.privateProfile = false " +
            "OR user.id = :userId AND following.id = :authUserId")
    Optional<NotificationUserProjection> getValidUser(@Param("userId") Long userId, @Param("authUserId") Long authUserId);

    @Query("SELECT user FROM User user WHERE user.id = :authUserId")
    AuthNotificationUserProjection getAuthNotificationUser(@Param("authUserId") Long authUserId);

    @Query("SELECT CASE WHEN count(user) > 0 THEN true ELSE false END FROM User user WHERE user.id = :userId")
    boolean isUserExist(@Param("userId") Long userId);

    @Query("SELECT follower.id FROM User user LEFT JOIN user.followers follower WHERE user.id = :userId")
    List<Long> getUserFollowersIds(@Param("userId") Long userId);

    @Query("SELECT f.id AS id, f.fullName AS fullName, f.username AS username, f.about AS about, f.avatar AS avatar, " +
            "f.privateProfile AS privateProfile, f.mutedDirectMessages AS mutedDirectMessages " +
            "FROM User user " +
            "LEFT JOIN user.followers f " +
            "WHERE user.id = :userId")
    Page<UserProjection> getFollowersById(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT f.id AS id, f.fullName AS fullName, f.username AS username, f.about AS about, f.avatar AS avatar, " +
            "f.privateProfile AS privateProfile, f.mutedDirectMessages AS mutedDirectMessages " +
            "FROM User user " +
            "LEFT JOIN user.following f " +
            "WHERE user.id = :userId")
    Page<UserProjection> getFollowingById(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT b.id AS id, b.fullName AS fullName, b.username AS username, b.about AS about, b.avatar AS avatar, " +
            "b.privateProfile AS isPrivateProfile " +
            "FROM User user " +
            "LEFT JOIN user.userBlockedList b " +
            "WHERE user.id = :userId")
    Page<BlockedUserProjection> getUserBlockListById(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT m.id as id, m.fullName as fullName, m.username as username, " +
            "m.about as about, m.avatar as avatar, m.privateProfile as isPrivateProfile " +
            "FROM User user " +
            "LEFT JOIN user.userMutedList m " +
            "WHERE user.id = :userId")
    Page<MutedUserProjection> getUserMuteListById(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT f.id AS id, f.fullName AS fullName, f.username AS username, f.about AS about, f.avatar AS avatar " +
            "FROM User user " +
            "LEFT JOIN user.followerRequests f " +
            "WHERE user.id = :userId")
    Page<FollowerUserProjection> getFollowerRequests(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT notification.tweet.user as tweetAuthor FROM User user " +
            "LEFT JOIN user.notifications notification " +
            "LEFT JOIN notification.tweet.user.subscribers subscriber " +
            "WHERE user.id = :userId " +
            "AND notification.notificationType = 'TWEET' " +
            "AND subscriber.id = :userId ")
    List<TweetAuthorsProjection> getNotificationsTweetAuthors(@Param("userId") Long userId);

    @Query("SELECT subscriber.id FROM User user " +
            "LEFT JOIN user.subscribers subscriber " +
            "WHERE user.id = :userId")
    List<Long> getSubscribersByUserId(@Param("userId") Long userId);

    @Query("SELECT CASE WHEN count(user) > 0 THEN true ELSE false END FROM User user " +
            "LEFT JOIN user.following following " +
            "WHERE user.id = :userId AND user.privateProfile = false " +
            "OR user.id = :userId AND user.privateProfile = true AND following.id = :authUserId")
    boolean isUserHavePrivateProfile(@Param("userId") Long userId, @Param("authUserId") Long authUserId);

    @Query("SELECT CASE WHEN count(blockedUser) > 0 THEN true ELSE false END FROM User user " +
            "LEFT JOIN user.userBlockedList blockedUser " +
            "WHERE user.id = :userId " +
            "AND blockedUser.id = :blockedUserId")
    boolean isUserBlocked(@Param("userId") Long userId, @Param("blockedUserId") Long blockedUserId);

    @Query("SELECT CASE WHEN count(userMuted) > 0 THEN true ELSE false END FROM User user " +
            "LEFT JOIN user.userMutedList userMuted " +
            "WHERE user.id = :userId " +
            "AND userMuted.id = :mutedUserId")
    boolean isUserMuted(@Param("userId") Long userId, @Param("mutedUserId") Long mutedUserId);

    @Query("SELECT CASE WHEN count(follower) > 0 THEN true ELSE false END " +
            "FROM User user " +
            "LEFT JOIN user.followers follower " +
            "WHERE user.id = :authUserId " +
            "AND follower.id = :userId")
    boolean isUserFollowByOtherUser(@Param("authUserId") Long authUserId, @Param("userId") Long userId);

    @Query("SELECT CASE WHEN count(followerRequest) > 0 THEN true ELSE false END FROM User user " +
            "LEFT JOIN user.followerRequests followerRequest " +
            "WHERE user.id = :userId " +
            "AND followerRequest.id = :authUserId")
    boolean isMyProfileWaitingForApprove(@Param("userId") Long userId, @Param("authUserId") Long authUserId);

    @Query("SELECT CASE WHEN count(subscriber) > 0 THEN true ELSE false END FROM User user " +
            "LEFT JOIN user.subscribers subscriber " +
            "WHERE user.id = :userId " +
            "AND subscriber.id = :subscriberUserId")
    boolean isMyProfileSubscribed(@Param("userId") Long userId, @Param("subscriberUserId") Long subscriberUserId);

    @Query("SELECT CASE WHEN count(participantUser) > 0 THEN true ELSE false END FROM User user " +
            "LEFT JOIN user.chats chats " +
            "LEFT JOIN chats.chat chat " +
            "LEFT JOIN chat.participants participant " +
            "LEFT JOIN participant.user participantUser " +
            "WHERE user.id = :authUserId " +
            "AND participantUser.id = :userId")
    boolean isUserChatParticipant(@Param("userId") Long userId, @Param("authUserId") Long authUserId);

    @Query("SELECT user FROM User user WHERE user.id = :userId")
    Optional<UserDetailProjection> getUserDetails(@Param("userId") Long userId);

    @Query(value = "SELECT users.id as id, users.full_name as fullName, users.username as username, users.about as about, " +
            "users.private_profile as isPrivateProfile, images.id as img_id, images.src as img_src " +
            "FROM users " +
            "LEFT JOIN user_avatar ON users.id = user_avatar.user_id " +
            "LEFT JOIN images ON user_avatar.avatar_id = images.id " +
            "WHERE users.id IN ( " +
            "SELECT user_subscriptions.subscriber_id FROM users " +
            "JOIN user_subscriptions ON users.id = user_subscriptions.user_id " +
            "WHERE users.id = ?1) " +
            "INTERSECT " +
            "SELECT users.id as id, users.full_name as fullName, users.username as username, users.about as about, " +
            "users.private_profile as isPrivateProfile, images.id as img_id, images.src as img_src " +
            "FROM users " +
            "LEFT JOIN user_avatar ON users.id = user_avatar.user_id " +
            "LEFT JOIN images ON user_avatar.avatar_id = images.id " +
            "WHERE users.id IN ( " +
            "SELECT user_subscriptions.subscriber_id FROM users " +
            "JOIN user_subscriptions ON users.id = user_subscriptions.user_id " +
            "WHERE users.id = ?2)", nativeQuery = true)
    <T> List<T> getSameFollowers(@Param("userId") Long userId, @Param("authUserId") Long authUserId, Class<T> type);

    @Modifying
    @Query("UPDATE User user SET user.notificationsCount = user.notificationsCount + 1 WHERE user.id = :userId")
    void increaseNotificationsCount(@Param("userId") Long userId);

    @Modifying
    @Query("UPDATE User user SET user.likeCount = " +
            "CASE WHEN :increaseCount = true THEN (user.likeCount + 1) " +
            "ELSE (user.likeCount - 1) END " +
            "WHERE user.id = :userId")
    void updateLikeCount(@Param("increaseCount") boolean increaseCount, @Param("userId") Long userId);

    @Modifying
    @Query("UPDATE User user SET user.tweetCount = " +
            "CASE WHEN :increaseCount = true THEN (user.tweetCount + 1) " +
            "ELSE (user.tweetCount - 1) END " +
            "WHERE user.id = :userId")
    void updateTweetCount(@Param("increaseCount") boolean increaseCount, @Param("userId") Long userId);

    @Modifying
    @Query("UPDATE User user SET user.mediaTweetCount = " +
            "CASE WHEN :increaseCount = true THEN (user.mediaTweetCount + 1) " +
            "ELSE (user.mediaTweetCount - 1) END " +
            "WHERE user.id = :userId")
    void updateMediaTweetCount(@Param("increaseCount") boolean increaseCount, @Param("userId") Long userId);

    @Modifying
    @Query("UPDATE User user SET user.email = :email WHERE user.id = :userId")
    void updateEmail(@Param("email") String email, @Param("userId") Long userId);

    @Modifying
    @Query("UPDATE User user SET user.password = :password WHERE user.id = :userId")
    void updatePassword(@Param("password") String password, @Param("userId") Long userId);

    @Modifying
    @Query("UPDATE User user SET user.passwordResetCode = :passwordResetCode WHERE user.id = :userId")
    void updatePasswordResetCode(@Param("passwordResetCode") String passwordResetCode, @Param("userId") Long userId);

    @Modifying
    @Query("UPDATE User user SET user.active = true WHERE user.id = :userId")
    void updateActiveUserProfile(@Param("userId") Long userId);

    @Modifying
    @Query("UPDATE User user SET user.profileStarted = true WHERE user.id = :userId")
    void updateProfileStarted(@Param("userId") Long userId);

    @Modifying
    @Query("UPDATE User user SET user.activationCode = :activationCode WHERE user.id = :userId")
    void updateActivationCode(@Param("activationCode") String activationCode, @Param("userId") Long userId);

    @Modifying
    @Query("UPDATE User user SET user.username = :username WHERE user.id = :userId")
    void updateUsername(@Param("username") String username, @Param("userId") Long userId);

    @Modifying
    @Query("UPDATE User user SET user.countryCode = :countryCode, user.phone = :phone WHERE user.id = :userId")
    void updatePhone(@Param("countryCode") String countryCode, @Param("phone") Long phone, @Param("userId") Long userId);

    @Modifying
    @Query("UPDATE User user SET user.country = :country WHERE user.id = :userId")
    void updateCountry(@Param("country") String country, @Param("userId") Long userId);

    @Modifying
    @Query("UPDATE User user SET user.gender = :gender WHERE user.id = :userId")
    void updateGender(@Param("gender") String gender, @Param("userId") Long userId);

    @Modifying
    @Query("UPDATE User user SET user.language = :language WHERE user.id = :userId")
    void updateLanguage(@Param("language") String language, @Param("userId") Long userId);

    @Modifying
    @Query("UPDATE User user SET user.mutedDirectMessages = :mutedDirectMessages WHERE user.id = :userId")
    void updateDirectMessageRequests(@Param("mutedDirectMessages") boolean mutedDirectMessages, @Param("userId") Long userId);

    @Modifying
    @Query("UPDATE User user SET user.privateProfile = :privateProfile WHERE user.id = :userId")
    void updatePrivateProfile(@Param("privateProfile") boolean privateProfile, @Param("userId") Long userId);

    @Modifying
    @Query("UPDATE User user SET user.colorScheme = :colorSchemeType WHERE user.id = :userId")
    void updateColorScheme(@Param("colorSchemeType") ColorSchemeType colorSchemeType, @Param("userId") Long userId);

    @Modifying
    @Query("UPDATE User user SET user.backgroundColor = :backgroundColor WHERE user.id = :userId")
    void updateBackgroundColor(@Param("backgroundColor") BackgroundColorType backgroundColorType, @Param("userId") Long userId);

    // NEW
    @Query("SELECT user FROM User user WHERE user.id = :userId")
    ListOwnerProjection getListOwnerById(@Param("userId") Long userId);

    @Query("SELECT user FROM User user WHERE user.id IN :userIds")
    List<ListMemberProjection> getUsersByIds(@Param("userIds") List<Long> userIds);

    @Query("SELECT user FROM User user " +
            "WHERE UPPER(user.fullName) LIKE UPPER(CONCAT('%',:username,'%')) AND user.active = true " +
            "OR UPPER(user.username) LIKE UPPER(CONCAT('%',:username,'%')) AND user.active = true")
    List<ListMemberProjection> searchListMembersByUsername(@Param("username") String username);

    @Query("SELECT user FROM User user WHERE user.id = :userId")
    NotificationUserProjection getNotificationUser(@Param("userId") Long userId);

    @Query("SELECT user FROM User user WHERE user.id = :userId")
    TweetAuthorProjection getTweetAuthor(@Param("userId") Long userId);

    @Query("SELECT user FROM User user WHERE user.id = :userId")
    TweetAdditionalInfoUserProjection getTweetAdditionalInfoUser(@Param("userId") Long userId);

    @Query("SELECT user FROM User user WHERE user.id IN :userIds")
    Page<UserProjection> getTweetLikedUsersByIds(@Param("userIds") List<Long> userIds, Pageable pageable);

    @Query("SELECT user FROM User user WHERE user.id IN :userIds")
    Page<UserProjection> getRetweetedUsersByTweetId(@Param("userIds") List<Long> userIds, Pageable pageable);

    @Query("SELECT user.pinnedTweetId FROM User user WHERE user.id = :userId")
    Long getPinnedTweetId(@Param("userId") Long userId);

    @Modifying
    @Query("UPDATE User user SET user.pinnedTweetId = :pinnedTweetId WHERE user.id = :userId")
    void updatePinnedTweetId(@Param("pinnedTweetId") Long pinnedTweetId, @Param("userId") Long userId);

    @Query("SELECT user.id FROM User user " +
            "LEFT JOIN user.following following " +
            "WHERE user.id IN :userIds " +
            "AND (user.privateProfile = false OR (user.privateProfile = true AND following.id IN :userIds) " +
            "   AND user.active = true)")
    List<Long> getValidUserIdsByIds(@Param("userIds") List<Long> userIds);

    @Query("SELECT user.id FROM User user " +
            "LEFT JOIN user.following following " +
            "WHERE (UPPER(user.fullName) LIKE UPPER(CONCAT('%',:username,'%')) " +
            "   AND (user.privateProfile = false OR (user.privateProfile = true AND following.id IN :userIds) " +
            "       AND user.active = true)) " +
            "OR (UPPER(user.username) LIKE UPPER(CONCAT('%',:username,'%')) " +
            "   AND (user.privateProfile = false OR (user.privateProfile = true AND following.id IN :userIds) " +
            "       AND user.active = true))")
    List<Long> getValidUserIdsByName(@Param("username") String username);
}
