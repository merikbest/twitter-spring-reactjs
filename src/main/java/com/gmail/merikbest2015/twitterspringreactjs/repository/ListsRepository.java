package com.gmail.merikbest2015.twitterspringreactjs.repository;

import com.gmail.merikbest2015.twitterspringreactjs.model.Lists;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.lists.*;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.tweet.TweetProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Query("SELECT list FROM Lists list " +
            "LEFT JOIN list.listOwner listOwner " +
            "LEFT JOIN list.followers follower " +
            "WHERE listOwner.id = :ownerId " +
            "OR follower.id = :ownerId")
    List<ListUserProjection> getUserTweetLists(Long ownerId);

    @Query("SELECT l.id AS id, l.name AS name, l.altWallpaper AS altWallpaper, w AS wallpaper, l.isPrivate AS isPrivate " +
            "FROM Lists l " +
            "LEFT JOIN l.listOwner lo " +
            "LEFT JOIN l.wallpaper w " +
            "WHERE lo.id = :ownerId")
    List<SimpleListProjection> getUserOwnerLists(Long ownerId);

    @Query("SELECT l FROM Lists l WHERE l.id = :listId")
    ListUserProjection getUserTweetListById(Long listId);

    List<Lists> findByListOwner_Id(Long id);

    Optional<Lists> findByIdAndIsPrivateFalse(Long id);

    @Query("SELECT l FROM Lists l " +
            "LEFT JOIN l.listOwner u " +
            "WHERE u.id = :ownerId " +
            "AND l.id IN :listIds")
    List<Lists> getListsByIds(Long ownerId, List<Long> listIds);

    @Query("SELECT list FROM Lists list " +
            "WHERE list.listOwner.id = :userId " +
            "AND list.pinnedDate IS NOT NULL " +
            "ORDER BY list.pinnedDate DESC")
    List<PinnedListProjection> getUserPinnedLists(Long userId);

    @Query("SELECT list FROM Lists list WHERE list.id = :listId")
    PinnedListProjection getUserPinnedListById(Long listId);

    @Query("SELECT m.id FROM Lists l " +
            "LEFT JOIN l.members m " +
            "WHERE l.id = :listId AND l.isPrivate = false " +
            "OR l.id = :listId AND l.listOwner.id = :userId")
    List<Long> getListMembersIds(Long listId, Long userId);

    @Query("SELECT t FROM Tweet t " +
            "JOIN t.user u " +
            "JOIN u.userLists l " +
            "WHERE l.id = :listId " +
            "AND t.addressedUsername IS NULL " +
            "ORDER BY t.dateTime DESC")
    Page<TweetProjection> getTweetsByListId(Long listId, Pageable pageable);

    @Query("SELECT lists FROM Lists lists " +
            "LEFT JOIN lists.followers listsFollower " +
            "WHERE lists.id = :listId AND listsFollower.id = :userId " +
            "OR lists.id = :listId AND lists.isPrivate = false " +
            "OR lists.id = :listId AND lists.listOwner.id = :userId")
    Optional<BaseListProjection> getListById(Long listId, Long userId);

    @Query("SELECT list.isPrivate FROM Lists list " +
            "WHERE list.id = :listId " +
            "AND list.listOwner.id != :authUserId")
    boolean isListPrivate(Long listId, Long authUserId);

    @Query("SELECT CASE WHEN count(list) > 0 THEN true ELSE false END FROM Lists list " +
            "WHERE list.id = :listId " +
            "AND list.listOwner.id = :listOwnerId")
    boolean isListExist(Long listId, Long listOwnerId);

    @Query("SELECT CASE WHEN count(follower) > 0 THEN true ELSE false END FROM Lists list " +
            "LEFT JOIN list.followers follower " +
            "WHERE list.id = :listId " +
            "AND follower.id = :userId")
    boolean isMyProfileFollowList(Long listId, Long userId);

    @Query("SELECT CASE WHEN count(meber) > 0 THEN true ELSE false END FROM User user " +
            "LEFT JOIN user.userLists userList " +
            "LEFT JOIN userList.members meber " +
            "WHERE user.id = :authUserId " +
            "AND userList.id = :listId " +
            "AND meber.id = :memberId")
    boolean isListIncludeUser(Long listId, Long authUserId, Long memberId);

    @Query("SELECT list FROM Lists list WHERE list.listOwner.id = :ownerId AND list.isPrivate = false")
    List<ListProjection> findByListOwnerIdAndIsPrivateFalse(Long ownerId);

    @Query("SELECT list FROM Lists list " +
            "LEFT JOIN list.members m " + // <- QuerySyntaxException: unexpected token: LEFT JOIN list.members member ???
            "WHERE m.id = :userId")
    List<ListProjection> findByMembers_Id(Long userId);

    @Query("SELECT lists FROM Lists lists " +
            "WHERE lists.id = :listId AND lists.isPrivate = false " +
            "OR lists.id = :listId AND lists.listOwner.id = :authUserId")
    Optional<BaseListProjection> getListDetails(Long listId, Long authUserId);

    @Query("SELECT f.id AS id, f.fullName AS fullName, f.username AS username, f.about AS about, f.avatar AS avatar, " +
            "f.privateProfile AS isPrivateProfile " +
            "FROM Lists l " +
            "LEFT JOIN l.followers f " +
            "WHERE l.id = :listId " +
            "AND l.listOwner.id = :listOwnerId")
    List<ListMemberProjection> getListFollowers(Long listId, Long listOwnerId);

    @Query("SELECT m.id AS id, m.fullName AS fullName, m.username AS username, m.about AS about, m.avatar AS avatar, " +
            "m.privateProfile AS isPrivateProfile " +
            "FROM Lists l " +
            "LEFT JOIN l.members m " +
            "WHERE l.id = :listId")
    List<ListMemberProjection> getListMembers(Long listId);

    @Query("SELECT m as member, l.id as listId " +
            "FROM Lists l " +
            "LEFT JOIN l.members m " +
            "WHERE l.id = :listId")
    List<ListsOwnerMemberProjection> getListOwnerMembers(Long listId);

    @Query("SELECT u as member FROM User u " +
            "WHERE UPPER(u.fullName) LIKE UPPER(CONCAT('%',:name,'%')) AND u.active = true " +
            "OR UPPER(u.username) LIKE UPPER(CONCAT('%',:name,'%')) AND u.active = true")
    List<ListsMemberProjection> searchListMembersByUsername(@Param("name") String name);
}
