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
    String COMMON_LISTS_EXPRESSION = "list.id as id, list.listName as listName, list.description as description, " +
            "list.altWallpaper as altWallpaper, list.wallpaper as wallpaper, list.listOwner.id as listOwnerId";
    String LISTS_EXPRESSION = COMMON_LISTS_EXPRESSION + ", list.isPrivate as isPrivate";

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
            """)
    List<ListProjection> getAllTweetLists(@Param("userId") Long userId);

    @Query("""
            SELECT list FROM Lists list
            LEFT JOIN list.listsFollowers listsFollower
            WHERE list.listOwner.id = :userId
            OR listsFollower.id = :userId
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

    @Query("SELECT list FROM Lists list WHERE list.listOwner.id IN :listOwnerIds")
    List<ListProjection> getAllTweetLists(@Param("listOwnerIds") List<Long> listOwnerIds);

    @Query("SELECT DISTINCT list.listOwner.id FROM Lists list")
    List<Long> getListOwnerIds();

    @Query("SELECT " + COMMON_LISTS_EXPRESSION + " FROM Lists list " +
            "WHERE list.id IN (" +
            "   SELECT listsMembers.listId FROM ListsMembers listsMembers " +
            "   WHERE listsMembers.memberId = :userId)")
    List<ListProjection> getTweetListsByIds(@Param("userId") Long userId);

//    @Query("SELECT " + LISTS_EXPRESSION + " FROM Lists list " +
//            "WHERE list.listOwner.id = :userId " +
//            "OR list.id IN (" +
//            "   SELECT listFollower.listId FROM ListsFollowers listFollower " +
//            "   WHERE listFollower.followerId = :userId)")
//    List<ListUserProjection> getUserTweetLists(@Param("userId") Long userId);

    @Query("SELECT list FROM Lists list " +
            "LEFT JOIN list.pinnedLists pinnedList " +
            "WHERE pinnedList.pinnedUser.id = :userId " +
            "ORDER BY pinnedList.pinnedDate DESC")
    List<PinnedListProjection> getUserPinnedLists(@Param("userId") Long userId);

//    @Query("SELECT " + LISTS_EXPRESSION + " FROM Lists list " +
//            "WHERE list.id = :listId AND list.id IN (" +
//            "   SELECT listFollower.listId FROM ListsFollowers listFollower " +
//            "   WHERE listFollower.followerId = :userId) " +
//            "OR list.id = :listId AND list.isPrivate = false " +
//            "OR list.id = :listId AND list.listOwner.id = :userId")
//    <T> Optional<T> getListById(@Param("listId") Long listId, @Param("userId") Long userId, Class<T> type);

    @Query("SELECT list FROM Lists list WHERE list.listOwner.id = :ownerId AND list.isPrivate = false")
    List<ListProjection> getUserTweetListsById(@Param("ownerId") Long ownerId);

    @Query("SELECT CASE WHEN count(list) > 0 THEN true ELSE false END FROM Lists list " +
            "WHERE list.id = :listId " +
            "AND list.isPrivate = false")
    boolean findByIdAndIsPrivateFalse(@Param("listId") Long listId);

//    @Query("SELECT list FROM Lists list " +
//            "WHERE list.id = :listId AND list.listOwner.id = :listOwnerId " +
//            "OR list.id = :listId AND list.id IN (" +
//            "   SELECT listFollower.listId FROM ListsFollowers listFollower " +
//            "   WHERE listFollower.followerId = :listOwnerId)")
//    Optional<Lists> getListWhereUserConsist(@Param("listId") Long listId, @Param("listOwnerId") Long listOwnerId);

    @Query("SELECT list FROM Lists list WHERE list.listOwner.id = :ownerId")
    List<SimpleListProjection> getUserOwnerLists(@Param("ownerId") Long ownerId);

//    @Query("SELECT CASE WHEN count(list) > 0 THEN true ELSE false END FROM Lists list " +
//            "WHERE list.id = :listId " +
//            "AND list.listOwner.id = :authUserId " +
//            "AND list.id IN (" +
//            "   SELECT listsMembers.listId FROM ListsMembers listsMembers " +
//            "   WHERE listsMembers.memberId = :memberId)")
//    boolean isListIncludeUser(@Param("listId") Long listId,
//                              @Param("authUserId") Long authUserId,
//                              @Param("memberId") Long memberId);

//    @Query("SELECT CASE WHEN count(list) > 0 THEN true ELSE false END FROM Lists list " +
//            "WHERE list.id = :listId AND list.listOwner.id = :listOwnerId " +
//            "OR list.id = :listId AND list.id IN (" +
//            "   SELECT listFollower.listId FROM ListsFollowers listFollower " +
//            "   WHERE listFollower.followerId = :listOwnerId)")
//    boolean isListExist(@Param("listId") Long listId, @Param("listOwnerId") Long listOwnerId);

//    @Query("SELECT CASE WHEN count(list) > 0 THEN true ELSE false END FROM Lists list " +
//            "WHERE list.id = :listId AND list.listOwner.id = :authUserId " +
//            "OR list.id = :listId AND list.isPrivate = false " +
//            "OR list.id = :listId AND list.isPrivate = true AND list.id IN (" +
//            "   SELECT listFollower.listId FROM ListsFollowers listFollower " +
//            "   WHERE listFollower.followerId = :authUserId)")
//    boolean isListNotPrivate(@Param("listId") Long listId, @Param("authUserId") Long authUserId);

//    @Query("SELECT list.isPrivate FROM Lists list " +
//            "WHERE list.id = :listId " +
//            "AND list.listOwner.id <> :authUserId")
//    boolean isListPrivate(@Param("listId") Long listId, @Param("authUserId") Long authUserId);
}
