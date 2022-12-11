package com.gmail.merikbest2015.twitterspringreactjs.repository.projection;

import com.gmail.merikbest2015.twitterspringreactjs.enums.TopicCategory;

public interface TopicByCategoryProjection {
    Long getId();
    String getTopicName();
    TopicCategory getTopicCategory();
}
