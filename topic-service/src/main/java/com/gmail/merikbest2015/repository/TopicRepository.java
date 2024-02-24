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

    @Query("SELECT topic FROM Topic topic WHERE topic.id IN :topicsIds ORDER BY topic.id DESC")
    List<TopicProjection> getTopicsByIds(@Param("topicsIds") List<Long> topicsIds);

    @Query("SELECT topic FROM Topic topic WHERE topic.topicCategory = :topicCategory ORDER BY topic.id DESC")
    List<TopicProjection> getTopicsByCategory(@Param("topicCategory") TopicCategory topicCategory);

    @Query("""
            SELECT topic FROM Topic topic
            JOIN topic.topicFollowers topicFollower
            WHERE topicFollower.id = :userId
            ORDER BY topic.id DESC
            """)
    <T> List<T> getTopicsByTopicFollowerId(@Param("userId") Long userId, Class<T> type);

    @Query("""
            SELECT topic FROM Topic topic
            JOIN topic.topicNotInterested topicNotInterested
            WHERE topicNotInterested.id = :userId
            ORDER BY topic.id DESC
            """)
    List<NotInterestedTopicProjection> getTopicsByNotInterestedUserId(@Param("userId") Long userId);

    @Query("""
            SELECT CASE WHEN count(topic) > 0 THEN true ELSE false END FROM Topic topic
            JOIN topic.topicFollowers topicFollower
            WHERE topicFollower.id = :userId
            AND topic.id = :topicId
            """)
    boolean isTopicFollowed(@Param("userId") Long userId, @Param("topicId") Long topicId);

    @Query("""
            SELECT CASE WHEN count(topic) > 0 THEN true ELSE false END FROM Topic topic
            JOIN topic.topicNotInterested topicNotInterested
            WHERE topicNotInterested.id = :userId
            AND topic.id = :topicId
            """)
    boolean isTopicNotInterested(@Param("userId") Long userId, @Param("topicId") Long topicId);

    @Query("SELECT CASE WHEN count(topic) > 0 THEN true ELSE false END FROM Topic topic WHERE topic.id = :topicId")
    boolean isTopicExist(@Param("topicId") Long topicId);
}
