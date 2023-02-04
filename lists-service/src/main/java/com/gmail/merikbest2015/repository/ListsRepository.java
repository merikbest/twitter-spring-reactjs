package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.Lists;
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
            "WHERE list.id = :listId AND list.listOwnerId = :listOwnerId " +
            "OR list.id = :listId AND list.id IN :listIds")
    boolean isListExist(@Param("listIds") List<Long> listIds,
                        @Param("listId") Long listId,
                        @Param("listOwnerId") Long listOwnerId);

    @Query("SELECT CASE WHEN count(list) > 0 THEN true ELSE false END FROM Lists list " +
            "WHERE list.id = :listId AND list.listOwnerId = :authUserId " +
            "OR list.id = :listId AND list.isPrivate = false " +
            "OR list.id = :listId AND list.isPrivate = true AND list.id IN :listIds")
    boolean isListNotPrivate(@Param("listIds") List<Long> listIds,
                             @Param("listId") Long listId,
                             @Param("authUserId") Long authUserId);

    @Query("SELECT lists FROM Lists lists " +
            "WHERE lists.id = :listId AND lists.isPrivate = false " +
            "OR lists.id = :listId AND lists.listOwnerId = :authUserId")
    Optional<BaseListProjection> getListDetails(@Param("listId") Long listId, @Param("authUserId") Long authUserId);

    @Query("SELECT list.isPrivate FROM Lists list " +
            "WHERE list.id = :listId " +
            "AND list.listOwnerId != :authUserId")
    boolean isListPrivate(@Param("listId") Long listId, @Param("authUserId") Long authUserId);
}
