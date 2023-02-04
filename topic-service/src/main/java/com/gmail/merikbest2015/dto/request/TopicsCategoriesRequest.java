package com.gmail.merikbest2015.dto.request;

import com.gmail.merikbest2015.enums.TopicCategory;
import lombok.Data;

import java.util.List;

@Data
public class TopicsCategoriesRequest {
    private List<TopicCategory> categories;
}
