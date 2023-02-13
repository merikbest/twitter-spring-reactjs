package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.LikeTweet;
import com.gmail.merikbest2015.repository.projection.LikeTweetProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeTweetRepository extends JpaRepository<LikeTweet, Long> {

    @Query("SELECT likeTweet FROM LikeTweet likeTweet " +
            "WHERE likeTweet.userId = :userId " +
            "ORDER BY likeTweet.likeTweetDate DESC")
    Page<LikeTweetProjection> getUserLikedTweets(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT CASE WHEN count(likeTweet) > 0 THEN true ELSE false END " +
            "FROM LikeTweet likeTweet " +
            "WHERE likeTweet.userId = :userId " +
            "AND likeTweet.tweetId = :tweetId")
    boolean isUserLikedTweet(@Param("userId") Long userId, @Param("tweetId") Long tweetId);

    @Query("SELECT COUNT(likeTweet) FROM LikeTweet likeTweet WHERE likeTweet.tweetId = :tweetId")
    Long getLikedTweetsSize(@Param("tweetId") Long tweetId);

    @Query("SELECT likeTweet.userId FROM LikeTweet likeTweet WHERE likeTweet.tweetId = :tweetId")
    List<Long> getLikedUserIds(@Param("tweetId") Long tweetId);

    @Query("SELECT likeTweet FROM LikeTweet likeTweet " +
            "WHERE likeTweet.userId = :userId " +
            "AND likeTweet.tweetId = :tweetId")
    LikeTweet getLikedTweet(@Param("userId") Long userId, @Param("tweetId") Long tweetId);
}
