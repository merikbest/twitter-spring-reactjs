package com.gmail.merikbest2015.twitterspringreactjs.repository.projection.topic;

import com.gmail.merikbest2015.twitterspringreactjs.enums.TopicCategory;
import org.springframework.beans.factory.annotation.Value;

public interface FollowedTopicProjection {
    Long getId();
    String getTopicName();
    TopicCategory getTopicCategory();

    @Value("#{true}")
    boolean getIsTopicFollowed();
}
