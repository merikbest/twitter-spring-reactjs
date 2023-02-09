package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.PinnedLists;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PinnedListsRepository extends JpaRepository<PinnedLists, Long> {

    @Modifying
    @Query(value = "DELETE FROM pinned_lists WHERE list_id = ?1", nativeQuery = true)
    void deletePinnedList(@Param("listId") Long listId);

    @Query("SELECT pinnedList FROM PinnedLists pinnedList " +
            "WHERE pinnedList.list.id = :listId " +
            "AND pinnedList.pinnedUserId = :userId")
    PinnedLists getPinnedByUserIdAndListId(@Param("listId") Long listId, @Param("userId") Long userId);

    @Query("SELECT CASE WHEN count(pinnedList) > 0 THEN true ELSE false END FROM PinnedLists pinnedList " +
            "WHERE pinnedList.list.id = :pinnedListId " +
            "AND pinnedList.pinnedUserId = :pinnedUserId")
    boolean isListPinned(@Param("pinnedListId") Long pinnedListId, @Param("pinnedUserId") Long pinnedUserId);

    @Modifying
    @Query(value = "DELETE FROM pinned_lists WHERE list_id = ?1 AND pinned_user_id = ?2", nativeQuery = true)
    void removePinnedList(@Param("listId") Long listId, @Param("userId") Long userId);
}
