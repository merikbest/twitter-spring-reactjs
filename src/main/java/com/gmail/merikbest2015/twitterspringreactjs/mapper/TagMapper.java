package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.TagResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.twitterspringreactjs.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class TagMapper {

    private final BasicMapper basicMapper;
    private final TagService tagService;

    public List<TagResponse> getTags() {
        return basicMapper.convertToResponseList(tagService.getTags(), TagResponse.class);
    }

    public List<TagResponse> getTrends() {
        return basicMapper.convertToResponseList(tagService.getTrends(), TagResponse.class);
    }

    public List<TweetResponse> getTweetsByTag(String tagName) {
        return basicMapper.convertToResponseList(tagService.getTweetsByTag(tagName), TweetResponse.class);
    }
}
