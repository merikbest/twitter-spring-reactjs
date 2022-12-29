package com.gmail.merikbest2015.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TagResponse {
    private Long id;
    private String tagName;
    private Long tweetsQuantity;
}
