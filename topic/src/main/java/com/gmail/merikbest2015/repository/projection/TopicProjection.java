package com.gmail.merikbest2015.repository.projection;

import com.gmail.merikbest2015.enums.TopicCategory;
import org.springframework.beans.factory.annotation.Value;

public interface TopicProjection {
    Long getId();
    String getTopicName();
    TopicCategory getTopicCategory();

    @Value("#{@topicServiceImpl.isTopicFollowed(target.id)}")
    boolean getIsTopicFollowed();

    @Value("#{@topicServiceImpl.isTopicNotInterested(target.id)}")
    boolean getIsTopicNotInterested();
}
