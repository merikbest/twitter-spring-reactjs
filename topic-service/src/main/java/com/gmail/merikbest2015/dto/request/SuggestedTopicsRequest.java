package com.gmail.merikbest2015.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SuggestedTopicsRequest {
    private List<Long> topicsIds;
}
