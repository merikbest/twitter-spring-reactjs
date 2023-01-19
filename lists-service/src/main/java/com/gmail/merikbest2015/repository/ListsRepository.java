package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.Lists;
import com.gmail.merikbest2015.repository.projection.BaseListProjection;
import com.gmail.merikbest2015.repository.projection.ListProjection;
import com.gmail.merikbest2015.repository.projection.ListUserProjection;
import com.gmail.merikbest2015.repository.projection.SimpleListProjection;
import com.gmail.merikbest2015.repository.projection.pinned.PinnedListProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ListsRepository extends JpaRepository<Lists, Long> {

    @Query("SELECT list FROM Lists list WHERE list.isPrivate = false")
    List<ListProjection> getAllTweetLists();

    @Query("SELECT list FROM Lists list WHERE list.id IN :listIds")
    List<ListProjection> getTweetListsByIds(@Param("listIds") List<Long> listIds);

    @Query("SELECT list FROM Lists list " +
            "WHERE list.listOwnerId = :ownerId " +
            "OR list.id IN :listIds")
    List<ListUserProjection> getUserTweetLists(@Param("ownerId") Long ownerId, @Param("listIds") List<Long> listIds);

    @Query("SELECT list FROM Lists list " +
            "LEFT JOIN list.pinnedLists pinnedList " +
            "WHERE pinnedList.pinnedUserId = :userId " +
            "ORDER BY pinnedList.pinnedDate DESC")
    List<PinnedListProjection> getUserPinnedLists(@Param("userId") Long userId);

    @Query("SELECT list FROM Lists list " +
            "WHERE list.id = :listId AND list.id IN :listIds " +
            "OR list.id = :listId AND list.isPrivate = false " +
            "OR list.id = :listId AND list.listOwnerId = :userId")
    Optional<BaseListProjection> getListById(@Param("listIds") List<Long> listIds,
                                             @Param("listId") Long listId,
                                             @Param("userId") Long userId);

    @Query("SELECT list FROM Lists list WHERE list.id = :listId")
    ListUserProjection getUserTweetListById(@Param("listId") Long listId);

    @Query("SELECT list FROM Lists list WHERE list.listOwnerId = :ownerId AND list.isPrivate = false")
    List<ListProjection> getUserTweetListsById(@Param("ownerId") Long ownerId);

    @Query("SELECT CASE WHEN count(list) > 0 THEN true ELSE false END FROM Lists list " +
            "WHERE list.id = :listId " +
            "AND list.isPrivate = false")
    boolean findByIdAndIsPrivateFalse(@Param("listId") Long listId);


    @Query("SELECT list FROM Lists list " +
            "WHERE list.id = :listId AND list.listOwnerId = :listOwnerId " +
            "OR list.id = :listId AND list.id IN :listIds")
    Optional<Lists> getListWhereUserConsist(@Param("listIds") List<Long> listIds,
                                            @Param("listId") Long listId,
                                            @Param("listOwnerId") Long listOwnerId);

    @Query("SELECT list FROM Lists list WHERE list.id = :listId")
    PinnedListProjection getUserPinnedListById(@Param("listId") Long listId);

    @Query("SELECT list FROM Lists list WHERE list.listOwnerId = :ownerId")
    List<SimpleListProjection> getUserOwnerLists(@Param("ownerId") Long ownerId);

    @Query("SELECT CASE WHEN count(list) > 0 THEN true ELSE false END FROM Lists list " +
            "WHERE list.id = :listId " +
            "AND list.listOwnerId = :authUserId " +
            "AND list.id IN :listIds")
    boolean isListIncludeUser(@Param("listIds") List<Long> listIds,
                              @Param("listId") Long listId,
                              @Param("authUserId") Long authUserId);

    @Query("SELECT CASE WHEN count(list) > 0 THEN true ELSE false END FROM Lists list " +
//            "LEFT JOIN list.members m " +
            "WHERE list.id = :listId " +
            "AND list.id IN :listIds")
    boolean isMemberInList(@Param("listId") Long listId, @Param("listIds") List<Long> listIds);


    @Query("SELECT CASE WHEN count(list) > 0 THEN true ELSE false END FROM Lists list " +
            "WHERE list.id = :listId AND list.listOwnerId = :listOwnerId " +
            "OR list.id = :listId AND list.id IN :listIds")
    boolean isListExist(@Param("listIds") List<Long> listIds,
                        @Param("listId") Long listId,
                        @Param("listOwnerId") Long listOwnerId);

    @Query("SELECT list FROM Lists list WHERE list.id = :listId AND list.listOwnerId = :ownerId")
    Optional<Lists> getAuthUserListById(@Param("listId") Long listId, @Param("ownerId") Long ownerId);

    @Query("SELECT CASE WHEN count(list) > 0 THEN true ELSE false END FROM Lists list " +
            "WHERE list.id = :listId AND list.listOwnerId = :authUserId " +
            "OR list.id = :listId AND list.isPrivate = false " +
            "OR list.id = :listId AND list.isPrivate = true AND list.id IN :listIds")
    boolean isListNotPrivate(@Param("listIds") List<Long> listIds,
                             @Param("listId") Long listId,
                             @Param("authUserId") Long authUserId); // see getListMembersIds

    @Query("SELECT lists FROM Lists lists " +
            "WHERE lists.id = :listId AND lists.isPrivate = false " +
            "OR lists.id = :listId AND lists.listOwnerId = :authUserId")
    Optional<BaseListProjection> getListDetails(@Param("listId") Long listId, @Param("authUserId") Long authUserId);

    //    @Query("SELECT m.id FROM Lists l " +
//            "LEFT JOIN l.members m " +
//            "WHERE l.id = :listId AND l.isPrivate = false " +
//            "OR l.id = :listId AND l.listOwner.id = :userId")
//    List<Long> getListMembersIds(@Param("listId") Long listId, @Param("userId") Long userId);


//    @Query("SELECT list FROM Lists list " +
//            "LEFT JOIN list.listOwner listOwner " +
//            "LEFT JOIN list.followers follower " +
//            "WHERE listOwner.id = :ownerId " +
//            "OR follower.id = :ownerId")
//    List<ListUserProjection> getUserTweetLists(@Param("ownerId") Long ownerId);


//    @Query("SELECT m.id FROM Lists l " +
//            "LEFT JOIN l.members m " +
//            "WHERE l.id = :listId AND l.isPrivate = false " +
//            "OR l.id = :listId AND l.listOwner.id = :userId")
//    List<Long> getListMembersIds(@Param("listId") Long listId, @Param("userId") Long userId);

//    @Query("SELECT list.isPrivate FROM Lists list " +
//            "WHERE list.id = :listId " +
//            "AND list.listOwner.id != :authUserId")
//    boolean isListPrivate(@Param("listId") Long listId, @Param("authUserId") Long authUserId);


//    @Query("SELECT CASE WHEN count(follower) > 0 THEN true ELSE false END FROM Lists list " +
//            "LEFT JOIN list.followers follower " +
//            "WHERE list.id = :listId " +
//            "AND follower.id = :userId")
//    boolean isMyProfileFollowList(@Param("listId") Long listId, @Param("userId") Long userId);


//    @Query("SELECT lists FROM Lists lists " +
//            "WHERE lists.id = :listId AND lists.isPrivate = false " +
//            "OR lists.id = :listId AND lists.listOwner.id = :authUserId")
//    Optional<BaseListProjection> getListDetails(@Param("listId") Long listId, @Param("authUserId") Long authUserId);
//
//    @Query("SELECT f.id AS id, f.fullName AS fullName, f.username AS username, f.about AS about, f.avatar AS avatar, " +
//            "f.privateProfile AS isPrivateProfile " +
//            "FROM Lists l " +
//            "LEFT JOIN l.followers f " +
//            "WHERE l.id = :listId " +
//            "AND l.listOwner.id = :listOwnerId")
//    List<ListMemberProjection> getListFollowers(@Param("listId") Long listId, @Param("listOwnerId") Long listOwnerId);
//
//    @Query("SELECT m.id AS id, m.fullName AS fullName, m.username AS username, m.about AS about, m.avatar AS avatar, " +
//            "m.privateProfile AS isPrivateProfile " +
//            "FROM Lists l " +
//            "LEFT JOIN l.members m " +
//            "WHERE l.id = :listId")
//    List<ListMemberProjection> getListMembers(@Param("listId") Long listId);
//
//    @Query("SELECT m as member, l.id as listId " +
//            "FROM Lists l " +
//            "LEFT JOIN l.members m " +
//            "WHERE l.id = :listId")
//    List<ListsOwnerMemberProjection> getListOwnerMembers(@Param("listId") Long listId);
//
//    @Query("SELECT u as member FROM User u " +
//            "WHERE UPPER(u.fullName) LIKE UPPER(CONCAT('%',:name,'%')) AND u.active = true " +
//            "OR UPPER(u.username) LIKE UPPER(CONCAT('%',:name,'%')) AND u.active = true")
//    List<ListsMemberProjection> searchListMembersByUsername(@Param("name") String name);


//    @Modifying
//    @Query(value = "INSERT INTO lists_followers (followers_id, lists_id) VALUES (?1, ?2)", nativeQuery = true)
//    void addFollowerToList(@Param("userId") Long userId, @Param("listId") Long listId);

//    @Modifying
//    @Query(value = "INSERT INTO lists_members (members_id, lists_id) VALUES (?1, ?2)", nativeQuery = true)
//    void addMemberToList(@Param("userId") Long userId, @Param("listId") Long listId);
//
//    @Modifying
//    @Query(value = "DELETE FROM lists_members WHERE members_id = ?1 AND lists_id = ?2", nativeQuery = true)
//    void removeMemberFromList(@Param("userId") Long userId, @Param("listId") Long listId);
}
