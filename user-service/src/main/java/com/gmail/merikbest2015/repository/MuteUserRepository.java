package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.projection.MutedUserProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MuteUserRepository extends JpaRepository<User, Long> {

    @Query(value = "SELECT *, users.full_name as fullName, users.private_profile as privateProfile FROM users " +
            "LEFT JOIN user_muted ON user_muted.muted_user_id = users.id " +
            "WHERE user_muted.user_id = :userId", nativeQuery = true)
    Page<MutedUserProjection> getUserMuteListById(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT CASE WHEN count(userMuted) > 0 THEN true ELSE false END FROM User user " +
            "LEFT JOIN user.userMutedList userMuted " +
            "WHERE user.id = :userId " +
            "AND userMuted.id = :mutedUserId")
    boolean isUserMuted(@Param("userId") Long userId, @Param("mutedUserId") Long mutedUserId);

    @Modifying
    @Query(value = "INSERT INTO user_muted (user_id, muted_user_id) VALUES (?1, ?2)", nativeQuery = true)
    void muteUser(@Param("authUserId") Long authUserId, @Param("userId") Long userId);

    @Modifying
    @Query(value = "DELETE FROM user_muted WHERE user_id = ?1 AND muted_user_id = ?2", nativeQuery = true)
    void unmuteUser(@Param("authUserId") Long authUserId, @Param("userId") Long userId);
}
