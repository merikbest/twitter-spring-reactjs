package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.TweetTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TweetTagRepository extends JpaRepository<TweetTag, Long> {

    @Query("SELECT tweetTag.tagId FROM TweetTag tweetTag WHERE tweetTag.tweetId = :tweetId")
    List<Long> getTagIdsByTweetId(@Param("tweetId") Long tweetId);

    @Query("SELECT tweetTag.tweetId FROM TweetTag tweetTag WHERE tweetTag.tagId = :tagId")
    List<Long> getTweetIdsByTagId(@Param("tagId") Long tagId);

    @Modifying
    @Query(value = "DELETE FROM tweet_tags WHERE tag_id = ?1", nativeQuery = true)
    void deleteTag(@Param("tagId") Long tagId);
}
