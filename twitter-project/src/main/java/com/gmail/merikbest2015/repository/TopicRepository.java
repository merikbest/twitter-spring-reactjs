package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.enums.TopicCategory;
import com.gmail.merikbest2015.model.Topic;
import com.gmail.merikbest2015.repository.projection.NotInterestedTopicProjection;
import com.gmail.merikbest2015.repository.projection.TopicProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {

    @Query("SELECT topic FROM Topic topic WHERE topic.id IN :topicsIds ORDER BY topic.id DESC")
    List<TopicProjection> getTopicsByIds(List<Long> topicsIds);

    @Query("SELECT topic FROM Topic topic WHERE topic.topicCategory = :topicCategory ORDER BY topic.id DESC")
    List<TopicProjection> getTopicsByCategory(TopicCategory topicCategory);

    @Query("SELECT topic FROM Topic topic " +
            "LEFT JOIN topic.topicFollowers topicFollower " +
            "WHERE topicFollower.id = :userId")
    <T> List<T> getFollowedTopics(Long userId, Class<T> type);

    @Query("SELECT topic FROM Topic topic " +
            "LEFT JOIN topic.topicNotInterested topicNotInterested " +
            "WHERE topicNotInterested.id = :userId")
    List<NotInterestedTopicProjection> getNotInterestedTopic(Long userId);

    @Query("SELECT CASE WHEN count(topic) > 0 THEN true ELSE false END FROM Topic topic WHERE topic.id = :topicId")
    boolean isTopicExist(Long topicId);

    @Query("SELECT CASE WHEN count(topic) > 0 THEN true ELSE false END FROM Topic topic " +
            "LEFT JOIN topic.topicFollowers topicFollower " +
            "WHERE topicFollower.id = :userId " +
            "AND topic.id = :topicId")
    boolean isTopicFollowed(Long userId, Long topicId);

    @Query("SELECT CASE WHEN count(topic) > 0 THEN true ELSE false END FROM Topic topic " +
            "LEFT JOIN topic.topicNotInterested topicNotInterested " +
            "WHERE topicNotInterested.id = :userId " +
            "AND topic.id = :topicId")
    boolean isTopicNotInterested(Long userId, Long topicId);

    @Modifying
    @Query(value = "INSERT INTO topic_not_interested (user_id, topic_id) VALUES (?1, ?2)", nativeQuery = true)
    void addNotInterestedTopic(Long userId, Long topicId);

    @Modifying
    @Query(value = "INSERT INTO topic_followers (user_id, topic_id) VALUES (?1, ?2)", nativeQuery = true)
    void addFollowedTopic(Long userId, Long topicId);

    @Modifying
    @Query(value = "DELETE FROM topic_not_interested WHERE user_id = ?1 AND topic_id = ?2", nativeQuery = true)
    void removeNotInterestedTopic(Long userId, Long topicId);

    @Modifying
    @Query(value = "DELETE FROM topic_followers WHERE user_id = ?1 AND topic_id = ?2", nativeQuery = true)
    void removeFollowedTopic(Long userId, Long topicId);
}
