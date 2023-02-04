package com.gmail.merikbest2015.dto.response;

import com.gmail.merikbest2015.repository.projection.TopicProjection;
import lombok.Data;

import java.util.List;

@Data
public class TopicsByCategoriesResponse {
    private String topicCategory;
    private List<TopicProjection> topicsByCategories;
}
