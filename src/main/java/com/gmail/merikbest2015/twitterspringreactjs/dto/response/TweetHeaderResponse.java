package com.gmail.merikbest2015.twitterspringreactjs.dto.response;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpHeaders;

import java.util.List;

@Data
@AllArgsConstructor
public class TweetHeaderResponse {
    List<TweetResponse> tweets;
    HttpHeaders headers;
}
