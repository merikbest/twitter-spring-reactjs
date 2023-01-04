package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.commons.dto.TweetResponse;
import com.gmail.merikbest2015.commons.mapper.BasicMapper;
import com.gmail.merikbest2015.commons.projection.TweetProjection;
import com.gmail.merikbest2015.service.TweetClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class TweetClientMapper {

    private final BasicMapper basicMapper;
    private final TweetClientService tweetClientService;

    public List<TweetResponse> getTweetsByTagName(String tagName) {
        List<TweetProjection> tweets = tweetClientService.getTweetsByTagName(tagName);
        return basicMapper.convertToResponseList(tweets, TweetResponse.class);
    }
}
