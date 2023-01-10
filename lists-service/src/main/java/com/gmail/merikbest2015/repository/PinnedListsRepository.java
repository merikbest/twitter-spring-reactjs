package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.commons.models.PinnedLists;
import com.gmail.merikbest2015.repository.projection.pinned.PinnedListsProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PinnedListsRepository extends JpaRepository<PinnedLists, Long> {

    @Query("SELECT list as item FROM PinnedLists pinnedList " +
            "LEFT JOIN pinnedList.list list " +
            "WHERE pinnedList.pinnedUser.id = :userId " +
            "ORDER BY pinnedList.pinnedDate DESC")
    List<PinnedListsProjection> getUserPinnedLists(@Param("userId") Long userId);

    @Query("SELECT CASE WHEN count(pinnedList) > 0 THEN true ELSE false END FROM PinnedLists pinnedList " +
            "LEFT JOIN pinnedList.list list " +
            "LEFT JOIN pinnedList.pinnedUser pinnedUser " +
            "WHERE list.id = :listId " +
            "AND pinnedUser.id = :userId")
    boolean isListPinned(@Param("listId") Long listId, @Param("userId") Long userId);

    @Modifying
    @Query(value = "INSERT INTO pinned_lists (list_id, user_id, pinned_date) VALUES (?1, ?2, ?3)", nativeQuery = true)
    void addPinnedList(@Param("listId") Long listId, @Param("userId") Long userId, @Param("pinnedDate") LocalDateTime pinnedDate);

    @Modifying
    @Query(value = "DELETE FROM pinned_lists WHERE list_id = ?1 AND user_id = ?2", nativeQuery = true)
    void removePinnedList(@Param("listId") Long listId, @Param("userId") Long userId);

    @Modifying
    @Query(value = "DELETE FROM pinned_lists WHERE list_id = ?1", nativeQuery = true)
    void deletePinnedList(@Param("listId") Long listId);
}
