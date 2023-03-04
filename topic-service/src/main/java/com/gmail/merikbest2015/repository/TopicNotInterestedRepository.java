package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.TopicNotInterested;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TopicNotInterestedRepository extends JpaRepository<TopicNotInterested, Long> {

    @Query("SELECT notInterested FROM TopicNotInterested notInterested " +
            "WHERE notInterested.userId = :userId " +
            "AND notInterested.topicId = :topicId")
    TopicNotInterested getNotInterestedByUserIdAndTopicId(@Param("userId") Long userId, @Param("topicId") Long topicId);

    @Query("SELECT CASE WHEN count(notInterested) > 0 THEN true ELSE false END FROM TopicNotInterested notInterested " +
            "WHERE notInterested.userId = :userId " +
            "AND notInterested.topicId = :topicId")
    boolean isTopicNotInterested(@Param("userId") Long userId, @Param("topicId") Long topicId);

    @Modifying
    @Query(value = "DELETE FROM topic_not_interested WHERE user_id = ?1 AND topic_id = ?2", nativeQuery = true)
    void removeNotInterestedTopic(@Param("userId") Long userId, @Param("topicId") Long topicId);
}
