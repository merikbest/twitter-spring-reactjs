package com.gmail.merikbest2015.twitterspringreactjs.service.impl;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.TopicsByCategoriesResponse;
import com.gmail.merikbest2015.twitterspringreactjs.enums.TopicCategory;
import com.gmail.merikbest2015.twitterspringreactjs.exception.ApiRequestException;
import com.gmail.merikbest2015.twitterspringreactjs.model.Topic;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import com.gmail.merikbest2015.twitterspringreactjs.repository.TopicRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.TopicByCategoryProjection;
import com.gmail.merikbest2015.twitterspringreactjs.service.AuthenticationService;
import com.gmail.merikbest2015.twitterspringreactjs.service.TopicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    public List<TopicByCategoryProjection> getTopicsByIds(List<Long> topicsIds) {
        return topicRepository.getTopicsByIds(topicsIds);
    }

    @Override
    public List<TopicsByCategoriesResponse> getTopicsByCategories(List<TopicCategory> categories) {
        List<TopicsByCategoriesResponse> topicsByCategories = new ArrayList<>();
        categories.forEach(topicCategory -> {
            TopicsByCategoriesResponse response = new TopicsByCategoriesResponse();
            response.setTopicCategory(topicCategory.toString());
            response.setTopicsByCategories(topicRepository.getTopicsByCategory(topicCategory));
            topicsByCategories.add(response);
        });
        return topicsByCategories;
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

    @Override
    @Transactional
    public Boolean processFollowTopic(Long topicId) {
        User user = authenticationService.getAuthenticatedUser();
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new ApiRequestException("Topic not found", HttpStatus.NOT_FOUND));
        List<Topic> notInterestedTopics = user.getNotInterestedTopics();
        Optional<Topic> topicFromList = notInterestedTopics.stream()
                .filter(notInterestedTopic -> notInterestedTopic.getId().equals(topic.getId()))
                .findFirst();

        if (topicFromList.isPresent()) {
            notInterestedTopics.remove(topicFromList.get());
            return false;
        } else {
            notInterestedTopics.add(topic);
            return true;
        }
    }
}
