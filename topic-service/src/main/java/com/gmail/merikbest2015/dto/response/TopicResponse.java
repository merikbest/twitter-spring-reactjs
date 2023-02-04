package com.gmail.merikbest2015.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gmail.merikbest2015.enums.TopicCategory;
import lombok.Data;

@Data
public class TopicResponse {
    private Long id;
    private String topicName;
    private TopicCategory topicCategory;

    @JsonProperty("isTopicFollowed")
    private boolean isTopicFollowed;

    @JsonProperty("isTopicNotInterested")
    private boolean isTopicNotInterested;
}
