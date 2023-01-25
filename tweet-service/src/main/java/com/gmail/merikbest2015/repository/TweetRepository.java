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
            "AND tweet.authorId IN :userIds " +
            "ORDER BY tweet.dateTime DESC")
    Page<TweetProjection> searchTweets(@Param("userIds") List<Long> userIds, Pageable pageable);

    @Query("SELECT tweet.authorId FROM Tweet tweet WHERE tweet.text LIKE CONCAT('%',:text,'%')")
    List<Long> getUserIdsByTweetText(@Param("text") String text);

    @Modifying
    @Query(value = "INSERT INTO replies (tweets_id, reply_id) VALUES (?1, ?2)", nativeQuery = true)
    void addReply(@Param("tweetId") Long tweetId, @Param("replyId") Long replyId);

    @Query("SELECT tweet FROM Tweet tweet WHERE tweet.id = :tweetId AND tweet.authorId = :userId")
    Optional<Tweet> getTweetByAuthorIdAndTweetId(@Param("tweetId") Long tweetId, @Param("userId") Long userId);

//    @Query("SELECT user FROM User user " +
//            "LEFT JOIN user.retweets retweet " +
//            "LEFT JOIN retweet.tweet tweet " +
//            "WHERE tweet.id = :tweetId " +
//            "ORDER BY retweet.retweetDate DESC")
//    Page<UserProjection> getRetweetedUsersByTweetId(@Param("tweetId") Long tweetId, Pageable pageable);

//    @Query("SELECT user FROM User user " +
//            "LEFT JOIN user.likedTweets likedTweet " +
//            "LEFT JOIN likedTweet.tweet tweet " +
//            "WHERE tweet.id = :tweetId " +
//            "ORDER BY likedTweet.likeTweetDate DESC")
//    Page<UserProjection> getLikedUsersByTweetId(@Param("tweetId") Long tweetId, Pageable pageable);


