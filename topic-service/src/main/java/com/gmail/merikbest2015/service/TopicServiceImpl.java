package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.dto.response.TopicsByCategoriesResponse;
import com.gmail.merikbest2015.enums.TopicCategory;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.model.TopicFollowers;
import com.gmail.merikbest2015.model.TopicNotInterested;
import com.gmail.merikbest2015.repository.TopicFollowersRepository;
import com.gmail.merikbest2015.repository.TopicNotInterestedRepository;
import com.gmail.merikbest2015.repository.TopicRepository;
import com.gmail.merikbest2015.repository.projection.FollowedTopicProjection;
import com.gmail.merikbest2015.repository.projection.NotInterestedTopicProjection;
import com.gmail.merikbest2015.repository.projection.TopicProjection;
import com.gmail.merikbest2015.util.AuthUtil;
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
    private final TopicFollowersRepository topicFollowersRepository;
    private final TopicNotInterestedRepository topicNotInterestedRepository;

    @Override
    public List<TopicProjection> getTopicsByIds(List<Long> topicsIds) {
        return topicRepository.getTopicsByIds(topicsIds, TopicProjection.class);
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
        Long userId = AuthUtil.getAuthenticatedUserId();
        List<Long> followedTopicsIds = topicFollowersRepository.getFollowedTopics(userId);
        return topicRepository.getTopicsByIds(followedTopicsIds, FollowedTopicProjection.class);
    }

    @Override
    public List<TopicProjection> getFollowedTopicsByUserId(Long userId) {
        // TODO add check isMyProfileBlocked and isPrivateProfile
        List<Long> followedTopicsIds = topicFollowersRepository.getFollowedTopics(userId);
        return topicRepository.getTopicsByIds(followedTopicsIds, TopicProjection.class);
    }

    @Override
    public List<NotInterestedTopicProjection> getNotInterestedTopics() {
        Long userId = AuthUtil.getAuthenticatedUserId();
        List<Long> notInterestedTopicIds = topicNotInterestedRepository.getNotInterestedTopic(userId);
        return topicRepository.getTopicsByIds(notInterestedTopicIds, NotInterestedTopicProjection.class);
    }

    @Override
    @Transactional
    public Boolean processNotInterestedTopic(Long topicId) {
        checkIsTopicExist(topicId);
        Long userId = AuthUtil.getAuthenticatedUserId();
        TopicNotInterested topic = topicNotInterestedRepository.getNotInterestedByUserIdAndTopicId(userId, topicId);

        if (topic != null) {
            topicNotInterestedRepository.delete(topic);
            return false;
        } else {
            topicFollowersRepository.removeFollowedTopic(userId, topicId);
            TopicNotInterested topicNotInterested = new TopicNotInterested(userId, topicId);
            topicNotInterestedRepository.save(topicNotInterested);
            return true;
        }
    }

    @Override
    @Transactional
    public Boolean processFollowTopic(Long topicId) {
        checkIsTopicExist(topicId);
        Long userId = AuthUtil.getAuthenticatedUserId();
        TopicFollowers follower = topicFollowersRepository.getFollowerByUserIdAndTopicId(userId, topicId);

        if (follower != null) {
            topicFollowersRepository.delete(follower);
            return false;
        } else {
            topicNotInterestedRepository.removeNotInterestedTopic(userId, topicId);
            TopicFollowers topicFollowers = new TopicFollowers(userId, topicId);
            topicFollowersRepository.save(topicFollowers);
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
        Long userId = AuthUtil.getAuthenticatedUserId();
        return topicFollowersRepository.isTopicFollowed(userId, topicId);
    }

    public boolean isTopicNotInterested(Long topicId) {
        Long userId = AuthUtil.getAuthenticatedUserId();
        return topicNotInterestedRepository.isTopicNotInterested(userId, topicId);
    }
}
