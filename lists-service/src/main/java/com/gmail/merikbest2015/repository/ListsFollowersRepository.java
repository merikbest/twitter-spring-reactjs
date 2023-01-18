package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.ListsFollowers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ListsFollowersRepository extends JpaRepository<ListsFollowers, Long> {

    @Query("SELECT CASE WHEN count(listFollower) > 0 THEN true ELSE false END FROM ListsFollowers listFollower " +
            "WHERE listFollower.followerId = :userId " +
            "AND listFollower.listId = :listId")
    boolean isListFollowed(@Param("userId") Long userId, @Param("listId") Long listId);

    @Query("SELECT listFollower FROM ListsFollowers listFollower " +
            "WHERE listFollower.listId = :listId " +
            "AND listFollower.followerId = :userId")
    ListsFollowers getListFollower(@Param("listId") Long listId, @Param("userId") Long userId);

    @Query("SELECT listFollower.listId FROM ListsFollowers listFollower WHERE listFollower.followerId = :userId")
    List<Long> getListIds(@Param("userId") Long userId);

    @Query("SELECT COUNT(listFollower) FROM ListsFollowers listFollower WHERE listFollower.listId = :listId")
    Long getFollowersSize(@Param("listId") Long listId);

    @Modifying
    @Query(value = "DELETE FROM lists_followers WHERE followers_id = ?1 AND lists_id = ?2", nativeQuery = true)
    void removeFollowerFromList(@Param("userId") Long userId, @Param("listId") Long listId);

}
