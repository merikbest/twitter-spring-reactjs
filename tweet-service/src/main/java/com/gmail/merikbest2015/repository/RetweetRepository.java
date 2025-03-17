package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.Tweet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RetweetRepository extends JpaRepository<Tweet, Long> {

    @Query("""
            SELECT CASE WHEN count(tweet) > 0 THEN true ELSE false END
            FROM Tweet tweet
            WHERE tweet.author.id = :userId
            AND tweet.retweet.id = :tweetId
            """)
    boolean isUserRetweetedTweet(@Param("userId") Long userId, @Param("tweetId") Long tweetId);
}
