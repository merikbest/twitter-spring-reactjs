package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.enums.TopicCategory;
import com.gmail.merikbest2015.model.Topic;
import com.gmail.merikbest2015.repository.projection.NotInterestedTopicProjection;
import com.gmail.merikbest2015.repository.projection.TopicProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {
    String TOPIC_EXPRESSION = "topic.id as id, topic.topicName as topicName, topic.topicCategory as topicCategory";

    @Query("SELECT topic FROM Topic topic WHERE topic.id IN :topicsIds ORDER BY topic.id DESC")
    List<TopicProjection> getTopicsByIds(@Param("topicsIds") List<Long> topicsIds);

    @Query("SELECT " + TOPIC_EXPRESSION + " FROM Topic topic " +
            "WHERE topic.id IN (" +
            "   SELECT follower.topicId FROM TopicFollowers follower " +
            "   WHERE follower.userId = :userId" +
            ") ORDER BY topic.id DESC")
    <T> List<T> getTopicsByTopicFollowerId(@Param("userId") Long userId, Class<T> type);

    @Query("SELECT " + TOPIC_EXPRESSION + " FROM Topic topic " +
            "WHERE topic.id IN (" +
            "   SELECT notInterested.topicId FROM TopicNotInterested notInterested " +
            "   WHERE notInterested.userId = :userId" +
            ") ORDER BY topic.id DESC")
    List<NotInterestedTopicProjection> getTopicsByNotInterestedUserId(@Param("userId") Long userId);

    @Query("SELECT topic FROM Topic topic WHERE topic.topicCategory = :topicCategory ORDER BY topic.id DESC")
    List<TopicProjection> getTopicsByCategory(@Param("topicCategory") TopicCategory topicCategory);

    @Query("SELECT CASE WHEN count(topic) > 0 THEN true ELSE false END FROM Topic topic WHERE topic.id = :topicId")
    boolean isTopicExist(@Param("topicId") Long topicId);
}
