package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.TagProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.tag.TagProjection;
import com.gmail.merikbest2015.twitterspringreactjs.service.TagService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class TagMapper {

    private final ModelMapper modelMapper;
    private final TagService tagService;
    private final TweetMapper tweetMapper;

    private TagProjectionResponse convertToTagResponse(TagProjection tag) {
        return modelMapper.map(tag, TagProjectionResponse.class);
    }

    private List<TagProjectionResponse> convertTagsListToResponse(List<TagProjection> tags) {
        return tags.stream()
                .map(this::convertToTagResponse)
                .collect(Collectors.toList());
    }

    public List<TagProjectionResponse> getTags() {
        return convertTagsListToResponse(tagService.getTags());
    }

    public List<TagProjectionResponse> getTrends() {
        return convertTagsListToResponse(tagService.getTrends());
    }

    public List<TweetProjectionResponse> getTweetsByTag(String tagName) {
        return tweetMapper.convertListToProjectionResponse(tagService.getTweetsByTag(tagName));
    }
}
