package com.gmail.merikbest2015.twitterspringreactjs.repository;

import com.gmail.merikbest2015.twitterspringreactjs.model.BackgroundColorType;
import com.gmail.merikbest2015.twitterspringreactjs.model.ColorSchemeType;
import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.UserPrincipalProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.user.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    List<UserProjection> findByActiveTrueAndIdNot(Long id);

    @Query("SELECT new com.gmail.merikbest2015.twitterspringreactjs.repository.projection.UserPrincipalProjection(user.id, user.email, user.password, user.activationCode) FROM User user WHERE user.email = :email")
    Optional<UserPrincipalProjection> findUserPrincipalByEmail(String email);

    @Query("SELECT user FROM User user WHERE user.id = :userId")
    AuthUserProjection findAuthUserById(Long userId);

    @Query("SELECT user FROM User user WHERE user.email = :email")
    Optional<AuthUserProjection> findAuthUserByEmail(String email);

    @Query("SELECT user FROM User user WHERE user.id = :userId")
    Optional<UserProfileProjection> getUserProfileById(Long userId);

    Optional<User> findByEmail(String email);

    @Query("SELECT u AS user FROM User u " +
            "WHERE UPPER(u.fullName) LIKE UPPER(CONCAT('%',:name,'%')) " +
            "OR UPPER(u.username) LIKE UPPER(CONCAT('%',:name,'%'))")
    List<UserListProjection> findByFullNameOrUsername(String name);

    List<User> findByFullNameOrUsernameContainingIgnoreCase(
            @Param("fullName") String fullName,
            @Param("username") String username);

    @Query("SELECT user FROM User user WHERE user.email = :email")
    Optional<UserCommonProjection> findCommonUserByEmail(String email);

    @Query("SELECT user FROM User user WHERE user.activationCode = :code")
    Optional<UserCommonProjection> findCommonUserByActivationCode(String code);

    Optional<AuthUserProjection> findByPasswordResetCode(String code);

    List<UserProjection> findTop5ByActiveTrue();

    List<User> findByUnreadMessages_Tweet(Tweet tweet);

    @Query("SELECT user FROM User user " +
            "LEFT JOIN user.followers follower " +
            "WHERE user.id = :userId " +
            "AND (user.privateProfile = false OR follower.id = :authUserId)")
    Optional<User> getValidUser(Long userId, Long authUserId);

    @Query("SELECT CASE WHEN count(user) > 0 THEN true ELSE false END FROM User user WHERE user.id = :userId")
    boolean isUserExist(Long userId);

    @Query("SELECT f.id as id, f.fullName as fullName, f.username as username, f.about as about, " +
            "f.privateProfile as isPrivateProfile, f.avatar.id as img_id, f.avatar.src as img_src " +
            "FROM User user " +
            "LEFT JOIN user.followers f " +
            "WHERE user.id = :userId")
    List<BaseUserProjection> getFollowersById(Long userId);

    @Query("SELECT f.id as id, f.fullName as fullName, f.username as username, f.about as about, " +
            "f.privateProfile as isPrivateProfile, f.avatar.id as img_id, f.avatar.src as img_src " +
            "FROM User user " +
            "LEFT JOIN user.following f " +
            "WHERE user.id = :userId")
    List<BaseUserProjection> getFollowingById(Long userId);

    @Query("SELECT b.id as id, b.fullName as fullName, b.username as username, " +
            "b.about as about, b.avatar as avatar, b.privateProfile as isPrivateProfile " +
            "FROM User user " +
            "LEFT JOIN user.userBlockedList b " +
            "WHERE user.id = :userId")
    List<BlockedUserProjection> getUserBlockListById(Long userId);

    @Query("SELECT m.id as id, m.fullName as fullName, m.username as username, " +
            "m.about as about, m.avatar as avatar, m.privateProfile as isPrivateProfile " +
            "FROM User user " +
            "LEFT JOIN user.userMutedList m " +
            "WHERE user.id = :userId")
    List<MutedUserProjection> getUserMuteListById(Long userId);

    @Query("SELECT followerRequest FROM User user " +
            "LEFT JOIN user.followerRequests followerRequest " +
            "WHERE user.id = :userId")
    List<FollowerUserProjection> getFollowerRequests(Long userId);

    @Query("SELECT user.userMutedList FROM User user WHERE user.id = :userId")
    List<User> getUserMutedListById(Long userId);

    @Query("SELECT notification.tweet.user as tweetAuthor FROM User user " +
            "LEFT JOIN user.notifications notification " +
            "LEFT JOIN notification.tweet.user.subscribers subscriber " +
            "WHERE user.id = :userId " +
            "AND notification.notificationType = 'TWEET' " +
            "AND subscriber.id = :userId ")
    List<TweetAuthorProjection> getNotificationsTweetAuthors(Long userId);

    @Query("SELECT CASE WHEN count(blockedUser) > 0 THEN true ELSE false END FROM User user " +
            "LEFT JOIN user.userBlockedList blockedUser " +
            "WHERE user.id = :userId " +
            "AND blockedUser.id = :blockedUserId")
    boolean isUserBlocked(Long userId, Long blockedUserId);

    @Query("SELECT CASE WHEN count(userMuted) > 0 THEN true ELSE false END FROM User user " +
            "LEFT JOIN user.userMutedList userMuted " +
            "WHERE user.id = :userId " +
            "AND userMuted.id = :mutedUserId")
    boolean isUserMuted(Long userId, Long mutedUserId);

    @Query("SELECT CASE WHEN count(follower) > 0 THEN true ELSE false END " +
            "FROM User user " +
            "LEFT JOIN user.followers follower " +
            "WHERE user.id = :authUserId " +
            "AND follower.id = :userId")
    boolean isUserFollowByOtherUser(Long authUserId, Long userId);

    @Query("SELECT CASE WHEN count(followerRequest) > 0 THEN true ELSE false END FROM User user " +
            "LEFT JOIN user.followerRequests followerRequest " +
            "WHERE user.id = :userId " +
            "AND followerRequest.id = :authUserId")
    boolean isMyProfileWaitingForApprove(Long userId, Long authUserId);

    @Query("SELECT CASE WHEN count(subscriber) > 0 THEN true ELSE false END FROM User user " +
            "LEFT JOIN user.subscribers subscriber " +
            "WHERE user.id = :userId " +
            "AND subscriber.id = :subscriberUserId")
    boolean isMyProfileSubscribed(Long userId, Long subscriberUserId);

    @Query("SELECT user FROM User user WHERE user.id = :userId")
    Optional<UserDetailProjection> getUserDetails(Long userId);

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
    <T> List<T> getSameFollowers(Long userId, Long authUserId, Class<T> type);

    @Modifying
    @Query("UPDATE User user SET user.email = :email WHERE user.id = :userId")
    void updateEmail(String email, Long userId);

    @Modifying
    @Query("UPDATE User user SET user.password = :password WHERE user.id = :userId")
    void updatePassword(String password, Long userId);

    @Modifying
    @Query("UPDATE User user SET user.passwordResetCode = :passwordResetCode WHERE user.id = :userId")
    void updatePasswordResetCode(String passwordResetCode, Long userId);

    @Modifying
    @Query("UPDATE User user SET user.active = true WHERE user.id = :userId")
    void updateActiveUserProfile(Long userId);

    @Modifying
    @Query("UPDATE User user SET user.profileStarted = true WHERE user.id = :userId")
    void updateProfileStarted(Long userId);

    @Modifying
    @Query("UPDATE User user SET user.activationCode = :activationCode WHERE user.id = :userId")
    void updateActivationCode(String activationCode, Long userId);

    @Modifying
    @Query("UPDATE User user SET user.username = :username WHERE user.id = :userId")
    void updateUsername(String username, Long userId);

    @Modifying
    @Query("UPDATE User user SET user.countryCode = :countryCode, user.phone = :phone WHERE user.id = :userId")
    void updatePhone(String countryCode, Long phone, Long userId);

    @Modifying
    @Query("UPDATE User user SET user.country = :country WHERE user.id = :userId")
    void updateCountry(String country, Long userId);

    @Modifying
    @Query("UPDATE User user SET user.gender = :gender WHERE user.id = :userId")
    void updateGender(String gender, Long userId);

    @Modifying
    @Query("UPDATE User user SET user.language = :language WHERE user.id = :userId")
    void updateLanguage(String language, Long userId);

    @Modifying
    @Query("UPDATE User user SET user.mutedDirectMessages = :mutedDirectMessages WHERE user.id = :userId")
    void updateDirectMessageRequests(boolean mutedDirectMessages, Long userId);

    @Modifying
    @Query("UPDATE User user SET user.privateProfile = :privateProfile WHERE user.id = :userId")
    void updatePrivateProfile(boolean privateProfile, Long userId);

    @Modifying
    @Query("UPDATE User user SET user.colorScheme = :colorSchemeType WHERE user.id = :userId")
    void updateColorScheme(ColorSchemeType colorSchemeType, Long userId);

    @Modifying
    @Query("UPDATE User user SET user.backgroundColor = :backgroundColorType WHERE user.id = :userId")
    void updateBackgroundColor(BackgroundColorType backgroundColorType, Long userId);
}
