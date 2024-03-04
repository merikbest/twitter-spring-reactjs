package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.projection.UserProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT user FROM User user WHERE user.id = :userId")
    Optional<UserProjection> getUserById(@Param("userId") Long userId);

    @Query("""
            SELECT user FROM User user
            WHERE UPPER(user.fullName) LIKE UPPER(CONCAT('%',:username,'%')) AND user.active = true
            OR UPPER(user.username) LIKE UPPER(CONCAT('%',:username,'%')) AND user.active = true
            """)
    <T> Page<T> searchUsersByUsername(@Param("username") String name, Pageable pageable, Class<T> type);

    @Query("""
            SELECT user FROM User user
            LEFT JOIN user.userBlockedList blockedUser
            WHERE user.id IN :userIds
            AND blockedUser.id <> :authUserId
            """)
    List<User> getNotBlockedUsers(@Param("userIds") List<Long> userIds, @Param("authUserId") Long authUserId);

    @Query("""
            SELECT CASE WHEN count(blockedUser) > 0 THEN true ELSE false END FROM User user
            LEFT JOIN user.userBlockedList blockedUser
            WHERE user.id = :userId
            AND blockedUser.id = :blockedUserId
            """)
    boolean isUserBlocked(@Param("userId") Long userId, @Param("blockedUserId") Long blockedUserId);

    @Query("""
            SELECT CASE WHEN count(followerRequest) > 0 THEN true ELSE false END FROM User user
            LEFT JOIN user.followerRequests followerRequest
            WHERE user.id = :userId
            AND followerRequest.id = :authUserId
            """)
    boolean isMyProfileWaitingForApprove(@Param("userId") Long userId, @Param("authUserId") Long authUserId);

    @Query("""
            SELECT CASE WHEN count(follower) > 0 THEN true ELSE false END
            FROM User user
            LEFT JOIN user.followers follower
            WHERE user.id = :authUserId
            AND follower.id = :userId
            """)
    boolean isUserFollowByOtherUser(@Param("authUserId") Long authUserId, @Param("userId") Long userId);
}
