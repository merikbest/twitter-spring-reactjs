package com.gmail.merikbest2015.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class SearchTermsRequest {
    private List<Long> users;
}
