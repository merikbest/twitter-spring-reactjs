package com.gmail.merikbest2015.repository;

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

    @Query("SELECT user.activationCode FROM User user WHERE user.id = :userId")
    String getActivationCode(@Param("userId") Long userId);

    @Query("SELECT user FROM User user WHERE user.passwordResetCode = :code")
    Optional<AuthUserProjection> getByPasswordResetCode(@Param("code") String code);

    @Query("SELECT user.passwordResetCode FROM User user WHERE user.id = :userId")
    String getPasswordResetCode(@Param("userId") Long userId);

    @Query("SELECT user.password FROM User user WHERE user.id = :userId")
    String getUserPasswordById(@Param("userId") Long userId);

    @Query("SELECT user.id FROM User user WHERE UPPER(user.username) = UPPER(:username)")
    Long getUserIdByUsername(@Param("username") String username);

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

    @Query("SELECT user FROM User user " +
            "WHERE UPPER(user.fullName) LIKE UPPER(CONCAT('%',:text,'%')) AND user.active = true " +
            "OR UPPER(user.username) LIKE UPPER(CONCAT('%',:text,'%')) AND user.active = true ")
    List<CommonUserProjection> searchUserByText(@Param("text") String text);

    @Modifying
    @Query("UPDATE User user SET user.profileStarted = true WHERE user.id = :userId")
    void updateProfileStarted(@Param("userId") Long userId);

    @Query("SELECT CASE WHEN count(user) > 0 THEN true ELSE false END FROM User user WHERE user.id = :userId")
    boolean isUserExist(@Param("userId") Long userId);

    @Query("SELECT user.privateProfile FROM User user WHERE user.id = :userId")
    boolean getUserPrivateProfile(@Param("userId") Long userId);

    @Query("SELECT CASE WHEN count(user) > 0 THEN true ELSE false END FROM User user " +
            "LEFT JOIN user.following following " +
            "WHERE user.id = :userId AND user.privateProfile = false " +
            "OR user.id = :userId AND user.privateProfile = true AND following.id = :authUserId")
    boolean isUserHavePrivateProfile(@Param("userId") Long userId, @Param("authUserId") Long authUserId);

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

    @Modifying
    @Query("UPDATE User user SET user.notificationsCount = user.notificationsCount + 1 WHERE user.id = :userId")
    void increaseNotificationsCount(@Param("userId") Long userId);

    @Modifying
    @Query("UPDATE User user SET user.mentionsCount = user.mentionsCount + 1 WHERE user.id = :userId")
    void increaseMentionsCount(@Param("userId") Long userId);

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

    @Query("SELECT user FROM User user WHERE user.id IN :userIds")
    <T> List<T> getUsersByIds(@Param("userIds") List<Long> userIds, Class<T> type);

    @Query("SELECT user FROM User user " +
            "WHERE UPPER(user.fullName) LIKE UPPER(CONCAT('%',:username,'%')) AND user.active = true " +
            "OR UPPER(user.username) LIKE UPPER(CONCAT('%',:username,'%')) AND user.active = true")
    List<ListMemberProjection> searchListMembersByUsername(@Param("username") String username);

    @Query("SELECT user FROM User user WHERE user.id IN :userIds")
    Page<UserProjection> getUsersByIds(@Param("userIds") List<Long> userIds, Pageable pageable);

    @Query("SELECT user.pinnedTweetId FROM User user WHERE user.id = :userId")
    Long getPinnedTweetId(@Param("userId") Long userId);

    @Modifying
    @Query("UPDATE User user SET user.pinnedTweetId = :tweetId WHERE user.id = :userId")
    void updatePinnedTweetId(@Param("tweetId") Long tweetId, @Param("userId") Long userId);

    @Query("SELECT user.id FROM User user " +
            "LEFT JOIN user.following following " +
            "WHERE user.id IN :userIds " +
            "AND (user.privateProfile = false " +
            "   OR (user.privateProfile = true AND (following.id = :userId OR user.id = :userId)) " +
            "   AND user.active = true)")
    List<Long> getValidUserIdsByIds(@Param("userIds") List<Long> userIds, @Param("userId") Long userId);

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

    @Modifying
    @Query("UPDATE User user SET user.mentionsCount = 0 WHERE user.id = :userId")
    void resetMentionCount(@Param("userId") Long userId);

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

    @Query("SELECT user FROM User user WHERE user.id IN :userIds")
    List<TaggedUserProjection> getTaggedImageUsers(@Param("userIds") List<Long> userIds);
}
