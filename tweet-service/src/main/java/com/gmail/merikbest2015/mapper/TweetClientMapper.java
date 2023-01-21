package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.dto.TweetResponse;
import com.gmail.merikbest2015.service.TweetClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class TweetClientMapper {

    private final BasicMapper basicMapper;
    private final TweetClientService tweetClientService;

//    public List<TweetResponse> getTweetsByIds(List<Long> tweetIds) {
//        List<TweetProjection> tweets = tweetClientService.getTweetsByIds(tweetIds);
//        return basicMapper.convertToResponseList(tweets, TweetResponse.class);
//    }
}
