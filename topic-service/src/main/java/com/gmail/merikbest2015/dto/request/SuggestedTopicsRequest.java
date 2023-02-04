package com.gmail.merikbest2015.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class SuggestedTopicsRequest {
    private List<Long> topicsIds;
}
