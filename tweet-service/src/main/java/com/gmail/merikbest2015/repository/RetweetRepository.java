package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.Tweet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RetweetRepository extends JpaRepository<Tweet, Long> {

    @Query("""
            SELECT CASE WHEN count(tweet) > 0 THEN true ELSE false END
            FROM Tweet tweet
            WHERE tweet.author.id = :userId
            AND tweet.retweet.id = :tweetId
            """)
    boolean isUserRetweetedTweet(@Param("userId") Long userId, @Param("tweetId") Long tweetId);

    @Query("SELECT COUNT(tweet) FROM Tweet tweet WHERE tweet.retweet.id = :tweetId")
    Long getRetweetSize(@Param("tweetId") Long tweetId);

    @Query("SELECT tweet.author.id FROM Tweet tweet WHERE tweet.retweet.id = :tweetId")
    List<Long> getRetweetsUserIds(@Param("tweetId") Long tweetId);
}