//    @Query("SELECT tweet FROM Tweet tweet WHERE tweet.id = :tweetId")
//    Optional<Tweet> getTweetAuthorId(@Param("tweetId") Long tweetId);
//
//    @Query("SELECT tweet FROM Tweet tweet " +
//            "LEFT JOIN tweet.user user " +
//            "WHERE user.id IN :userIds " +
//            "AND tweet.addressedUsername IS NULL " +
//            "AND tweet.deleted = false " +
//            "ORDER BY tweet.dateTime DESC")
//    Page<TweetProjection> findTweetsByUserIds(@Param("userIds") List<Long> userIds, Pageable pageable);
//
//
//    @Query("SELECT tweet FROM Tweet tweet WHERE tweet.scheduledDate <= :scheduledDate")
//    List<Tweet> findAllByScheduledDate(@Param("scheduledDate") LocalDateTime scheduledDate);
//
//    @Query("SELECT tweet FROM Tweet tweet " +
//            "WHERE tweet.user.id = :userId " +
//            "AND tweet.scheduledDate IS NOT NULL " +
//            "AND tweet.deleted = false " +
//            "ORDER BY tweet.scheduledDate DESC")
//    Page<TweetProjection> findAllScheduledTweetsByUserId(@Param("userId") Long userId, Pageable pageable);
//
//    @Query("SELECT t FROM Tweet t " +
//            "LEFT JOIN t.user u " +
//            "WHERE t.scheduledDate IS NULL AND t.deleted = false " +
//            "AND (t.text LIKE CONCAT('%',:text,'%') " +
//            "AND UPPER(u.fullName) LIKE UPPER(CONCAT('%',:text,'%')) " +
//            "OR UPPER(u.username) LIKE UPPER(CONCAT('%',:text,'%'))) " +
//            "OR t.scheduledDate IS NULL AND t.deleted = false " +
//            "AND (t.text LIKE CONCAT('%',:text,'%') " +
//            "OR UPPER(u.fullName) LIKE UPPER(CONCAT('%',:text,'%')) " +
//            "OR UPPER(u.username) LIKE UPPER(CONCAT('%',:text,'%'))) " +
//            "ORDER BY t.dateTime DESC")
//    Page<TweetProjection> findAllByText(@Param("text") String text, Pageable pageable);
//
//    @Query("SELECT tweet FROM Tweet tweet " +
//            "WHERE tweet.scheduledDate IS NULL " +
//            "AND tweet.deleted = false " +
//            "AND tweet.text LIKE CONCAT('%','youtu','%')")
//    Page<TweetProjection> findAllTweetsWithVideo(Pageable pageable);
//
//    @Query("SELECT tweet FROM Tweet tweet " +
//            "WHERE tweet.scheduledDate IS NULL " +
//            "AND tweet.images.size != 0 " +
//            "AND tweet.deleted = false " +
//            "ORDER BY tweet.dateTime DESC")
//    Page<TweetProjection> findAllTweetsWithImages(Pageable pageable);
//
//    @Query("SELECT tweet FROM Tweet tweet " +
//            "LEFT JOIN tweet.images image " +
//            "WHERE tweet.scheduledDate IS NULL AND tweet.deleted = false " +
//            "AND (tweet.user.id = :userId AND image.id IS NOT NULL) " +
//            "OR tweet.scheduledDate IS NULL AND tweet.deleted = false " +
//            "AND (tweet.user.id = :userId AND tweet.text LIKE CONCAT('%','youtu','%')) " +
//            "ORDER BY tweet.dateTime DESC")
//    Page<TweetProjection> getAllUserMediaTweets(@Param("userId") Long userId, Pageable pageable);
//
//    @Query("SELECT tweet.id AS tweetId, image.id AS imageId, image.src AS src FROM Tweet tweet " +
//            "LEFT JOIN tweet.images image " +
//            "WHERE tweet.scheduledDate IS NULL " +
//            "AND tweet.user.id = :userId " +
//            "AND image.id IS NOT NULL " +
//            "AND tweet.deleted = false " +
//            "ORDER BY tweet.dateTime DESC")
//    List<TweetImageProjection> getUserTweetImages(@Param("userId") Long userId, Pageable pageable);
//
//    @Query("SELECT tweet FROM Tweet tweet WHERE tweet.quoteTweet.id = :quoteId")
//    List<Tweet> findByQuoteTweetId(@Param("quoteId") Long quoteId);
//
//    @Query("SELECT t as tweet FROM Tweet t " +
//            "WHERE t.user.id = :userId " +
//            "AND t.addressedUsername IS NULL " +
//            "AND t.scheduledDate IS NULL " +
//            "AND t.deleted = false " +
//            "ORDER BY t.dateTime DESC")
//    List<TweetsUserProjection> getTweetsByUserId(@Param("userId") Long userId);
//
//    @Query("SELECT t as tweet FROM Tweet t " +
//            "WHERE t.user.id = :userId " +
//            "AND t.addressedUsername IS NOT NULL " +
//            "AND t.scheduledDate IS NULL " +
//            "AND t.deleted = false " +
//            "ORDER BY t.dateTime DESC")
//    List<TweetsUserProjection> getRepliesByUserId(@Param("userId") Long userId);
//
//    @Query("SELECT pinnedTweet as tweet FROM User user LEFT JOIN user.pinnedTweet pinnedTweet WHERE user.id = :userId")
//    Optional<TweetsUserProjection> getPinnedTweetByUserId(@Param("userId") Long userId);
//
//    @Query("SELECT notificationTweet as tweet " +
//            "FROM User user " +
//            "LEFT JOIN user.notifications notification " +
//            "LEFT JOIN notification.tweet notificationTweet " +
//            "WHERE user.id = :userId " +
//            "AND notification.notificationType = 'TWEET' " +
//            "AND notificationTweet.deleted = false " +
//            "ORDER BY notificationTweet.dateTime DESC")
//    List<TweetsProjection> getNotificationsFromTweetAuthors(@Param("userId") Long userId);
//
////    @Query("SELECT tagTweet as tweet " +
////            "FROM Tag tag " +
////            "LEFT JOIN tag.tweets tagTweet " +
////            "WHERE tag.tagName = :tagName " +
////            "AND tagTweet.deleted = false " +
////            "ORDER BY tagTweet.dateTime DESC")
////    List<TweetsProjection> getTweetsByTagName(@Param("tagName") String tagName);
//
//    @Query("SELECT tweet FROM Tweet tweet " +
//            "WHERE tweet.id IN :tweetIds " +
//            "AND tweet.deleted = false " +
//            "ORDER BY tweet.dateTime DESC")
//    List<TweetProjection> getTweetsByIds(@Param("tweetIds") List<Long> tweetIds);
//
//    @Query("SELECT u.id FROM Tweet tweet " +
//            "LEFT JOIN tweet.retweets retweet " +
//            "LEFT JOIN retweet.user u " +
//            "WHERE tweet.id = :tweetId")
//    List<Long> getRetweetsUserIds(@Param("tweetId") Long tweetId);
//
//    @Query("SELECT CASE WHEN count(user) > 0 THEN true ELSE false END " +
//            "FROM User user " +
//            "LEFT JOIN user.likedTweets likedTweet " +
//            "WHERE user.id = :userId " +
//            "AND likedTweet.tweet.id = :tweetId")
//    boolean isUserLikedTweet(@Param("userId") Long userId, @Param("tweetId") Long tweetId);
//
//    @Query("SELECT CASE WHEN count(user) > 0 THEN true ELSE false END " +
//            "FROM User user " +
//            "LEFT JOIN user.retweets retweets " +
//            "WHERE user.id = :userId " +
//            "AND retweets.tweet.id = :tweetId")
//    boolean isUserRetweetedTweet(@Param("userId") Long userId, @Param("tweetId") Long tweetId);
//
//    @Query("SELECT CASE WHEN count(user) > 0 THEN true ELSE false END " +
//            "FROM User user " +
//            "LEFT JOIN user.bookmarks bookmark " +
//            "WHERE user.id = :userId " +
//            "AND bookmark.tweet.id = :tweetId")
//    boolean isUserBookmarkedTweet(@Param("userId") Long userId, @Param("tweetId") Long tweetId);
//
//    @Query("SELECT rp as tweet FROM Tweet t " +
//            "LEFT JOIN t.replies rp " +
//            "WHERE t.id = :tweetId " +
//            "AND rp.deleted = false " +
//            "ORDER BY rp.dateTime DESC")
//    List<TweetsProjection> getRepliesByTweetId(@Param("tweetId") Long tweetId);
//
//    @Query("SELECT user FROM User user " +
//            "LEFT JOIN user.likedTweets likedTweet " +
//            "LEFT JOIN likedTweet.tweet tweet " +
//            "WHERE tweet.id = :tweetId " +
//            "ORDER BY likedTweet.likeTweetDate DESC")
//    Page<UserProjection> getLikedUsersByTweetId(@Param("tweetId") Long tweetId, Pageable pageable);
//
//    @Query("SELECT user FROM User user " +
//            "LEFT JOIN user.retweets retweet " +
//            "LEFT JOIN retweet.tweet tweet " +
//            "WHERE tweet.id = :tweetId " +
//            "ORDER BY retweet.retweetDate DESC")
//    Page<UserProjection> getRetweetedUsersByTweetId(@Param("tweetId") Long tweetId, Pageable pageable);
//
//    @Query("SELECT tweet FROM Tweet tweet " +
//            "LEFT JOIN tweet.quoteTweet quoteTweet " +
//            "WHERE quoteTweet.id = :tweetId " +
//            "AND quoteTweet.deleted = false")
//    Page<TweetProjection> getQuotesByTweetId(@Param("tweetId") Long tweetId, Pageable pageable);
//
//    @Query("SELECT user FROM User user " +
//            "LEFT JOIN user.tweets tweet " +
//            "LEFT JOIN tweet.quoteTweet quoteTweet " +
//            "LEFT JOIN quoteTweet.user quoteTweetUser " +
//            "WHERE quoteTweet.id = :tweetId " +
//            "AND quoteTweetUser.id = :userId ")
//    List<UserProjection> getQuotedUsersByTweetId(@Param("userId") Long userId, @Param("tweetId") Long tweetId);
//
//    @Query("SELECT tweet FROM Tweet tweet " +
//            "WHERE tweet.addressedId = :userId " +
//            "AND tweet.deleted = false " +
//            "ORDER BY tweet.dateTime DESC")
//    Page<TweetProjection> getUserMentions(@Param("userId") Long userId, Pageable pageable);
//
//    @Modifying
//    @Query(value = "INSERT INTO replies (tweets_id, reply_id) VALUES (?1, ?2)", nativeQuery = true)
//    void addReply(@Param("tweetId") Long tweetId, @Param("replyId") Long replyId);

    // NEW
    @Query("SELECT tweet FROM Tweet tweet WHERE tweet.id = :tweetId")
    NotificationTweetProjection getNotificationTweet(@Param("tweetId") Long tweetId);
}
