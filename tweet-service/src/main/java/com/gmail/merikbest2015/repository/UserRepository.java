package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.projection.TaggedUserProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT user FROM User user WHERE user.id IN :userIds")
    List<TaggedUserProjection> getTaggedImageUsers(@Param("userIds") List<Long> userIds);

    @Query("""
            SELECT CASE WHEN count(userMuted) > 0 THEN true ELSE false END FROM User user
            LEFT JOIN user.userMutedList userMuted
            WHERE user.id = :userId
            AND userMuted.id = :mutedUserId
            """)
    boolean isUserMuted(@Param("userId") Long userId, @Param("mutedUserId") Long mutedUserId);

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
