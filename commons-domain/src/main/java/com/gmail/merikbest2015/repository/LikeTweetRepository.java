package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.models.LikeTweet;
import com.gmail.merikbest2015.projection.LikeTweetProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeTweetRepository extends JpaRepository<LikeTweet, Long> {

    @Query("SELECT likeTweet FROM LikeTweet likeTweet " +
            "LEFT JOIN likeTweet.user user " +
            "LEFT JOIN likeTweet.tweet tweet " +
            "WHERE likeTweet.user.id = :userId " +
            "AND tweet.deleted = false " +
            "ORDER BY likeTweet.likeTweetDate DESC")
    Page<LikeTweetProjection> getUserLikedTweets(Long userId, Pageable pageable);
}
