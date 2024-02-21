package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.projection.BlockedUserProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BlockUserRepository extends JpaRepository<User, Long> {

    @Query(value = "SELECT *, users.full_name as fullName, users.private_profile as privateProfile FROM users " +
            "LEFT JOIN user_blocked ON user_blocked.blocked_user_id = users.id " +
            "WHERE user_blocked.user_id = :userId", nativeQuery = true)
    Page<BlockedUserProjection> getUserBlockListById(@Param("userId") Long userId, Pageable pageable);

    @Query("""
            SELECT CASE WHEN count(blockedUser) > 0 THEN true ELSE false END FROM User user
            LEFT JOIN user.userBlockedList blockedUser
            WHERE user = :user
            AND blockedUser = :blockedUser
            """)
    boolean isUserBlocked(@Param("user") User user, @Param("blockedUser") User blockedUser);

    @Query("SELECT CASE WHEN count(blockedUser) > 0 THEN true ELSE false END FROM User user " +
            "LEFT JOIN user.userBlockedList blockedUser " +
            "WHERE user.id = :userId " +
            "AND blockedUser.id = :blockedUserId")
    boolean isUserBlocked(@Param("userId") Long userId, @Param("blockedUserId") Long blockedUserId);

    @Modifying
    @Query(value = "INSERT INTO user_blocked (user_id, blocked_user_id) VALUES (?1, ?2)", nativeQuery = true)
    void blockUser(@Param("authUserId") Long authUserId, @Param("userId") Long userId);

    @Modifying
    @Query(value = "DELETE FROM user_blocked WHERE user_id = ?1 AND blocked_user_id = ?2", nativeQuery = true)
    void unblockUser(@Param("authUserId") Long authUserId, @Param("userId") Long userId);
}
