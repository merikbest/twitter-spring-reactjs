package com.gmail.merikbest2015.twitterspringreactjs.service;

import com.gmail.merikbest2015.twitterspringreactjs.model.Topic;

import java.util.List;

public interface TopicService {
    List<Topic> getTopics();

    List<Topic> getTopicsByCategory(String topicCategory);

    List<Topic> getNotInterestedTopics();

    Boolean addNotInterestedTopic(Long topicId);
}
