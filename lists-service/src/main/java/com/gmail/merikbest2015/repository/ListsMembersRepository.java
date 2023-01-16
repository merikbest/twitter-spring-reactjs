package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.ListsMembers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ListsMembersRepository extends JpaRepository<ListsMembers, Long> {

    @Query("SELECT listsMembers.listId FROM ListsMembers listsMembers WHERE listsMembers.memberId = :userId")
    List<Long> getListIds(@Param("userId") Long userId);

    @Query("SELECT COUNT(listsMembers) FROM ListsMembers listsMembers WHERE listsMembers.listId = :listId")
    Long getMembersSize(@Param("listId") Long listId);
}
