package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.dto.response.TopicsByCategoriesResponse;
import com.gmail.merikbest2015.enums.TopicCategory;
import com.gmail.merikbest2015.repository.projection.FollowedTopicProjection;
import com.gmail.merikbest2015.repository.projection.NotInterestedTopicProjection;
import com.gmail.merikbest2015.repository.projection.TopicProjection;

import java.util.List;

public interface TopicService {

    List<TopicProjection> getTopicsByIds(List<Long> topicsIds);

    List<TopicsByCategoriesResponse> getTopicsByCategories(List<TopicCategory> categories);

    List<FollowedTopicProjection> getFollowedTopics();

    List<TopicProjection> getFollowedTopicsByUserId(Long userId);

    List<NotInterestedTopicProjection> getNotInterestedTopics();

    Boolean processNotInterestedTopic(Long topicId);

    Boolean processFollowTopic(Long topicId);
}
