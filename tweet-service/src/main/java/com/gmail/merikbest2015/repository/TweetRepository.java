package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.repository.projection.ProfileTweetImageProjection;
import com.gmail.merikbest2015.repository.projection.TweetProjection;
import com.gmail.merikbest2015.repository.projection.TweetUserProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TweetRepository extends JpaRepository<Tweet, Long> {

    @Query("SELECT tweet FROM Tweet tweet WHERE tweet.id = :tweetId")
    <T> Optional<T> getTweetById(@Param("tweetId") Long tweetId, Class<T> type);

    @Query("""
            SELECT tweet FROM Tweet tweet
            WHERE tweet.author.id IN :userIds
            AND tweet.addressedUsername IS NULL
            AND tweet.scheduledDate IS NULL
            AND tweet.deleted = false
            ORDER BY tweet.dateTime DESC
            """)
    Page<TweetProjection> getTweetsByAuthorIds(@Param("userIds") List<Long> userIds, Pageable pageable);

    @Query("""
            SELECT tweet FROM Tweet tweet
            WHERE tweet.author.id NOT IN (
                    SELECT user.id FROM User user
                    JOIN user.userBlockedList blockedUser
                    WHERE user.id IN (
                        SELECT DISTINCT tweet.author.id FROM Tweet tweet
                        WHERE tweet.addressedUsername IS NULL
                        AND tweet.scheduledDate IS NULL
                        AND tweet.deleted = false
                    )
                    AND blockedUser.id = :userId
            )
            AND tweet.author.id IN (
                SELECT user.id FROM User user
                LEFT JOIN user.following following
                WHERE user.id IN (
                    SELECT DISTINCT tweet.author.id FROM Tweet tweet
                    WHERE tweet.addressedUsername IS NULL
                    AND tweet.scheduledDate IS NULL
                    AND tweet.deleted = false
                )
                AND (user.privateProfile = false
                OR (user.privateProfile = true AND (following.id = :userId OR user.id = :userId))
                AND user.active = true)
            )
            AND tweet.addressedUsername IS NULL
            AND tweet.scheduledDate IS NULL
            AND tweet.deleted = false
            ORDER BY tweet.dateTime DESC
            """)
    Page<TweetProjection> getTweetsByAuthors(@Param("userId") Long userId, Pageable pageable);

    @Query("""
            SELECT tweet FROM Tweet tweet
            WHERE tweet.author.id = :userId
            AND tweet.addressedUsername IS NULL
            AND tweet.scheduledDate IS NULL
            AND tweet.deleted = false
            ORDER BY tweet.dateTime DESC
            """)
    List<TweetUserProjection> getTweetsByUserId(@Param("userId") Long userId);

    @Query("""
            SELECT tweet FROM Tweet tweet
            LEFT JOIN tweet.images image
            WHERE tweet.scheduledDate IS NULL AND tweet.deleted = false
            AND (tweet.author.id = :userId AND image.id IS NOT NULL)
            OR tweet.scheduledDate IS NULL AND tweet.deleted = false
            AND (tweet.author.id = :userId AND tweet.text LIKE CONCAT('%','youtu','%'))
            ORDER BY tweet.dateTime DESC
            """)
    Page<TweetProjection> getUserMediaTweets(@Param("userId") Long userId, Pageable pageable);

    @Query("""
            SELECT tweet FROM Tweet tweet
            WHERE tweet.author.id = :userId
            AND tweet.addressedUsername IS NOT NULL
            AND tweet.scheduledDate IS NULL
            AND tweet.deleted = false
            ORDER BY tweet.dateTime DESC
            """)
    List<TweetUserProjection> getRepliesByUserId(@Param("userId") Long userId);

    @Query("""
            SELECT tweet FROM Tweet tweet
            WHERE tweet.addressedTweetId = :tweetId
            AND tweet.deleted = false
            ORDER BY tweet.dateTime DESC
            """)
    List<TweetProjection> getRepliesByTweetId(@Param("tweetId") Long tweetId);

    @Query("""
            SELECT tweet FROM Tweet tweet
            LEFT JOIN tweet.quoteTweet quoteTweet
            WHERE tweet.author.id NOT IN (
                    SELECT user.id FROM User user
                    JOIN user.userBlockedList blockedUser
                    WHERE blockedUser.id = :userId
            )
            AND tweet.author.id IN (
                SELECT user.id FROM User user
                LEFT JOIN user.following following
                WHERE (user.privateProfile = false
                OR (user.privateProfile = true AND (following.id = :userId OR user.id = :userId))
                AND user.active = true)
            )
            AND quoteTweet.id = :tweetId
            AND quoteTweet.deleted = false
            """)
    Page<TweetProjection> getQuotesByTweet(@Param("userId") Long userId, @Param("tweetId") Long tweetId, Pageable pageable);

    @Query("""
            SELECT tweet FROM Tweet tweet
            WHERE tweet.author.id NOT IN (
                    SELECT user.id FROM User user
                    JOIN user.userBlockedList blockedUser
                    WHERE blockedUser.id = :userId
            )
            AND tweet.author.id IN (
                SELECT user.id FROM User user
                LEFT JOIN user.following following
                WHERE (user.privateProfile = false
                OR (user.privateProfile = true AND (following.id = :userId OR user.id = :userId))
                AND user.active = true)
            )
            AND tweet.scheduledDate IS NULL
            AND tweet.images.size <> 0
            AND tweet.deleted = false
            ORDER BY tweet.dateTime DESC
            """)
    Page<TweetProjection> getMediaTweets(@Param("userId") Long userId, Pageable pageable);

    @Query("""
            SELECT tweet FROM Tweet tweet
            WHERE tweet.author.id NOT IN (
                    SELECT user.id FROM User user
                    JOIN user.userBlockedList blockedUser
                    WHERE blockedUser.id = :userId
            )
            AND tweet.author.id IN (
                SELECT user.id FROM User user
                LEFT JOIN user.following following
                WHERE (user.privateProfile = false
                OR (user.privateProfile = true AND (following.id = :userId OR user.id = :userId))
                AND user.active = true)
            )
            AND tweet.scheduledDate IS NULL
            AND tweet.deleted = false
            AND tweet.text LIKE CONCAT('%','youtu','%')
            """)
    Page<TweetProjection> getTweetsWithVideo(@Param("userId") Long userId, Pageable pageable);

    @Query("""
            SELECT tweet FROM Tweet tweet
            WHERE tweet.author.id IN (
                SELECT follower.id FROM User user
                JOIN user.followers follower
                WHERE user.id = :userId
            )
            AND tweet.addressedUsername IS NULL
            AND tweet.deleted = false
            ORDER BY tweet.dateTime DESC
            """)
    Page<TweetProjection> getFollowersTweets(@Param("userId") Long userId, Pageable pageable);

    @Query("""
            SELECT tweet FROM Tweet tweet
            WHERE tweet.author.id = :userId
            AND tweet.scheduledDate IS NOT NULL
            AND tweet.deleted = false
            ORDER BY tweet.scheduledDate DESC
            """)
    Page<TweetProjection> getScheduledTweets(@Param("userId") Long userId, Pageable pageable);

    @Query("""
            SELECT tweet FROM Tweet tweet
            WHERE tweet.author.id = :userId
            AND tweet.id = :tweetId
            """)
    Optional<Tweet> getTweetByUserId(@Param("userId") Long userId, @Param("tweetId") Long tweetId);

    @Query("""
            SELECT tweet FROM Tweet tweet
            WHERE tweet.scheduledDate IS NULL
            AND tweet.deleted = false
            AND tweet.text LIKE CONCAT('%',:text,'%')
            AND tweet.author.id NOT IN (
                SELECT user.id FROM User user
                JOIN user.userBlockedList blockedUser
                WHERE blockedUser.id = :userId
            )
            AND tweet.author.id IN (
                SELECT user.id FROM User user
                LEFT JOIN user.following following
                WHERE (user.privateProfile = false
                OR (user.privateProfile = true AND (following.id = :userId OR user.id = :userId))
                AND user.active = true)
            )
            ORDER BY tweet.dateTime DESC
            """)
    Page<TweetProjection> searchTweets(@Param("text") String text, @Param("userId") Long userId, Pageable pageable);

    @Modifying
    @Query(value = "INSERT INTO replies (tweet_id, reply_id) VALUES (?1, ?2)", nativeQuery = true)
    void addReply(@Param("tweetId") Long tweetId, @Param("replyId") Long replyId);

    @Modifying
    @Query(value = "INSERT INTO quotes (tweet_id, quote_id) VALUES (?1, ?2)", nativeQuery = true)
    void addQuote(@Param("tweetId") Long tweetId, @Param("quoteTweetId") Long quoteTweetId);

    @Query("SELECT tweet FROM Tweet tweet WHERE tweet.id = :tweetId AND tweet.author.id = :userId")
    Optional<Tweet> getTweetByAuthorIdAndTweetId(@Param("tweetId") Long tweetId, @Param("userId") Long userId);

    @Query("SELECT tweet FROM Tweet tweet WHERE tweet.id = :tweetId AND tweet.poll.id = :pollId")
    Optional<Tweet> getTweetByPollIdAndTweetId(@Param("tweetId") Long tweetId, @Param("pollId") Long pollId);

    @Query("SELECT CASE WHEN count(tweet) > 0 THEN true ELSE false END FROM Tweet tweet WHERE tweet.id = :tweetId")
    boolean isTweetExists(@Param("tweetId") Long tweetId);

    @Query("""
            SELECT tweet FROM Tweet tweet
            WHERE tweet.id IN :tweetIds
            AND tweet.deleted = false
            ORDER BY tweet.dateTime DESC
            """)
    List<TweetProjection> getTweetListsByIds(@Param("tweetIds") List<Long> tweetIds);

    @Query("""
            SELECT tweet.id AS tweetId, image.id AS imageId, image.src AS src FROM Tweet tweet
            LEFT JOIN tweet.images image
            WHERE tweet.scheduledDate IS NULL
            AND tweet.author.id = :userId
            AND image.id IS NOT NULL
            AND tweet.deleted = false
            ORDER BY tweet.dateTime DESC
            """)
    List<ProfileTweetImageProjection> getUserTweetImages(@Param("userId") Long userId, Pageable pageable);

    @Query("""
            SELECT COUNT(tweet) FROM Tweet tweet
            WHERE tweet.scheduledDate IS NULL
            AND tweet.deleted = false
            AND UPPER(tweet.text) LIKE UPPER(CONCAT('%',:text,'%'))
            """)
    Long getTweetCountByText(@Param("text") String text);

    List<Tweet> findAllByScheduledDate(LocalDateTime now);
}
