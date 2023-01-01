package com.gmail.merikbest2015.client.tweet;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Data
@AllArgsConstructor
public class TweetUserIdsRequest {
    private List<Long> userIds;
    private Pageable pageable;
}
