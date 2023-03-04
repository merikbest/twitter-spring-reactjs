package com.gmail.merikbest2015.dto.response;

import com.gmail.merikbest2015.enums.TopicCategory;
import com.gmail.merikbest2015.repository.projection.TopicProjection;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopicsByCategoriesResponse {
    private TopicCategory topicCategory;
    private List<TopicProjection> topicsByCategories;
}
