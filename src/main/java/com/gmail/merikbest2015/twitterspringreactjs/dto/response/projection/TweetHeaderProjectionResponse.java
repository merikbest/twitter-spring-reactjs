package com.gmail.merikbest2015.twitterspringreactjs.dto.response.projection;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpHeaders;

import java.util.List;

@Data
@AllArgsConstructor
public class TweetHeaderProjectionResponse {
    private List<TweetProjectionResponse> tweets;
    private HttpHeaders headers;
}
