package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.Retweet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RetweetRepository extends JpaRepository<Retweet, Long> {

    @Query("SELECT CASE WHEN count(retweet) > 0 THEN true ELSE false END " +
            "FROM Retweet retweet " +
            "WHERE retweet.userId = :userId " +
            "AND retweet.tweetId = :tweetId")
    boolean isUserRetweetedTweet(@Param("userId") Long userId, @Param("tweetId") Long tweetId);

    @Query("SELECT COUNT(retweet) FROM Retweet retweet WHERE retweet.tweetId = :tweetId")
    Long getRetweetSize(@Param("tweetId") Long tweetId);

    @Query("SELECT retweet.userId FROM Retweet retweet WHERE retweet.tweetId = :tweetId")
    Page<Long> getRetweetedUserIds(@Param("tweetId") Long tweetId, Pageable pageable);

    @Query("SELECT retweet FROM Retweet retweet " +
            "WHERE retweet.userId = :userId " +
            "AND retweet.tweetId = :tweetId")
    Retweet isTweetRetweeted(@Param("userId") Long userId, @Param("tweetId") Long tweetId);

//    @Query("SELECT r AS retweet FROM Retweet r " +
//            "LEFT JOIN r.user u " +
//            "LEFT JOIN r.tweet t " +
//            "WHERE u.id = :userId " +
//            "AND t.deleted = false " +
//            "ORDER BY r.retweetDate DESC")
//    List<RetweetsProjection> findRetweetsByUserId(Long userId);
//
//    @Query("SELECT CASE WHEN count(retweet) > 0 THEN true ELSE false END FROM Retweet retweet " +
//            "WHERE retweet.user.id = :userId " +
//            "AND retweet.tweet.id = :tweetId")
//    boolean isTweetRetweeted(@Param("userId") Long userId, @Param("tweetId") Long tweetId);
//
//    @Modifying
//    @Query(value = "DELETE FROM retweets WHERE users_id = ?1 AND tweets_id = ?2", nativeQuery = true)
//    void removeRetweetedTweet(@Param("userId") Long userId, @Param("tweetId") Long tweetId);
//
//    @Modifying
//    @Query(value = "INSERT INTO retweets (id, users_id, tweets_id) VALUES (?1, ?2, ?3)", nativeQuery = true)
//    void addRetweetedTweet(@Param("id") BigDecimal id, @Param("userId") Long userId, @Param("tweetId") Long tweetId);
//
//    @Query(value = "SELECT nextval('retweets_seq')", nativeQuery = true)
//    BigDecimal getNextVal();
}
