package com.gmail.merikbest2015.twitterspringreactjs.dto.request;

import com.gmail.merikbest2015.twitterspringreactjs.enums.TopicCategory;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TopicsCategoriesRequest {
    private List<TopicCategory> categories;
}
