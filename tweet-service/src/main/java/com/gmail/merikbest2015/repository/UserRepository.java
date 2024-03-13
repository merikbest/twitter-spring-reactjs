package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.projection.UserProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT user.id FROM User user WHERE UPPER(user.username) = UPPER(:username)")
    Long getUserIdByUsername(@Param("username") String username);

    @Query("SELECT CASE WHEN count(user) > 0 THEN true ELSE false END FROM User user WHERE user.id = :userId")
    boolean isUserExists(@Param("userId") Long userId);

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

    @Query("""
            SELECT CASE WHEN count(user) > 0 THEN true ELSE false END FROM User user
            LEFT JOIN user.following following
            WHERE user.id = :userId AND user.privateProfile = false
            OR user.id = :userId AND user.privateProfile = true AND following.id = :authUserId
            """)
    boolean isUserHavePrivateProfile(@Param("userId") Long userId, @Param("authUserId") Long authUserId);

    @Query("""
            SELECT user From User user
            WHERE user.id IN (
                SELECT likeTweet.user.id FROM LikeTweet likeTweet
                WHERE likeTweet.tweet = :tweet)
            """)
    Page<UserProjection> getLikedUsersByTweet(@Param("tweet") Tweet tweet, Pageable pageable);

    @Query("""
            SELECT user From User user
            WHERE user.id IN (
                SELECT retweet.user.id FROM Retweet retweet
                WHERE retweet.tweet = :tweet)
            """)
    Page<UserProjection> getRetweetedUsersByTweet(@Param("tweet") Tweet tweet, Pageable pageable);

    @Query("""
            SELECT user From User user
            WHERE user.id IN (
                SELECT tagged.id FROM Tweet tweet
                LEFT JOIN tweet.taggedImageUsers tagged
                WHERE tweet = :tweet)
            """)
    Page<UserProjection> getTaggedImageUsers(@Param("tweet") Tweet tweet, Pageable pageable);
}
