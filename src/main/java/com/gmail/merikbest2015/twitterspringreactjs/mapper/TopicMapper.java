package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.TopicResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.TopicsByCategoriesResponse;
import com.gmail.merikbest2015.twitterspringreactjs.enums.TopicCategory;
import com.gmail.merikbest2015.twitterspringreactjs.model.Topic;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.TopicByCategoryProjection;
import com.gmail.merikbest2015.twitterspringreactjs.service.TopicService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class TopicMapper {

    private final BasicMapper basicMapper;
    private final TopicService topicService;

    public List<TopicResponse> getTopics() {
        List<Topic> topics = topicService.getTopics();
        return basicMapper.convertToResponseList(topics, TopicResponse.class);
    }

    public List<TopicResponse> getTopicsByIds(List<Long> topicsIds) {
        List<TopicByCategoryProjection> topics = topicService.getTopicsByIds(topicsIds);
        return basicMapper.convertToResponseList(topics, TopicResponse.class);
    }

    public List<TopicsByCategoriesResponse> getTopicsByCategories(List<TopicCategory> categories) {
        return topicService.getTopicsByCategories(categories);
    }

    public List<TopicResponse> getNotInterestedTopics() {
        List<Topic> topics = topicService.getNotInterestedTopics();
        return basicMapper.convertToResponseList(topics, TopicResponse.class);
    }

    public Boolean addNotInterestedTopic(Long topicId) {
        return topicService.addNotInterestedTopic(topicId);
    }

    public Boolean processFollowTopic(Long topicId) {
        return topicService.processFollowTopic(topicId);
    }
}
