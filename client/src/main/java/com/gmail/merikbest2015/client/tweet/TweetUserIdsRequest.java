package com.gmail.merikbest2015.client.tweet;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TweetUserIdsRequest {
    private List<Long> userIds;
}
