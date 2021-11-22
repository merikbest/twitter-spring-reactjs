package com.gmail.merikbest2015.twitterspringreactjs.repository;

import com.gmail.merikbest2015.twitterspringreactjs.model.LikeTweet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeTweetRepository extends JpaRepository<LikeTweet, Long> {

    @Query(value = "SELECT * FROM like_tweets WHERE users_id = ?1 ORDER BY like_tweets.like_tweet_date DESC", nativeQuery = true)
    Page<LikeTweet> findByUserId(Long userId, Pageable pageable);
}
