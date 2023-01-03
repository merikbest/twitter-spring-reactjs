package com.gmail.merikbest2015.commons.repository;

import com.gmail.merikbest2015.commons.projection.RetweetsProjection;
import com.gmail.merikbest2015.commons.models.Retweet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RetweetRepository extends JpaRepository<Retweet, Long> {
    @Query("SELECT r AS retweet FROM Retweet r " +
            "LEFT JOIN r.user u " +
            "LEFT JOIN r.tweet t " +
            "WHERE u.id = :userId " +
            "AND t.deleted = false " +
            "ORDER BY r.retweetDate DESC")
    List<RetweetsProjection> findRetweetsByUserId(Long userId);
}
