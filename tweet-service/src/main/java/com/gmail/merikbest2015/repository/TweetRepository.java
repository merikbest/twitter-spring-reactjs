package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.repository.projection.NotificationTweetProjection;
import com.gmail.merikbest2015.repository.projection.TweetAdditionalInfoProjection;
import com.gmail.merikbest2015.repository.projection.TweetProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TweetRepository extends JpaRepository<Tweet, Long> {

    @Query("SELECT tweet FROM Tweet tweet " +
            "WHERE tweet.addressedUsername IS NULL " +
            "AND tweet.scheduledDate IS NULL " +
            "AND tweet.deleted = false " +
            "ORDER BY tweet.dateTime DESC")
    Page<TweetProjection> findAllTweets(Pageable pageable);

    @Query("SELECT tweet FROM Tweet tweet WHERE tweet.id = :tweetId")
    Optional<TweetProjection> findTweetById(@Param("tweetId") Long tweetId);

    @Query("SELECT tweet FROM Tweet tweet WHERE tweet.id = :tweetId")
    Optional<TweetAdditionalInfoProjection> getTweetAdditionalInfoById(@Param("tweetId") Long tweetId);

    @Query("SELECT tweet FROM Tweet tweet " +
            "WHERE tweet.addressedTweetId = :tweetId " +
            "AND tweet.deleted = false " +
            "ORDER BY tweet.dateTime DESC")
    List<TweetProjection> getRepliesByTweetId(@Param("tweetId") Long tweetId);

    @Query("SELECT tweet FROM Tweet tweet " +
            "LEFT JOIN tweet.quoteTweet quoteTweet " +
            "WHERE quoteTweet.id = :tweetId " +
            "AND quoteTweet.deleted = false")
    Page<TweetProjection> getQuotesByTweetId(@Param("tweetId") Long tweetId, Pageable pageable);

    @Query("SELECT tweet FROM Tweet tweet " +
            "WHERE tweet.scheduledDate IS NULL " +
            "AND tweet.images.size <> 0 " +
            "AND tweet.deleted = false " +
            "ORDER BY tweet.dateTime DESC")
    Page<TweetProjection> getMediaTweets(Pageable pageable);

    @Query("SELECT tweet FROM Tweet tweet " +
            "WHERE tweet.scheduledDate IS NULL " +
            "AND tweet.deleted = false " +
            "AND tweet.text LIKE CONCAT('%','youtu','%')")
    Page<TweetProjection> getTweetsWithVideo(Pageable pageable);

    @Query("SELECT tweet FROM Tweet tweet " +
            "WHERE tweet.authorId IN :userIds " +
            "AND tweet.addressedUsername IS NULL " +
            "AND tweet.deleted = false " +
            "ORDER BY tweet.dateTime DESC")
    Page<TweetProjection> getFollowersTweets(@Param("userIds") List<Long> userIds, Pageable pageable);

    @Query("SELECT tweet FROM Tweet tweet " +
            "WHERE tweet.authorId = :userId " +
            "AND tweet.scheduledDate IS NOT NULL " +
            "AND tweet.deleted = false " +
            "ORDER BY tweet.scheduledDate DESC")
    Page<TweetProjection> getScheduledTweets(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT tweet FROM Tweet tweet WHERE tweet.authorId = :userId")
    Optional<Tweet> getTweetByUserId(@Param("userId") Long userId);

    @Query("SELECT tweet FROM Tweet tweet " +
            "WHERE tweet.scheduledDate IS NULL " +
            "AND tweet.deleted = false " +
            "AND (tweet.text LIKE CONCAT('%',:text,'%') AND tweet.authorId IN :userIds OR tweet.authorId IN :userIds) " +
            "ORDER BY tweet.dateTime DESC")
    Page<TweetProjection> searchTweets(@Param("text") String text, @Param("userIds") List<Long> userIds, Pageable pageable);

    @Query("SELECT tweet.authorId FROM Tweet tweet WHERE tweet.text LIKE CONCAT('%',:text,'%')")
    List<Long> getUserIdsByTweetText(@Param("text") String text);

    @Modifying
    @Query(value = "INSERT INTO replies (tweets_id, reply_id) VALUES (?1, ?2)", nativeQuery = true)
    void addReply(@Param("tweetId") Long tweetId, @Param("replyId") Long replyId);

    @Query("SELECT tweet FROM Tweet tweet WHERE tweet.id = :tweetId AND tweet.authorId = :userId")
    Optional<Tweet> getTweetByAuthorIdAndTweetId(@Param("tweetId") Long tweetId, @Param("userId") Long userId);

    @Query("SELECT tweet FROM Tweet tweet WHERE tweet.id = :tweetId AND tweet.poll.id = :pollId")
    Optional<Tweet> getTweetByPollIdAndTweetId(@Param("tweetId") Long tweetId, @Param("pollId") Long pollId);

    // NEW
    @Query("SELECT tweet FROM Tweet tweet WHERE tweet.id = :tweetId")
    NotificationTweetProjection getNotificationTweet(@Param("tweetId") Long tweetId);
}
