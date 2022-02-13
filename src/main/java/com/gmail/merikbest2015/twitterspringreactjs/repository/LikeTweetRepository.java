package com.gmail.merikbest2015.twitterspringreactjs.repository;

import com.gmail.merikbest2015.twitterspringreactjs.model.LikeTweet;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.LikeTweetProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeTweetRepository extends JpaRepository<LikeTweet, Long> {

    @Query("SELECT likeTweet FROM LikeTweet likeTweet WHERE likeTweet.user.id = :userId ORDER BY likeTweet.likeTweetDate DESC")
    Page<LikeTweetProjection> findByUserId(Long userId, Pageable pageable);

    @Query("SELECT COUNT(likedTweet) FROM Tweet tweet LEFT JOIN tweet.likedTweets likedTweet WHERE tweet.id = :tweetId")
    Integer getLikedTweetsCount(Long tweetId);
}
