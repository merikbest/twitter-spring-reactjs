package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.client.user.AuthenticationClient;
import com.gmail.merikbest2015.dto.response.TopicsByCategoriesResponse;
import com.gmail.merikbest2015.commons.enums.TopicCategory;
import com.gmail.merikbest2015.commons.exception.ApiRequestException;
import com.gmail.merikbest2015.repository.TopicRepository;
import com.gmail.merikbest2015.repository.projection.FollowedTopicProjection;
import com.gmail.merikbest2015.repository.projection.NotInterestedTopicProjection;
import com.gmail.merikbest2015.repository.projection.TopicProjection;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TopicServiceImpl implements TopicService {

    private final TopicRepository topicRepository;
    private final AuthenticationClient authenticationClient;

    @Override
    public List<TopicProjection> getTopicsByIds(List<Long> topicsIds) {
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
    public List<FollowedTopicProjection> getFollowedTopics() {
        Long userId = authenticationClient.getAuthenticatedUserId();
        return topicRepository.getFollowedTopics(userId, FollowedTopicProjection.class);
    }

    @Override
    public List<TopicProjection> getFollowedTopicsByUserId(Long userId) {
        // TODO add check isMyProfileBlocked and isPrivateProfile
        return topicRepository.getFollowedTopics(userId, TopicProjection.class);
    }

    @Override
    public List<NotInterestedTopicProjection> getNotInterestedTopics() {
        Long userId = authenticationClient.getAuthenticatedUserId();
        return topicRepository.getNotInterestedTopic(userId);
    }

    @Override
    @Transactional
    public Boolean processNotInterestedTopic(Long topicId) {
        checkIsTopicExist(topicId);
        Long userId = authenticationClient.getAuthenticatedUserId();
        boolean isTopicNotInterested = topicRepository.isTopicNotInterested(userId, topicId);

        if (isTopicNotInterested) {
            topicRepository.removeNotInterestedTopic(userId, topicId);
            return false;
        } else {
            topicRepository.removeFollowedTopic(userId, topicId);
            topicRepository.addNotInterestedTopic(userId, topicId);
            return true;
        }
    }

    @Override
    @Transactional
    public Boolean processFollowTopic(Long topicId) {
        checkIsTopicExist(topicId);
        Long userId = authenticationClient.getAuthenticatedUserId();
        boolean isTopicFollowed = topicRepository.isTopicFollowed(userId, topicId);

        if (isTopicFollowed) {
            topicRepository.removeFollowedTopic(userId, topicId);
            return false;
        } else {
            topicRepository.removeNotInterestedTopic(userId, topicId);
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

    public boolean isTopicFollowed(Long topicId) {
        Long userId = authenticationClient.getAuthenticatedUserId();
        return topicRepository.isTopicFollowed(userId, topicId);
    }

    public boolean isTopicNotInterested(Long topicId) {
        Long userId = authenticationClient.getAuthenticatedUserId();
        return topicRepository.isTopicNotInterested(userId, topicId);
    }
}
