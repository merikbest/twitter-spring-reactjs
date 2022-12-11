package com.gmail.merikbest2015.twitterspringreactjs.service;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.TopicsByCategoriesResponse;
import com.gmail.merikbest2015.twitterspringreactjs.enums.TopicCategory;
import com.gmail.merikbest2015.twitterspringreactjs.model.Topic;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.TopicByCategoryProjection;

import java.util.List;

public interface TopicService {
    List<Topic> getTopics();

    List<TopicByCategoryProjection> getTopicsByIds(List<Long> topicsIds);

    List<TopicsByCategoriesResponse> getTopicsByCategories(List<TopicCategory> categories);

    List<Topic> getNotInterestedTopics();

    Boolean addNotInterestedTopic(Long topicId);

    Boolean processFollowTopic(Long topicId);
}
