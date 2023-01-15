package com.gmail.merikbest2015.repository.projection;

import com.gmail.merikbest2015.enums.TopicCategory;
import org.springframework.beans.factory.annotation.Value;

public interface NotInterestedTopicProjection {
    Long getId();
    String getTopicName();
    TopicCategory getTopicCategory();

    @Value("#{true}")
    boolean getIsTopicNotInterested();
}
