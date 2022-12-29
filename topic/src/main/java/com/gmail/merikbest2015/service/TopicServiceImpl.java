package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.dto.response.TopicsByCategoriesResponse;
import com.gmail.merikbest2015.enums.TopicCategory;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.repository.TopicRepository;
import com.gmail.merikbest2015.repository.projection.FollowedTopicProjection;
import com.gmail.merikbest2015.repository.projection.NotInterestedTopicProjection;
import com.gmail.merikbest2015.repository.projection.TopicProjection;
//import com.gmail.merikbest2015.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TopicServiceImpl implements TopicService {

//    private final AuthenticationService authenticationService;
    private final TopicRepository topicRepository;

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
//        Long userId = authenticationService.getAuthenticatedUserId();
        return topicRepository.getFollowedTopics(1L, FollowedTopicProjection.class);
    }

    @Override
    public List<TopicProjection> getFollowedTopicsByUserId(Long userId) {
        // TODO add check isMyProfileBlocked and isPrivateProfile
        return topicRepository.getFollowedTopics(userId, TopicProjection.class);
    }

    @Override
    public List<NotInterestedTopicProjection> getNotInterestedTopics() {
//        Long userId = authenticationService.getAuthenticatedUserId();
        return topicRepository.getNotInterestedTopic(1L);
    }

    @Override
    @Transactional
    public Boolean processNotInterestedTopic(Long topicId) {
        checkIsTopicExist(topicId);
//        Long userId = authenticationService.getAuthenticatedUserId();
        boolean isTopicNotInterested = topicRepository.isTopicNotInterested(1L, topicId);

        if (isTopicNotInterested) {
            topicRepository.removeNotInterestedTopic(1L, topicId);
            return false;
        } else {
            topicRepository.removeFollowedTopic(1L, topicId);
            topicRepository.addNotInterestedTopic(1L, topicId);
            return true;
        }
    }

    @Override
    @Transactional
    public Boolean processFollowTopic(Long topicId) {
        checkIsTopicExist(topicId);
//        Long userId = authenticationService.getAuthenticatedUserId();
        boolean isTopicFollowed = topicRepository.isTopicFollowed(1L, topicId);

        if (isTopicFollowed) {
            topicRepository.removeFollowedTopic(1L, topicId);
            return false;
        } else {
            topicRepository.removeNotInterestedTopic(1L, topicId);
            topicRepository.addFollowedTopic(1L, topicId);
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
//        Long authUserId = authenticationService.getAuthenticatedUserId();
        return topicRepository.isTopicFollowed(1L, topicId);
    }

    public boolean isTopicNotInterested(Long topicId) {
//        Long authUserId = authenticationService.getAuthenticatedUserId();
        return topicRepository.isTopicNotInterested(1L, topicId);
    }
}
