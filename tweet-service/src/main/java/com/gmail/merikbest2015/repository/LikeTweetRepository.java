package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.LikeTweet;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.projection.LikeTweetProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeTweetRepository extends JpaRepository<LikeTweet, LikeTweet.TweetUserId> {

    @Query("""
            SELECT likeTweet FROM LikeTweet likeTweet
            WHERE likeTweet.user.id = :userId
            ORDER BY likeTweet.likeTweetDate DESC
            """)
    Page<LikeTweetProjection> getUserLikedTweets(@Param("userId") Long userId, Pageable pageable);

    @Query("""
            SELECT CASE WHEN count(likeTweet) > 0 THEN true ELSE false END
            FROM LikeTweet likeTweet
            WHERE likeTweet.user.id = :userId
            AND likeTweet.tweet.id = :tweetId
            """)
    boolean isUserLikedTweet(@Param("userId") Long userId, @Param("tweetId") Long tweetId);

    @Query("SELECT COUNT(likeTweet) FROM LikeTweet likeTweet WHERE likeTweet.tweet.id = :tweetId")
    Long getLikedTweetsSize(@Param("tweetId") Long tweetId);

    @Query("SELECT likeTweet.user.id FROM LikeTweet likeTweet WHERE likeTweet.tweet.id = :tweetId")
    List<Long> getLikedUserIds(@Param("tweetId") Long tweetId);

    @Query("""
            SELECT likeTweet FROM LikeTweet likeTweet
            WHERE likeTweet.user = :user
            AND likeTweet.tweet = :tweet
            """)
    LikeTweet getLikedTweet(@Param("user") User user, @Param("tweet") Tweet tweet);
}
