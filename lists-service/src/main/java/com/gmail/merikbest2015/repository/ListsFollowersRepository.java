package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.ListsFollowers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ListsFollowersRepository extends JpaRepository<ListsFollowers, Long> {

    @Query("SELECT listFollower.listId FROM ListsFollowers listFollower WHERE listFollower.followerId = :userId")
    List<Long> getListIds(@Param("userId") Long userId);

    @Query("SELECT COUNT(listFollower) FROM ListsFollowers listFollower WHERE listFollower.listId = :listId")
    Long getFollowersSize(@Param("listId") Long listId);
}
