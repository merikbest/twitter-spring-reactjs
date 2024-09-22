package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.commons.dto.request.IdsRequest;
import com.gmail.merikbest2015.commons.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.commons.exception.ApiRequestException;
import com.gmail.merikbest2015.constants.TagErrorMessage;
import com.gmail.merikbest2015.model.Tag;
import com.gmail.merikbest2015.service.TagService;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class TagServiceImplTest extends AbstractServiceTest {

    @Autowired
    private TagService tagService;


    @Test
    public void getTags() {
        when(tagRepository.findTop5ByOrderByTweetsQuantityDesc()).thenReturn(Arrays.asList(new Tag(), new Tag()));
        List<Tag> tags = tagService.getTags();
        assertEquals(2, tags.size());
        verify(tagRepository, times(1)).findTop5ByOrderByTweetsQuantityDesc();
    }

    @Test
    public void getTrends() {
        Pageable pageable = PageRequest.of(0, 20);
        Page<Tag> tags = new PageImpl<>(Arrays.asList(new Tag(), new Tag()), pageable, 20);
        when(tagRepository.findByOrderByTweetsQuantityDesc(pageable)).thenReturn(tags);
        Page<Tag> pageTags = tagService.getTrends(pageable);
        assertEquals(2, pageTags.getContent().size());
        verify(tagRepository, times(1)).findByOrderByTweetsQuantityDesc(pageable);
    }

    @Test
    public void getTweetsByTag() {
        String mockTagName = "test_tag";
        Tag tag = new Tag();
        tag.setId(1L);
        tag.setTagName(mockTagName);
        tag.setTweetsQuantity(111L);
        List<Long> tweetIds = Arrays.asList(1L, 2L);
        when(tagRepository.findByTagName(mockTagName)).thenReturn(Optional.of(tag));
        when(tweetTagRepository.getTweetIdsByTagId(tag.getId())).thenReturn(tweetIds);
        when(tweetClient.getTweetsByIds(new IdsRequest(tweetIds))).thenReturn(Arrays.asList(new TweetResponse(), new TweetResponse()));
        List<TweetResponse> tweetsResponse = tagService.getTweetsByTag(mockTagName);
        assertEquals(2, tweetsResponse.size());
        verify(tagRepository, times(1)).findByTagName(mockTagName);
        verify(tweetTagRepository, times(1)).getTweetIdsByTagId(tag.getId());
        verify(tweetClient, times(1)).getTweetsByIds(new IdsRequest(tweetIds));
    }

    @Test
    public void getTweetsByTag_TagNotFound() {
        String mockTagName = "test_tag";
        when(tagRepository.findByTagName(mockTagName)).thenReturn(Optional.empty());
        try {
            tagService.getTweetsByTag(mockTagName);
        } catch (ApiRequestException exception) {
            assertEquals(TagErrorMessage.TAG_NOT_FOUND, exception.getMessage());
            assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
        }
        verify(tagRepository, times(1)).findByTagName(mockTagName);
    }
}
