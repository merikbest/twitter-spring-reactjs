package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.Retweet;
import com.gmail.merikbest2015.repository.projection.RetweetProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RetweetRepository extends JpaRepository<Retweet, Long> {

    @Query("SELECT retweet FROM Retweet retweet " +
            "WHERE retweet.userId = :userId " +
            "ORDER BY retweet.retweetDate DESC")
    List<RetweetProjection> getRetweetsByUserId(@Param("userId") Long userId);

    @Query("SELECT CASE WHEN count(retweet) > 0 THEN true ELSE false END " +
            "FROM Retweet retweet " +
            "WHERE retweet.userId = :userId " +
            "AND retweet.tweetId = :tweetId")
    boolean isUserRetweetedTweet(@Param("userId") Long userId, @Param("tweetId") Long tweetId);

    @Query("SELECT COUNT(retweet) FROM Retweet retweet WHERE retweet.tweetId = :tweetId")
    Long getRetweetSize(@Param("tweetId") Long tweetId);

    @Query("SELECT retweet.userId FROM Retweet retweet WHERE retweet.tweetId = :tweetId")
    List<Long> getRetweetedUserIds(@Param("tweetId") Long tweetId);

    @Query("SELECT retweet FROM Retweet retweet " +
            "WHERE retweet.userId = :userId " +
            "AND retweet.tweetId = :tweetId")
    Retweet isTweetRetweeted(@Param("userId") Long userId, @Param("tweetId") Long tweetId);

    @Query("SELECT retweet.userId FROM Retweet retweet WHERE retweet.tweetId = :tweetId")
    List<Long> getRetweetsUserIds(@Param("tweetId") Long tweetId);
}
