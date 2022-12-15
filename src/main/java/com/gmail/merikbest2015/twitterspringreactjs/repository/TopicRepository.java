package com.gmail.merikbest2015.twitterspringreactjs.repository;

import com.gmail.merikbest2015.twitterspringreactjs.enums.TopicCategory;
import com.gmail.merikbest2015.twitterspringreactjs.model.Topic;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.TopicByCategoryProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {

    @Query("SELECT topic FROM Topic topic WHERE topic.id IN :topicsIds ORDER BY topic.id DESC")
    List<TopicByCategoryProjection> getTopicsByIds(List<Long> topicsIds);

    @Query("SELECT topic FROM Topic topic WHERE topic.topicCategory = :topicCategory ORDER BY topic.id DESC")
    List<TopicByCategoryProjection> getTopicsByCategory(TopicCategory topicCategory);

    @Query("SELECT CASE WHEN count(topic) > 0 THEN true ELSE false END FROM Topic topic WHERE topic.id = :topicId")
    boolean isTopicExist(Long topicId);

    @Query("SELECT CASE WHEN count(followedTopic) > 0 THEN true ELSE false END FROM User user " +
            "LEFT JOIN user.followedTopics followedTopic " +
            "WHERE user.id = :userId " +
            "AND followedTopic.id = :topicId")
    boolean isTopicFollowed(Long userId, Long topicId);

    @Query("SELECT CASE WHEN count(notInterestedTopic) > 0 THEN true ELSE false END FROM User user " +
            "LEFT JOIN user.notInterestedTopics notInterestedTopic " +
            "WHERE user.id = :userId " +
            "AND notInterestedTopic.id = :topicId")
    boolean isTopicNotInterested(Long userId, Long topicId);

    @Modifying
    @Query(value = "INSERT INTO users_not_interested_topics (user_id, not_interested_topics_id) VALUES (?1, ?2)", nativeQuery = true)
    void addNotInterestedTopic(Long userId, Long topicId);

    @Modifying
    @Query(value = "INSERT INTO users_followed_topics (user_id, followed_topics_id) VALUES (?1, ?2)", nativeQuery = true)
    void addFollowedTopic(Long userId, Long topicId);

    @Modifying
    @Query(value = "DELETE FROM users_not_interested_topics WHERE user_id = ?1 AND not_interested_topics_id = ?2", nativeQuery = true)
    void removeNotInterestedTopic(Long userId, Long topicId);

    @Modifying
    @Query(value = "DELETE FROM users_followed_topics WHERE user_id = ?1 AND followed_topics_id = ?2", nativeQuery = true)
    void removeFollowedTopic(Long userId, Long topicId);
}
