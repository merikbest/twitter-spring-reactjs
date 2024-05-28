package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.TagResponse;
import com.gmail.merikbest2015.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.model.Tag;
import com.gmail.merikbest2015.service.TagService;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(MockitoJUnitRunner.class)
public class TagMapperTest {

    @InjectMocks
    private TagMapper tagMapper;

    @Mock
    private BasicMapper basicMapper;

    @Mock
    private TagService tagService;

    private final List<Tag> tags = List.of(new Tag(), new Tag());
    private final List<TagResponse> tagResponses = List.of(new TagResponse(), new TagResponse());

    @Test
    public void getTags() {
        when(tagService.getTags()).thenReturn(tags);
        when(basicMapper.convertToResponseList(tags, TagResponse.class)).thenReturn(tagResponses);
        assertEquals(2, tagMapper.getTags().size());
        verify(tagService, times(1)).getTags();
        verify(basicMapper, times(1)).convertToResponseList(tags, TagResponse.class);
    }

    @Test
    public void getTrends() {
        PageRequest pageable = PageRequest.of(0, 20);
        Page<Tag> pageableTags = new PageImpl<>(tags, pageable, 20);
        HeaderResponse<TagResponse> headerResponse = new HeaderResponse<>(tagResponses, new HttpHeaders());
        when(tagService.getTrends(pageable)).thenReturn(pageableTags);
        when(basicMapper.getHeaderResponse(pageableTags, TagResponse.class)).thenReturn(headerResponse);
        assertEquals(2, tagMapper.getTrends(pageable).getItems().size());
        verify(tagService, times(1)).getTrends(pageable);
        verify(basicMapper, times(1)).getHeaderResponse(pageableTags, TagResponse.class);
    }

    @Test
    public void getTweetsByTag() {
        List<TweetResponse> tweetResponses = List.of(new TweetResponse(), new TweetResponse());
        when(tagService.getTweetsByTag(TestConstants.HASHTAG)).thenReturn(tweetResponses);
        assertEquals(tweetResponses, tagMapper.getTweetsByTag(TestConstants.HASHTAG));
        verify(tagService, times(1)).getTweetsByTag(TestConstants.HASHTAG);
    }
}
