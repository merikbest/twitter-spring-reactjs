package com.gmail.merikbest2015.twitterspringreactjs.repository;

import com.gmail.merikbest2015.twitterspringreactjs.enums.TopicCategory;
import com.gmail.merikbest2015.twitterspringreactjs.model.Topic;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.TopicByCategoryProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {

    @Query("SELECT topic FROM Topic topic WHERE topic.id IN :topicsIds ORDER BY topic.id DESC")
    List<TopicByCategoryProjection> getTopicsByIds(List<Long> topicsIds);

    @Query("SELECT topic FROM Topic topic WHERE topic.topicCategory = :topicCategory ORDER BY topic.id DESC")
    List<TopicByCategoryProjection> getTopicsByCategory(TopicCategory topicCategory);
}
