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

@Service
@RequiredArgsConstructor
public class TopicServiceImpl implements TopicService {

    private final AuthenticationService authenticationService;
    private final TopicRepository topicRepository;

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
    public Boolean processNotInterestedTopic(Long topicId) {
        checkIsTopicExist(topicId);
        Long userId = authenticationService.getAuthenticatedUserId();
        boolean isNotInterestedTopicExist = topicRepository.isNotInterestedTopicExist(userId, topicId);

        if (isNotInterestedTopicExist) {
            topicRepository.removeNotInterestedTopic(userId);
            return false;
        } else {
            topicRepository.addNotInterestedTopic(userId, topicId);
            return true;
        }
    }

    @Override
    @Transactional
    public Boolean processFollowTopic(Long topicId) {
        checkIsTopicExist(topicId);
        Long userId = authenticationService.getAuthenticatedUserId();
        boolean isFollowedTopicExist = topicRepository.isFollowedTopicExist(userId, topicId);

        if (isFollowedTopicExist) {
            topicRepository.removeFollowedTopic(userId);
            return false;
        } else {
            topicRepository.addFollowedTopic(userId, topicId);
            return true;
        }
    }

    private void checkIsTopicExist(Long topicId) {
        boolean isTopicExist = topicRepository.isTopicExist(topicId);

        if (!isTopicExist) {
            throw new ApiRequestException("Topic not found", HttpStatus.NOT_FOUND);
        }
    }
}
