package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.commons.enums.TopicCategory;
import com.gmail.merikbest2015.commons.models.Topic;
import com.gmail.merikbest2015.repository.projection.NotInterestedTopicProjection;
import com.gmail.merikbest2015.repository.projection.TopicProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
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

    @Query("SELECT topic FROM Topic topic " +
            "LEFT JOIN topic.topicFollowers topicFollower " +
            "WHERE topicFollower.id = :userId")
    <T> List<T> getFollowedTopics(@Param("userId") Long userId, Class<T> type);

    @Query("SELECT topic FROM Topic topic " +
            "LEFT JOIN topic.topicNotInterested topicNotInterested " +
            "WHERE topicNotInterested.id = :userId")
    List<NotInterestedTopicProjection> getNotInterestedTopic(@Param("userId") Long userId);

    @Query("SELECT CASE WHEN count(topic) > 0 THEN true ELSE false END FROM Topic topic WHERE topic.id = :topicId")
    boolean isTopicExist(@Param("topicId") Long topicId);

    @Query("SELECT CASE WHEN count(topic) > 0 THEN true ELSE false END FROM Topic topic " +
            "LEFT JOIN topic.topicFollowers topicFollower " +
            "WHERE topicFollower.id = :userId " +
            "AND topic.id = :topicId")
    boolean isTopicFollowed(@Param("userId") Long userId, @Param("topicId") Long topicId);

    @Query("SELECT CASE WHEN count(topic) > 0 THEN true ELSE false END FROM Topic topic " +
            "LEFT JOIN topic.topicNotInterested topicNotInterested " +
            "WHERE topicNotInterested.id = :userId " +
            "AND topic.id = :topicId")
    boolean isTopicNotInterested(@Param("userId") Long userId, @Param("topicId") Long topicId);

    @Modifying
    @Query(value = "INSERT INTO topic_not_interested (user_id, topic_id) VALUES (?1, ?2)", nativeQuery = true)
    void addNotInterestedTopic(@Param("userId") Long userId, @Param("topicId") Long topicId);

    @Modifying
    @Query(value = "INSERT INTO topic_followers (user_id, topic_id) VALUES (?1, ?2)", nativeQuery = true)
    void addFollowedTopic(@Param("userId") Long userId, @Param("topicId") Long topicId);

    @Modifying
    @Query(value = "DELETE FROM topic_not_interested WHERE user_id = ?1 AND topic_id = ?2", nativeQuery = true)
    void removeNotInterestedTopic(@Param("userId") Long userId, @Param("topicId") Long topicId);

    @Modifying
    @Query(value = "DELETE FROM topic_followers WHERE user_id = ?1 AND topic_id = ?2", nativeQuery = true)
    void removeFollowedTopic(@Param("userId") Long userId, @Param("topicId") Long topicId);
}
