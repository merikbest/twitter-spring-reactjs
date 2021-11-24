package com.gmail.merikbest2015.twitterspringreactjs.repository;

import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TweetRepository extends JpaRepository<Tweet, Long> {

    @Query(value = "SELECT * FROM tweets " +
            "LEFT JOIN tweet_quote ON tweets.id = tweet_quote.tweets_id " +
            "LEFT JOIN tweet_pool ON tweets.id = tweet_pool.tweets_id " +
            "WHERE tweets.addressed_username IS NULL " +
            "AND tweets.scheduled_date IS NULL " +
            "ORDER BY tweets.date_time DESC", nativeQuery = true)
    Page<Tweet> findAllTweets(Pageable pageable);

    @Query(value = "SELECT * FROM tweets " +
            "LEFT JOIN tweet_quote ON tweets.id = tweet_quote.tweets_id " +
            "LEFT JOIN tweet_pool ON tweets.id = tweet_pool.tweets_id " +
            "WHERE users_id = ?1 " +
            "AND tweets.scheduled_date IS NULL", nativeQuery = true)
    List<Tweet> findAllByUserId(Long userId);

    @Query(value = "SELECT * FROM tweets " +
            "LEFT JOIN tweet_quote ON tweets.id = tweet_quote.tweets_id " +
            "LEFT JOIN tweet_pool ON tweets.id = tweet_pool.tweets_id " +
            "WHERE tweets.scheduled_date <= ?1", nativeQuery = true)
    List<Tweet> findAllByScheduledDate(LocalDateTime scheduledDate);

    @Query(value = "SELECT * FROM tweets " +
            "LEFT JOIN tweet_quote ON tweets.id = tweet_quote.tweets_id " +
            "LEFT JOIN tweet_pool ON tweets.id = tweet_pool.tweets_id " +
            "WHERE tweets.users_id = ?1 " +
            "AND tweets.scheduled_date IS NOT NULL " +
            "ORDER BY tweets.scheduled_date DESC", nativeQuery = true)
    List<Tweet> findAllScheduledTweetsByUserId(Long userId);

    @Query(value = "SELECT * FROM tweets " +
            "WHERE tweets.scheduled_date IS NULL " +
            "AND UPPER(text) LIKE UPPER(?1)", nativeQuery = true)
    List<Tweet> findAllByText(String text);

    @Query(value = "SELECT * FROM tweets " +
            "LEFT JOIN tweet_quote ON tweets.id = tweet_quote.tweets_id " +
            "LEFT JOIN tweet_pool ON tweets.id = tweet_pool.tweets_id " +
            "WHERE tweets.scheduled_date IS NULL " +
            "AND UPPER(text) LIKE UPPER('%youtu%')", nativeQuery = true)
    Page<Tweet> findAllTweetsWithVideo(Pageable pageable);

    @Query(value = "SELECT * FROM tweets " +
            "LEFT JOIN tweets_images ON tweets.id = tweets_images.tweet_id " +
            "LEFT JOIN tweet_quote ON tweets.id = tweet_quote.tweets_id " +
            "LEFT JOIN tweet_pool ON tweets.id = tweet_pool.tweets_id " +
            "WHERE tweets.scheduled_date IS NULL " +
            "AND tweets_images.images_id IS NOT NULL " +
            "ORDER BY tweets.date_time DESC", nativeQuery = true)
    Page<Tweet> findAllTweetsWithImages(Pageable pageable);

    @Query(value = "SELECT * FROM tweets " +
            "LEFT JOIN users_tweets ON tweets.id = users_tweets.tweets_id " +
            "LEFT JOIN tweets_images ON tweets.id = tweets_images.tweet_id " +
            "LEFT JOIN tweet_quote ON tweets.id = tweet_quote.tweets_id " +
            "LEFT JOIN tweet_pool ON tweets.id = tweet_pool.tweets_id " +
            "WHERE tweets.scheduled_date IS NULL " +
            "AND tweets_images.images_id IS NOT NULL " +
            "AND users_tweets.user_id = ?1 " +
            "OR UPPER(text) LIKE UPPER('%youtu%') " +
            "ORDER BY tweets.date_time DESC", nativeQuery = true)
    Page<Tweet> findAllUserMediaTweets(Long userId, Pageable pageable);

    @Query(value = "SELECT * FROM tweets " +
            "LEFT JOIN users_tweets ON tweets.id = users_tweets.tweets_id " +
            "LEFT JOIN tweets_images ON tweets.id = tweets_images.tweet_id " +
            "LEFT JOIN tweet_quote ON tweets.id = tweet_quote.tweets_id " +
            "LEFT JOIN tweet_pool ON tweets.id = tweet_pool.tweets_id " +
            "WHERE tweet_quote.quote_tweet_id = ?1", nativeQuery = true)
    List<Tweet> findByQuoteTweetId(Long quoteId);

    @Query(value = "SELECT * FROM tweets " +
            "LEFT JOIN users_tweets ON tweets.id = users_tweets.tweets_id " +
            "LEFT JOIN tweets_images ON tweets.id = tweets_images.tweet_id " +
            "LEFT JOIN tweet_quote ON tweets.id = tweet_quote.tweets_id " +
            "LEFT JOIN tweet_pool ON tweets.id = tweet_pool.tweets_id " +
            "WHERE tweets.users_id = ?1 " +
            "AND tweets.addressed_username IS NULL " +
            "AND tweets.scheduled_date IS NULL " +
            "ORDER BY tweets.date_time DESC", nativeQuery = true)
    List<Tweet> findTweetsByUserId(Long userId);

    @Query(value = "SELECT * FROM tweets " +
            "LEFT JOIN users_tweets ON tweets.id = users_tweets.tweets_id " +
            "LEFT JOIN tweets_images ON tweets.id = tweets_images.tweet_id " +
            "LEFT JOIN tweet_quote ON tweets.id = tweet_quote.tweets_id " +
            "LEFT JOIN tweet_pool ON tweets.id = tweet_pool.tweets_id " +
            "WHERE tweets.users_id = ?1 " +
            "AND tweets.addressed_username IS NOT NULL " +
            "AND tweets.scheduled_date IS NULL " +
            "ORDER BY tweets.date_time DESC", nativeQuery = true)
    List<Tweet> findRepliesByUserId(Long userId);
}
