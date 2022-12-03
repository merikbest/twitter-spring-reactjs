package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.TopicResponse;
import com.gmail.merikbest2015.twitterspringreactjs.model.Topic;
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

    public List<TopicResponse> getTopicsByCategory(String topicCategory) {
        List<Topic> topics = topicService.getTopicsByCategory(topicCategory);
        return basicMapper.convertToResponseList(topics, TopicResponse.class);
    }
}
