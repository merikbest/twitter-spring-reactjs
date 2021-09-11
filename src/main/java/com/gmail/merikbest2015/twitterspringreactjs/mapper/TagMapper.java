package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.TagResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.twitterspringreactjs.model.Tag;
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

    private TagResponse convertToTagResponse(Tag tag) {
        return modelMapper.map(tag, TagResponse.class);
    }

    private List<TagResponse> convertTagsListToResponse(List<Tag> tags) {
        return tags.stream()
                .map(this::convertToTagResponse)
                .collect(Collectors.toList());
    }

    public List<TagResponse> getTags() {
        return convertTagsListToResponse(tagService.getTags());
    }

    public List<TagResponse> getTrends() {
        return convertTagsListToResponse(tagService.getTrends());
    }

    public List<TweetResponse> getTweetsByTag(String tagName) {
        return tweetMapper.convertListToResponse(tagService.getTweetsByTag(tagName));
    }
}
