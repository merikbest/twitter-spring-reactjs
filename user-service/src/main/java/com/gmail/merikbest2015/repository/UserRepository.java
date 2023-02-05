package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.enums.BackgroundColorType;
import com.gmail.merikbest2015.enums.ColorSchemeType;
import com.gmail.merikbest2015.model.User;
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

    @Query("SELECT user FROM User user WHERE user.email = :email")
    <T> Optional<T> getUserByEmail(@Param("email") String email, Class<T> type);

    @Query("SELECT user FROM User user WHERE user.id = :userId")
    <T> Optional<T> getUserById(@Param("userId") Long userId, Class<T> type);

    @Query("SELECT user FROM User user WHERE user.activationCode = :code")
    Optional<UserCommonProjection> getCommonUserByActivationCode(@Param("code") String code);

    @Query("SELECT user FROM User user WHERE user.passwordResetCode = :code")
    Optional<AuthUserProjection> getByPasswordResetCode(@Param("code") String code);

    @Query("SELECT user.password FROM User user WHERE user.id = :userId")
    String getUserPasswordById(@Param("userId") Long userId);

    @Modifying
    @Query("UPDATE User user SET user.passwordResetCode = :passwordResetCode WHERE user.id = :userId")
    void updatePasswordResetCode(@Param("passwordResetCode") String passwordResetCode, @Param("userId") Long userId);

    @Modifying
    @Query("UPDATE User user SET user.password = :password WHERE user.id = :userId")
    void updatePassword(@Param("password") String password, @Param("userId") Long userId);

    @Modifying
    @Query("UPDATE User user SET user.active = true WHERE user.id = :userId")
    void updateActiveUserProfile(@Param("userId") Long userId);

    @Modifying
    @Query("UPDATE User user SET user.activationCode = :activationCode WHERE user.id = :userId")
    void updateActivationCode(@Param("activationCode") String activationCode, @Param("userId") Long userId);

    Page<UserProjection> findByActiveTrueAndIdNot(Long id, Pageable pageable);

    List<UserProjection> findTop5ByActiveTrue();

    @Query("SELECT user FROM User user " +
            "WHERE UPPER(user.fullName) LIKE UPPER(CONCAT('%',:username,'%')) AND user.active = true " +
            "OR UPPER(user.username) LIKE UPPER(CONCAT('%',:username,'%')) AND user.active = true")
    <T> Page<T> searchUsersByUsername(@Param("username") String name, Pageable pageable, Class<T> type);

    @Modifying
    @Query("UPDATE User user SET user.profileStarted = true WHERE user.id = :userId")
    void updateProfileStarted(@Param("userId") Long userId);

    @Query("SELECT CASE WHEN count(user) > 0 THEN true ELSE false END FROM User user WHERE user.id = :userId")
    boolean isUserExist(@Param("userId") Long userId);

    @Query("SELECT user.privateProfile FROM User user WHERE user.id = :userId")
    boolean getUserPrivateProfile(@Param("userId") Long userId);

    @Query("SELECT follower.id FROM User user LEFT JOIN user.followers follower WHERE user.id = :userId")
    List<Long> getUserFollowersIds(@Param("userId") Long userId);

    @Query("SELECT user FROM User user " +
            "LEFT JOIN user.followers follower " +
            "WHERE follower.id = :userId")
    Page<UserProjection> getFollowersById(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT user FROM User user " +
            "LEFT JOIN user.following following " +
            "WHERE following.id = :userId")
    Page<UserProjection> getFollowingById(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT user FROM User user " +
            "LEFT JOIN user.followerRequests followerRequest " +
            "WHERE followerRequest.id = :userId")
    Page<FollowerUserProjection> getFollowerRequests(@Param("userId") Long userId, Pageable pageable);

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

    @Query(value = "SELECT users.id as id, users.full_name as fullName, users.username as username, users.about as about, " +
            "users.private_profile as isPrivateProfile, users.avatar as avatar " +
            "FROM users " +
            "WHERE users.id IN ( " +
            "   SELECT user_subscriptions.subscriber_id FROM users " +
            "   JOIN user_subscriptions ON users.id = user_subscriptions.user_id " +
            "   WHERE users.id = ?1) " +
            "INTERSECT " +
            "SELECT users.id as id, users.full_name as fullName, users.username as username, users.about as about, " +
            "users.private_profile as isPrivateProfile, users.avatar as avatar " +
            "FROM users " +
            "WHERE users.id IN ( " +
            "   SELECT user_subscriptions.subscriber_id FROM users " +
            "   JOIN user_subscriptions ON users.id = user_subscriptions.user_id " +
            "   WHERE users.id = ?2)", nativeQuery = true)
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

    @Query("SELECT user FROM User user WHERE user.id IN :userIds")
    List<ListMemberProjection> getUsersByIds(@Param("userIds") List<Long> userIds);

    @Query("SELECT user FROM User user " +
            "WHERE UPPER(user.fullName) LIKE UPPER(CONCAT('%',:username,'%')) AND user.active = true " +
            "OR UPPER(user.username) LIKE UPPER(CONCAT('%',:username,'%')) AND user.active = true")
    List<ListMemberProjection> searchListMembersByUsername(@Param("username") String username);

    @Query("SELECT user FROM User user WHERE user.id IN :userIds")
    Page<UserProjection> getTweetLikedUsersByIds(@Param("userIds") List<Long> userIds, Pageable pageable);

    @Query("SELECT user FROM User user WHERE user.id IN :userIds")
    Page<UserProjection> getRetweetedUsersByTweetId(@Param("userIds") List<Long> userIds, Pageable pageable);

    @Query("SELECT user.pinnedTweetId FROM User user WHERE user.id = :userId")
    Long getPinnedTweetId(@Param("userId") Long userId);

    @Modifying
    @Query("UPDATE User user SET user.pinnedTweetId = :tweetId WHERE user.id = :userId")
    void updatePinnedTweetId(@Param("tweetId") Long tweetId, @Param("userId") Long userId);

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
    List<Long> getValidUserIdsByName(@Param("username") String username, @Param("userIds") List<Long> userIds);

    @Query("SELECT CASE WHEN count(user) > 0 THEN true ELSE false END FROM User user WHERE user.id = :userId")
    boolean isUserExists(@Param("userId") Long userId);

    @Query("SELECT user.id FROM User user " +
            "LEFT JOIN user.userBlockedList blockedUser " +
            "WHERE user.id IN :userIds " +
            "AND blockedUser.id = :authUserId")
    List<Long> getUserIdsWhoBlockedMyProfile(@Param("userIds") List<Long> userIds, @Param("authUserId") Long authUserId);

    @Query("SELECT subscriber.id FROM User user " +
            "JOIN user.subscribers subscriber " +
            "WHERE user.id = :userId")
    List<Long> getSubscribersByUserId(@Param("userId") Long userId);

    @Query("SELECT user FROM User user " +
            "LEFT JOIN user.subscribers subscriber " +
            "WHERE subscriber.id = :userId")
    List<NotificationUserProjection> getUsersWhichUserSubscribed(@Param("userId") Long userId);

    @Query("SELECT user.id FROM User user " +
            "LEFT JOIN user.subscribers subscriber " +
            "WHERE subscriber.id = :userId")
    List<Long> getUserIdsWhichUserSubscribed(@Param("userId") Long userId);

    @Modifying
    @Query("UPDATE User user SET user.notificationsCount = 0 WHERE user.id = :userId")
    void resetNotificationCount(@Param("userId") Long userId);

    @Query("SELECT CASE WHEN count(user) > 0 THEN true ELSE false END FROM User user " +
            "LEFT JOIN user.followers follower " +
            "WHERE follower.id = :userId " +
            "AND user.id = :authUserId")
    boolean isFollower(@Param("authUserId") Long authUserId, @Param("userId") Long userId);

    @Modifying
    @Query(value = "INSERT INTO user_subscriptions (user_id, subscriber_id) VALUES (?1, ?2)", nativeQuery = true)
    void follow(@Param("authUserId") Long authUserId, @Param("userId") Long userId);

    @Modifying
    @Query(value = "DELETE FROM user_subscriptions WHERE user_id = ?1 AND subscriber_id = ?2", nativeQuery = true)
    void unfollow(@Param("authUserId") Long authUserId, @Param("userId") Long userId);

    @Query("SELECT CASE WHEN count(user) > 0 THEN true ELSE false END FROM User user " +
            "LEFT JOIN user.subscribers subscriber " +
            "WHERE user.id = :userId " +
            "AND subscriber.id = :authUserId")
    boolean isUserSubscribed(@Param("userId") Long userId, @Param("authUserId") Long authUserId);

    @Modifying
    @Query(value = "INSERT INTO subscribers (subscriber_id, user_id) VALUES (?1, ?2)", nativeQuery = true)
    void subscribe(@Param("authUserId") Long authUserId, @Param("userId") Long userId);

    @Modifying
    @Query(value = "DELETE FROM subscribers WHERE subscriber_id = ?1 AND user_id = ?2", nativeQuery = true)
    void unsubscribe(@Param("authUserId") Long authUserId, @Param("userId") Long userId);

    @Query("SELECT CASE WHEN count(user) > 0 THEN true ELSE false END FROM User user " +
            "LEFT JOIN user.followerRequests followerRequest " +
            "WHERE user.id = :userId " +
            "AND followerRequest.id = :authUserId")
    boolean isFollowerRequest(@Param("userId") Long userId, @Param("authUserId") Long authUserId);

    @Modifying
    @Query(value = "DELETE FROM user_follower_requests WHERE follower_id = ?1 AND user_id = ?2", nativeQuery = true)
    void removeFollowerRequest(@Param("authUserId") Long authUserId, @Param("userId") Long userId);

    @Modifying
    @Query(value = "INSERT INTO user_follower_requests (follower_id, user_id) " +
            "SELECT * FROM (SELECT ?1, ?2) AS tmp " +
            "WHERE NOT EXISTS ( " +
            "   SELECT follower_id FROM user_follower_requests WHERE follower_id = ?1 " +
            ") LIMIT 1", nativeQuery = true)
    void addFollowerRequest(@Param("authUserId") Long authUserId, @Param("userId") Long userId);

    @Query(value = "SELECT *, users.full_name as fullName, users.private_profile as privateProfile FROM users " +
            "LEFT JOIN user_blocked ON user_blocked.blocked_user_id = users.id " +
            "WHERE user_blocked.user_id = :userId", nativeQuery = true)
    Page<BlockedUserProjection> getUserBlockListById(@Param("userId") Long userId, Pageable pageable);

    @Modifying
    @Query(value = "INSERT INTO user_blocked (user_id, blocked_user_id) VALUES (?1, ?2)", nativeQuery = true)
    void blockUser(@Param("authUserId") Long authUserId, @Param("userId") Long userId);

    @Modifying
    @Query(value = "DELETE FROM user_blocked WHERE user_id = ?1 AND blocked_user_id = ?2", nativeQuery = true)
    void unblockUser(@Param("authUserId") Long authUserId, @Param("userId") Long userId);

    @Query(value = "SELECT *, users.full_name as fullName, users.private_profile as privateProfile FROM users " +
            "LEFT JOIN user_muted ON user_muted.muted_user_id = users.id " +
            "WHERE user_muted.user_id = :userId", nativeQuery = true)
    Page<MutedUserProjection> getUserMuteListById(@Param("userId") Long userId, Pageable pageable);

    @Modifying
    @Query(value = "INSERT INTO user_muted (user_id, muted_user_id) VALUES (?1, ?2)", nativeQuery = true)
    void muteUser(@Param("authUserId") Long authUserId, @Param("userId") Long userId);

    @Modifying
    @Query(value = "DELETE FROM user_muted WHERE user_id = ?1 AND muted_user_id = ?2", nativeQuery = true)
    void unmuteUser(@Param("authUserId") Long authUserId, @Param("userId") Long userId);
}
