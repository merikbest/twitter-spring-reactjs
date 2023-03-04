package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.TopicFollowers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TopicFollowersRepository extends JpaRepository<TopicFollowers, Long> {

    @Query("SELECT follower FROM TopicFollowers follower " +
            "WHERE follower.userId = :userId " +
            "AND follower.topicId = :topicId")
    TopicFollowers getFollowerByUserIdAndTopicId(@Param("userId") Long userId, @Param("topicId") Long topicId);

    @Query("SELECT CASE WHEN count(follower) > 0 THEN true ELSE false END FROM TopicFollowers follower " +
            "WHERE follower.userId = :userId " +
            "AND follower.topicId = :topicId")
    boolean isTopicFollowed(@Param("userId") Long userId, @Param("topicId") Long topicId);

    @Modifying
    @Query(value = "DELETE FROM topic_followers WHERE user_id = ?1 AND topic_id = ?2", nativeQuery = true)
    void removeFollowedTopic(@Param("userId") Long userId, @Param("topicId") Long topicId);
}
