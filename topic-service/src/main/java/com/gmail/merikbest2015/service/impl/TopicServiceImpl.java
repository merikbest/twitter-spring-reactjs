package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.dto.response.TopicsByCategoriesResponse;
import com.gmail.merikbest2015.enums.TopicCategory;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.model.TopicFollowers;
import com.gmail.merikbest2015.model.TopicNotInterested;
import com.gmail.merikbest2015.repository.TopicFollowersRepository;
import com.gmail.merikbest2015.repository.TopicNotInterestedRepository;
import com.gmail.merikbest2015.repository.TopicRepository;
import com.gmail.merikbest2015.repository.projection.FollowedTopicProjection;
import com.gmail.merikbest2015.repository.projection.NotInterestedTopicProjection;
import com.gmail.merikbest2015.repository.projection.TopicProjection;
import com.gmail.merikbest2015.service.TopicService;
import com.gmail.merikbest2015.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.gmail.merikbest2015.constants.ErrorMessage.*;

@Service
@RequiredArgsConstructor
public class TopicServiceImpl implements TopicService {

    private final TopicRepository topicRepository;
    private final TopicFollowersRepository topicFollowersRepository;
    private final TopicNotInterestedRepository topicNotInterestedRepository;
    private final UserClient userClient;

    @Override
    public List<TopicProjection> getTopicsByIds(List<Long> topicsIds) {
        return topicRepository.getTopicsByIds(topicsIds);
    }

    @Override
    public List<TopicsByCategoriesResponse> getTopicsByCategories(List<TopicCategory> categories) {
        return categories.stream()
                .map(topicCategory -> {
                    List<TopicProjection> topics = topicRepository.getTopicsByCategory(topicCategory);
                    return new TopicsByCategoriesResponse(topicCategory, topics);
                })
                .toList();
    }

    @Override
    public List<FollowedTopicProjection> getFollowedTopics() {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return topicRepository.getTopicsByTopicFollowerId(authUserId, FollowedTopicProjection.class);
    }

    @Override
    public List<TopicProjection> getFollowedTopicsByUserId(Long userId) {
        validateUserProfile(userId);
        return topicRepository.getTopicsByTopicFollowerId(userId, TopicProjection.class);
    }

    @Override
    public List<NotInterestedTopicProjection> getNotInterestedTopics() {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return topicRepository.getTopicsByNotInterestedUserId(authUserId);
    }

    @Override
    @Transactional
    public Boolean processNotInterestedTopic(Long topicId) {
        checkIsTopicExist(topicId);
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        TopicNotInterested topic = topicNotInterestedRepository.getNotInterestedByUserIdAndTopicId(authUserId, topicId);

        if (topic != null) {
            topicNotInterestedRepository.delete(topic);
            return false;
        } else {
            topicFollowersRepository.removeFollowedTopic(authUserId, topicId);
            TopicNotInterested topicNotInterested = new TopicNotInterested(authUserId, topicId);
            topicNotInterestedRepository.save(topicNotInterested);
            return true;
        }
    }

    @Override
    @Transactional
    public Boolean processFollowTopic(Long topicId) {
        checkIsTopicExist(topicId);
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        TopicFollowers follower = topicFollowersRepository.getFollowerByUserIdAndTopicId(authUserId, topicId);

        if (follower != null) {
            topicFollowersRepository.delete(follower);
            return false;
        } else {
            topicNotInterestedRepository.removeNotInterestedTopic(authUserId, topicId);
            TopicFollowers topicFollowers = new TopicFollowers(authUserId, topicId);
            topicFollowersRepository.save(topicFollowers);
            return true;
        }
    }

    private void checkIsTopicExist(Long topicId) {
        if (!topicRepository.isTopicExist(topicId)) {
            throw new ApiRequestException(TOPIC_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }

    private void validateUserProfile(Long userId) {
        if (!userClient.isUserExists(userId)) {
            throw new ApiRequestException(String.format(USER_ID_NOT_FOUND, userId), HttpStatus.NOT_FOUND);
        }
        Long authUserId = AuthUtil.getAuthenticatedUserId();

        if (!userId.equals(authUserId)) {
            if (userClient.isMyProfileBlockedByUser(userId)) {
                throw new ApiRequestException(USER_PROFILE_BLOCKED, HttpStatus.BAD_REQUEST);
            }
            if (userClient.isUserHavePrivateProfile(userId)) {
                throw new ApiRequestException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }
        }
    }
}
