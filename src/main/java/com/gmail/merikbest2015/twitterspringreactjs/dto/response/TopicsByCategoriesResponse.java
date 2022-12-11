package com.gmail.merikbest2015.twitterspringreactjs.dto.response;

import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.TopicByCategoryProjection;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TopicsByCategoriesResponse {
    private String topicCategory;
    private List<TopicByCategoryProjection> topicsByCategories;
}
