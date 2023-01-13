package com.gmail.merikbest2015.commons.repository;

import com.gmail.merikbest2015.commons.models.LikeTweet;
import com.gmail.merikbest2015.commons.projection.LikeTweetProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface LikeTweetRepository extends JpaRepository<LikeTweet, Long> {

    @Query("SELECT likeTweet FROM LikeTweet likeTweet " +
            "LEFT JOIN likeTweet.user user " +
            "LEFT JOIN likeTweet.tweet tweet " +
            "WHERE likeTweet.user.id = :userId " +
            "AND tweet.deleted = false " +
            "ORDER BY likeTweet.likeTweetDate DESC")
    Page<LikeTweetProjection> getUserLikedTweets(Long userId, Pageable pageable);

    @Query("SELECT CASE WHEN count(likeTweet) > 0 THEN true ELSE false END FROM LikeTweet likeTweet " +
            "WHERE likeTweet.user.id = :userId " +
            "AND likeTweet.tweet.id = :tweetId")
    boolean isTweetLiked(@Param("userId") Long userId, @Param("tweetId") Long tweetId);

    @Modifying
    @Query(value = "DELETE FROM like_tweets WHERE users_id = ?1 AND tweets_id = ?2", nativeQuery = true)
    void removeLikedTweet(@Param("userId") Long userId, @Param("tweetId") Long tweetId);

    @Modifying
    @Query(value = "INSERT INTO like_tweets (id, users_id, tweets_id) VALUES (?1, ?2, ?3)", nativeQuery = true)
    void addLikedTweet(@Param("id") BigDecimal id, @Param("userId") Long userId, @Param("tweetId") Long tweetId);

    @Query(value = "SELECT nextval('like_tweets_seq')", nativeQuery = true)
    BigDecimal getNextVal();
}
