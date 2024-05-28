package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.model.Tag;
import com.gmail.merikbest2015.service.TagHandlerService;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;

public class TagHandlerServiceImplTest extends AbstractServiceTest {

    @Autowired
    private TagHandlerService tagHandlerService;

    private Tag tag1;
    private Tag tag2;

    @Before
    public void setUp() {
        tag1 = new Tag();
        tag1.setId(1L);
        tag1.setTagName("#hashtag1");
        tag1.setTweetsQuantity(111L);
        tag2 = new Tag();
        tag2.setId(2L);
        tag2.setTagName("#hashtag2");
        tag2.setTweetsQuantity(1L);
    }

    @Test
    public void parseHashtagsFromText() {
        when(tagRepository.save(new Tag("#hashtag2"))).thenReturn(tag2);
        when(tagRepository.findByTagName("#hashtag1")).thenReturn(Optional.of(tag1));
        when(tagRepository.findByTagName("#hashtag2")).thenReturn(Optional.empty());
        tagHandlerService.parseHashtag(1L, "test text #hashtag1 #hashtag2");
        verify(tagRepository, times(1)).findByTagName("#hashtag1");
        verify(tagRepository, times(1)).findByTagName("#hashtag2");
        verify(tagRepository, times(1)).updateTagQuantity(tag1.getId(), true);
        verify(tagRepository, times(1)).save(new Tag("#hashtag2"));
        verify(tweetTagRepository, times(2)).save(any());
    }

    @Test
    public void parseHashtagsFromText_shouldProcessTextWithoutHashtag() {
        when(tagRepository.findByTagName("test_text")).thenReturn(Optional.empty());
        tagHandlerService.parseHashtag(1L, "test text");
        verify(tagRepository, times(0)).findByTagName("test_text");
    }

    @Test
    public void deleteTagsByTweetId() {
        List<Long> tagsIds = Arrays.asList(1L, 2L);
        when(tweetTagRepository.getTagIdsByTweetId(1L)).thenReturn(tagsIds);
        when(tagRepository.getTagsByIds(tagsIds)).thenReturn(Arrays.asList(tag1, tag2));
        tagHandlerService.deleteTag(1L);
        verify(tagRepository, times(1)).updateTagQuantity(tag1.getId(), false);
        verify(tagRepository, times(1)).delete(tag2);
        verify(tweetTagRepository, times(1)).deleteTag(tag2.getId());
    }
}
