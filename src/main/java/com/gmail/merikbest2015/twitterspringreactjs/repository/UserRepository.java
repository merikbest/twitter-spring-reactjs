package com.gmail.merikbest2015.twitterspringreactjs.repository;

import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.UserPrincipalProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.UserSubscribersProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByActiveTrueAndIdNot(Long id);

    @Query("SELECT user FROM User user WHERE user.email = :email")
    Optional<UserPrincipalProjection> findUserPrincipalByEmail(String email);

    Optional<User> findByEmail(String email);

    List<User> findByFullNameOrUsernameContainingIgnoreCase(
            @Param("fullName") String fullName,
            @Param("username") String username);

    Optional<User> findByActivationCode(String code);

    Optional<User> findByPasswordResetCode(String code);

    List<User> findTop5ByActiveTrue();

    List<User> findByUnreadMessages_Tweet(Tweet tweet);

    @Query("SELECT user FROM User user " +
            "LEFT JOIN user.followers follower " +
            "WHERE user.id = :userId " +
            "AND (user.privateProfile = false OR follower.id = :authUserId)")
    Optional<User> getValidUser(Long userId, Long authUserId);

    @Query("SELECT CASE WHEN count(user) > 0 THEN true ELSE false END FROM User user WHERE user.id = :userId")
    boolean isUserExist(Long userId);

    @Query("SELECT CASE WHEN count(blockedUser) > 0 THEN true ELSE false END FROM User user " +
            "LEFT JOIN user.userBlockedList blockedUser " +
            "WHERE user.id = :userId " +
            "AND blockedUser.id = :blockedUserId")
    boolean isUserBlocked(Long userId, Long blockedUserId);

    @Query("SELECT user.followers from User user WHERE user.id = :userId")
    List<User> getFollowersById(Long userId);

    @Query("SELECT user.following from User user WHERE user.id = :userId")
    List<User> getFollowingById(Long userId);

    @Query("SELECT user FROM User user WHERE user.id = :userId")
    Optional<UserSubscribersProjection> findUserSubscribersById(Long userId);
}
