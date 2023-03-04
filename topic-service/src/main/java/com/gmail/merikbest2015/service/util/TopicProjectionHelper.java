package com.gmail.merikbest2015.service.util;

import com.gmail.merikbest2015.repository.TopicFollowersRepository;
import com.gmail.merikbest2015.repository.TopicNotInterestedRepository;
import com.gmail.merikbest2015.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TopicProjectionHelper {

    private final TopicFollowersRepository topicFollowersRepository;
    private final TopicNotInterestedRepository topicNotInterestedRepository;

    public boolean isTopicFollowed(Long topicId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return topicFollowersRepository.isTopicFollowed(authUserId, topicId);
    }

    public boolean isTopicNotInterested(Long topicId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return topicNotInterestedRepository.isTopicNotInterested(authUserId, topicId);
    }
}
