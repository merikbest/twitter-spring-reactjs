package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.Lists;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.projection.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ListsRepository extends JpaRepository<Lists, Long> {

    @Query("SELECT list FROM Lists list WHERE list.id = :listId")
    <T> T getListById(@Param("listId") Long listId, Class<T> type);

    @Query("""
            SELECT list FROM Lists list
            WHERE list.id = :listId
            AND list.listOwner.id = :userId
            """)
    Optional<Lists> getListByIdAndUserId(@Param("listId") Long listId, @Param("userId") Long userId);

    @Query("""
            SELECT CASE WHEN count(list) > 0 THEN true ELSE false END FROM Lists list
            JOIN list.listsFollowers listsFollower
            WHERE list.id = :listId
            AND listsFollower.id = :userId
            """)
    boolean isListFollowed(@Param("listId") Long listId, @Param("userId") Long userId);

    @Query("""
            SELECT CASE WHEN count(list) > 0 THEN true ELSE false END FROM Lists list
            JOIN list.pinnedLists pinnedList
            WHERE list.id = :listId
            AND pinnedList.pinnedUser.id = :userId
            """)
    boolean isListPinned(@Param("listId") Long listId, @Param("userId") Long userId);

    @Query("""
            SELECT list FROM Lists list
            JOIN list.listOwner listOwner
            WHERE listOwner.id IN (
                SELECT user.id FROM User user
                LEFT JOIN user.following following
                WHERE user.privateProfile = false
                   OR (user.privateProfile = true AND (following.id = :userId OR user.id = :userId))
                   AND user.active = true
            )
            ORDER BY list.id
            """)
    List<ListProjection> getAllTweetLists(@Param("userId") Long userId);

    @Query("""
            SELECT list FROM Lists list
            LEFT JOIN list.listsFollowers listsFollower
            WHERE list.listOwner.id = :userId
            OR listsFollower.id = :userId
            ORDER BY list.id
            """)
    List<ListUserProjection> getUserTweetLists(@Param("userId") Long userId);

    @Query("""
            SELECT list FROM Lists list
            LEFT JOIN list.listsFollowers listsFollower
            WHERE list.id = :listId AND listsFollower.id = :userId
            OR list.id = :listId AND list.isPrivate = false
            OR list.id = :listId AND list.listOwner.id = :userId
            """)
    <T> Optional<T> getListById(@Param("listId") Long listId, @Param("userId") Long userId, Class<T> type);

    @Query("""
            SELECT list FROM Lists list
            WHERE list.id = :listId
            AND list.isPrivate = false
            """)
    Optional<Lists> getListByIdAndIsPrivateFalse(@Param("listId") Long listId);

    @Query("""
            SELECT list FROM Lists list
            LEFT JOIN list.listsMembers listsMember
            WHERE listsMember.id = :userId
            ORDER BY list.id
            """)
    List<ListProjection> getTweetListsWhichUserIn(@Param("userId") Long userId);

    @Query("""
            SELECT list FROM Lists list
            LEFT JOIN list.listsFollowers listsFollower
            WHERE list.id = :listId AND list.listOwner.id = :listOwnerId
            OR list.id = :listId AND listsFollower.id = :listOwnerId
            """)
    Optional<Lists> getListWhereUserConsist(@Param("listId") Long listId, @Param("listOwnerId") Long listOwnerId);

    @Query("""
            SELECT CASE WHEN count(list) > 0 THEN true ELSE false END FROM Lists list
            LEFT JOIN list.listsMembers listsMember
            WHERE list.id = :listId
            AND list.listOwner.id = :authUserId
            AND listsMember.id = :memberId
            """)
    boolean isListIncludeUser(@Param("listId") Long listId,
                              @Param("authUserId") Long authUserId,
                              @Param("memberId") Long memberId);

    @Query("""
            SELECT list FROM Lists list
            LEFT JOIN list.listsFollowers listsFollower
            WHERE list.id = :listId AND list.listOwner.id = :authUserId
            OR list.id = :listId AND list.isPrivate = false
            OR list.id = :listId AND list.isPrivate = true AND listsFollower.id = :authUserId
            """)
    Optional<Lists> getNotPrivateList(@Param("listId") Long listId, @Param("authUserId") Long authUserId);

    @Query("""
            SELECT lists FROM Lists lists
            WHERE lists.id = :listId AND lists.isPrivate = false
            OR lists.id = :listId AND lists.listOwner.id = :authUserId
            """)
    Optional<BaseListProjection> getListDetails(@Param("listId") Long listId, @Param("authUserId") Long authUserId);

    @Query("""
            SELECT CASE WHEN count(list) > 0 THEN true ELSE false END FROM Lists list
            LEFT JOIN list.listsFollowers listsFollower
            WHERE list.id = :listId AND list.listOwner.id = :listOwnerId
            OR list.id = :listId AND listsFollower.id = :listOwnerId
            """)
    boolean isListExist(@Param("listId") Long listId, @Param("listOwnerId") Long listOwnerId);

    @Query("""
            SELECT list.isPrivate FROM Lists list
            WHERE list.id = :listId
            AND list.listOwner.id <> :authUserId
            """)
    boolean isListPrivate(@Param("listId") Long listId, @Param("authUserId") Long authUserId);

    @Query("""
            SELECT listsFollower FROM Lists list
            JOIN list.listsFollowers listsFollower
            WHERE list.id = :listId
            """)
    List<User> getFollowersByListId(@Param("listId") Long listId);

    @Query("""
            SELECT listsMember FROM Lists list
            JOIN list.listsMembers listsMember
            WHERE list.id = :listId
            """)
    List<User> getMembersByListId(@Param("listId") Long listId);

    @Query("""
            SELECT COUNT(listsFollower) FROM Lists list
            JOIN list.listsFollowers listsFollower
            WHERE list.id = :listId
            """)
    Long getFollowersSize(@Param("listId") Long listId);

    @Query("""
            SELECT COUNT(listsMember) FROM Lists list
            JOIN list.listsMembers listsMember
            WHERE list.id = :listId
            """)
    Long getMembersSize(@Param("listId") Long listId);

    @Query("SELECT list FROM Lists list " +
            "LEFT JOIN list.pinnedLists pinnedList " +
            "WHERE pinnedList.pinnedUser.id = :userId " +
            "ORDER BY pinnedList.pinnedDate DESC")
    List<PinnedListProjection> getUserPinnedLists(@Param("userId") Long userId);

    @Query("""
            SELECT list FROM Lists list
            WHERE list.listOwner.id = :ownerId
            AND list.isPrivate = false
            ORDER BY list.id
            """)
    List<ListProjection> getUserTweetListsById(@Param("ownerId") Long ownerId);

    @Query("SELECT list FROM Lists list WHERE list.listOwner.id = :ownerId")
    List<SimpleListProjection> getUserOwnerLists(@Param("ownerId") Long ownerId);
}
