package com.gmail.merikbest2015.twitterspringreactjs.service.impl;

import com.gmail.merikbest2015.twitterspringreactjs.exception.ApiRequestException;
import com.gmail.merikbest2015.twitterspringreactjs.model.Topic;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import com.gmail.merikbest2015.twitterspringreactjs.repository.TopicRepository;
import com.gmail.merikbest2015.twitterspringreactjs.service.AuthenticationService;
import com.gmail.merikbest2015.twitterspringreactjs.service.TopicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TopicServiceImpl implements TopicService {

    private final AuthenticationService authenticationService;
    private final TopicRepository topicRepository;

    @Override
    public List<Topic> getTopics() {
        return topicRepository.findAll();
    }

    @Override
    public List<Topic> getTopicsByCategory(String topicCategory) {
        return topicRepository.getTopicsByCategory(topicCategory);
    }

    @Override
    public List<Topic> getNotInterestedTopics() {
        User user = authenticationService.getAuthenticatedUser();
        return user.getNotInterestedTopics();
    }

    @Override
    @Transactional
    public Boolean addNotInterestedTopic(Long topicId) {
        User user = authenticationService.getAuthenticatedUser();
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new ApiRequestException("Topic not found", HttpStatus.NOT_FOUND));
        List<Topic> notInterestedTopics = user.getNotInterestedTopics();
        notInterestedTopics.add(topic);
        return true;
    }
}
